"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Menu,
  Home,
  FileText,
  Users,
  Phone,
  LogIn,
  User,
  LogOut,
  X,
} from "lucide-react";
import Link from "next/link";
import { ThemeSwitcher } from "../ThemeToggle";
import { LoginForm } from "@/components/main/auth";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Logo from "./Logo";
import { MotionDiv } from "@/utils/MotionWrapper";
import { MobileNavbarProps } from "@/types/main";
import { useLogout } from "@/services/auth";
import { useParams } from "next/navigation";

const MobileNavbar: React.FC<MobileNavbarProps> = ({
  isAuthenticated,
  user,
  pathname,
  openMobileMenu,
  setOpenMobileMenu,
  openMobileLoginDialog,
  setOpenMobileLoginDialog,
  links,
  handleScroll,
  activeId,
}) => {
  const { logout, isPending } = useLogout();
  const params = useParams()

  return (
    <div className="lg:hidden">
      <Sheet open={openMobileMenu} onOpenChange={setOpenMobileMenu}>
        <SheetTrigger asChild>
          <div className="rounded-full transition-all duration-300">
            {openMobileMenu ? (
              <X className="h-6 w-6 transition-transform duration-300 rotate-90 stroke-action-hover scale-110" />
            ) : (
              <Menu className="h-6 w-6 transition-transform duration-300 stroke-action-hover scale-110 cursor-pointer" />
            )}
          </div>
        </SheetTrigger>

        <SheetContent
          data-testid="mobile-menu"
          side={["fa", "ar"].includes(String(params.locale)) ? "right" : "left"}
          className="w-[270px] scrollbar-hide bg-white [&>button]:!ring-0 [&>button]:!scale-150 [&>button]:!top-4 ltr:[&>button]:!right-4 ltr:[&>button]:!left-auto shadow-2xl"
        >
          <VisuallyHidden>
            <SheetTitle>Mobile Sidebar</SheetTitle>
            <SheetDescription>Mobile Sidebar</SheetDescription>
          </VisuallyHidden>

          <div className="flex flex-col h-full">
            <div className="flex justify-start items-center p-3 pr-4 mb-4">
              <Logo width={40} />
            </div>

            <div
              data-testid="mobile-nav"
              className="flex-1 py-4 px-3 space-y-2 overflow-y-auto scrollbar-hide"
            >
              {links?.map(({ href, label }, index) => {
                const isActive = activeId === href;
                return (
                  <span
                    key={index}
                    onClick={() => handleScroll(href)}
                    className={`relative flex items-center gap-3 py-1.5 px-2 rounded-lg transition-all duration-300 cursor-pointer overflow-hidden ${
                      isActive
                        ? "bg-[#eee] text-action shadow-inner"
                        : "text-bodyDark hover:text-action hover:bg-[#f5f5f5]"
                    }
                        `}
                  >
                    {isActive && (
                      <MotionDiv
                        className="absolute rtl:right-0 ltr:left-0 top-0 bottom-0 w-1 bg-action"
                        initial={{ height: 0 }}
                        animate={{ height: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    <span>{label}</span>
                  </span>
                );
              })}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavbar;
