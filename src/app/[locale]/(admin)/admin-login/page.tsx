"use client";

import { useLoginLogic } from "@/hooks/business/useLoginLogic";
import { LoginContent } from "@/components/main/auth/LoginContent";
import { useRouter } from 'next/navigation';

export default function LoginAdminPage() {
  const router = useRouter();
  const {
    step,
    emailValue,
    resendTimer,
    usernameError,
    isSendLoading,
    isExistingUser,
    isVerifyLoading,
    isRegisterLoading,
    handleSendEmailCode,
    handleVerifyEmailCode,
    handleCompleteProfile,
    handleResend,
    formatTime,
  } = useLoginLogic({
    onSuccess: () => {
      router.push('/dashboard/overview');
    },
  });

  const contentProps = {
    step,
    emailValue,
    resendTimer,
    usernameError,
    isSendLoading,
    isExistingUser,
    isVerifyLoading,
    isRegisterLoading,
    handleSendEmailCode,
    handleVerifyEmailCode,
    handleCompleteProfile,
    handleResend,
    formatTime,
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md bg-white py-10 rounded-2xl peyda">
        <LoginContent {...contentProps} />
      </div>
    </div>
  );
}
