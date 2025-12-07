import { useState, useEffect } from "react";
import { migrateGuestCartToServer } from "@/store/cartStore";
import { useAddToCartMultiple, useCart } from "@/services";
import { useVerifyEmailOrLoginCode } from "@/services/auth/useVerifyEmailOrLoginCode";
import { useRegisterUser } from "@/services/auth/useRegisterUser";
import { UseLoginLogicProps } from "@/types";
import { useSendEmailOrLoginCode } from "@/services/auth/useSendEmailOrLoginCode";

export const useLoginLogic = ({ onSuccess, onClose }: UseLoginLogicProps = {}) => {
  const [step, setStep] = useState<"email" | "verifyEmail" | "completeProfile">("email");
  const [emailValue, setEmailValue] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [usernameError, setUsernameError] = useState<string | null>(null);

  const { sendCode, isPending: isSendLoading } = useSendEmailOrLoginCode();
  const { verifyCode, isPending: isVerifyLoading } = useVerifyEmailOrLoginCode();
  const { mutateAsync: registerUser, isPending: isRegisterLoading } = useRegisterUser();

  // const { mutateAsync: addToCartMultiple } = useAddToCartMultiple();
  // const { refetch: refetchCart } = useCart();

  const handleSendEmailCode = async (email: string) => {
    sendCode(email , setIsExistingUser);
    setEmailValue(email);
    setStep("verifyEmail");
    setResendTimer(120);
  };

  const handleVerifyEmailCode = (code: string) => {
    verifyCode(emailValue, code, isExistingUser, (data) => {
      if (isExistingUser) {
        // migrateGuestCartToServer(addToCartMultiple, refetchCart);
        onClose?.();
        onSuccess?.();
        return;
      }
      setStep("completeProfile");
    });
  };

const handleCompleteProfile = async (firstName: string, lastName: string, username: string) => {
  try {
    setUsernameError(null);
    await registerUser({
      email: emailValue,
      firstName,
      lastName,
      username,
    });
    onClose?.();
    onSuccess?.();
  } catch (err: any) {
    if (err?.statusCode === 409) {
      setUsernameError("این نام کاربری قبلاً استفاده شده است");
    } else {
      throw err;
    }
  }
};

  const handleResend = async () => {
    await sendCode(emailValue , setIsExistingUser);
    setResendTimer(120);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (resendTimer > 0) {
      const t = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [resendTimer]);

  return {
    step,
    emailValue,
    resendTimer,
    isExistingUser,
    isSendLoading,
    isVerifyLoading,
    isRegisterLoading,
    usernameError : usernameError || "",
    formatTime,
    handleSendEmailCode,
    handleVerifyEmailCode,
    handleCompleteProfile,
    handleResend,
  };
};
