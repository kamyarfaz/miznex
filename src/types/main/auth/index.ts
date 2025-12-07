export type LoginStep = "phone" | "otp";

export interface LoginFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export interface UseLoginLogicProps {
  onSuccess?: () => void;
  onClose?: () => void;
}

export interface LoginContentProps {
  step: "email" | "verifyEmail" | "completeProfile";

  emailValue: string;
  usernameError: string;
  resendTimer: number;
  isVerifyLoading: boolean;
  isSendLoading: boolean;
  isRegisterLoading: boolean;
  isExistingUser: boolean;
  
  formatTime: (seconds: number) => string;
  handleSendEmailCode: (email: string) => void;
  handleVerifyEmailCode: (code: string , isExistingUser : boolean) => void;
  handleCompleteProfile: (
    firstName: string,
    lastName: string,
    username: string
  ) => void;
  handleResend: () => void;
}

export interface EmailInputFormProps {
  onSubmit: (email: string) => void;
  isLoading?: boolean;
}

export interface VerifyEmailFormProps {
  email: string;
  onSubmit: (code: string , isExistingUser : boolean) => void;
  onResend: () => void;
  isLoading?: boolean;
  isExistingUser: boolean;
  resendTimer: number;
  formatTime: (seconds: number) => string;
}

export interface CompleteProfileFormProps {
  onSubmit: (firstName: string, lastName: string, username: string) => void;
  isLoading?: boolean;
  usernameError : string
}
