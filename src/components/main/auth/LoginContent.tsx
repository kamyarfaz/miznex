"use client";

import MiznexSVG from "@/assets/svg/MiznexSVG";
import { LoginContentProps } from "@/types/main";

import { EmailInputForm } from "./EmailInputForm";
import { VerifyEmailForm } from "./VerifyEmailForm";
import { CompleteProfileForm } from "./CompleteProfileForm";

export const LoginContent: React.FC<LoginContentProps> = ({
  step,
  emailValue,
  resendTimer,
  isSendLoading,
  isVerifyLoading,
  isRegisterLoading,
  isExistingUser,
  usernameError,
  formatTime,
  handleSendEmailCode,
  handleVerifyEmailCode,
  handleCompleteProfile,
  handleResend,
}) => {
  const LogoComponent = () => (
    <div className="flex flex-col items-center gap-4 mb-6 relative bottom-2 scale-150">
      <MiznexSVG />
    </div>
  );

  return (
    <>
      <LogoComponent />

      {step === "email" && (
        <EmailInputForm
          onSubmit={handleSendEmailCode}
          isLoading={isSendLoading}
        />
      )}

      {step === "verifyEmail" && (
        <VerifyEmailForm
          email={emailValue}
          onSubmit={handleVerifyEmailCode}
          onResend={handleResend}
          isLoading={isVerifyLoading}
          resendTimer={resendTimer}
          isExistingUser={isExistingUser}
          formatTime={formatTime}
        />
      )}

      {step === "completeProfile" && (
        <CompleteProfileForm
          onSubmit={handleCompleteProfile}
          isLoading={isRegisterLoading}
          usernameError={usernameError}
        />
      )}
    </>
  );
};
