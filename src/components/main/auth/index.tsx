"use client";

import { useIsMobile } from "@/hooks/ui/useMediaQuery";
import { useLoginLogic } from "@/hooks/business/useLoginLogic";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { LoginContent } from "./LoginContent";
import { LoginFormProps } from "@/types/main";
import { X } from "lucide-react";

export const LoginForm: React.FC<LoginFormProps> = ({
  open,
  onOpenChange,
  onSuccess,
}) => {
  const isMobile = useIsMobile();

  const {
    step,
    emailValue,
    resendTimer,
    isSendLoading,
    usernameError,
    isExistingUser,
    isVerifyLoading,
    isRegisterLoading,
    handleSendEmailCode,
    handleVerifyEmailCode,
    handleCompleteProfile,
    handleResend,
    formatTime,
  } = useLoginLogic({ onSuccess, onClose: () => onOpenChange(false) });

  const contentProps = {
    step,
    emailValue,
    resendTimer,
    isSendLoading,
    usernameError,
    isExistingUser,
    isVerifyLoading,
    isRegisterLoading,
    handleSendEmailCode,
    handleVerifyEmailCode,
    handleCompleteProfile,
    handleResend,
    formatTime,
  };

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[90vh] border-none">
          <DrawerHeader className="text-center">
            <VisuallyHidden>
              <DrawerTitle>فرم ورود و ثبت نام</DrawerTitle>
              <DrawerDescription>فرم ورود و ثبت نام</DrawerDescription>
            </VisuallyHidden>
          </DrawerHeader>
          <div className="px-4 pb-4 overflow-y-auto scrollbar-hide">
            <LoginContent {...contentProps} />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-testid="login-modal"
        showCloseButton={false}
        className="!w-lg max-h-[90vh] px-0 border-none"
      >
        <DialogHeader>
          <DialogClose asChild>
            <button
              aria-label="close"
              className="absolute left-4 top-4 cursor-pointer rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <X className="w-4 h-4" />
            </button>
          </DialogClose>
        </DialogHeader>

        <VisuallyHidden>
          <DialogTitle>فرم ورود و ثبت نام</DialogTitle>
          <DialogDescription>فرم ورود و ثبت نام</DialogDescription>
        </VisuallyHidden>

        <LoginContent {...contentProps} />
      </DialogContent>
    </Dialog>
  );
};
