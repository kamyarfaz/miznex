import { useState, useEffect } from "react";
import { migrateGuestCartToServer } from "@/store/cartStore";
import { useAddToCartMultiple, useCart } from "@/services";
import { useVerifyEmailOrLoginCode } from "@/services/auth/useVerifyEmailOrLoginCode";
import { useRegisterUser } from "@/services/auth/useRegisterUser";
import { UseLoginLogicProps } from "@/types";
import { useSendEmailOrLoginCode } from "@/services/auth/useSendEmailOrLoginCode";
import { setClientCookie , getClientCookie  } from "@/components/helper/client-cookie";

export const useLoginLogic = ({ onSuccess, onClose }: UseLoginLogicProps = {}) => {
  const [step, setStep] = useState<"email" | "verifyEmail" | "completeProfile">("email");
  const [emailValue, setEmailValue] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [Test, setTest] = useState(false);
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

const handleVerifyEmailCode = async (code: string) => {
  const res : any = await verifyCode(emailValue, code, isExistingUser);

  const token = res?.data?.token?.access_token;

  if (token) {
    setClientCookie("access_token", token, 60 * 24 * 7);
    setTest(!Test)
  }

  if (isExistingUser) {
    onClose?.();
    onSuccess?.();
    return;
  }

  setStep("completeProfile");
};

useEffect(() => {
 const token = getClientCookie("access_token");
 console.log(token ,"sssssssssssssssssssss");
 
}, [Test])

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
