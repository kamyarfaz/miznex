import Link from "next/link";
import { Home, FileText, Phone, Info, Download } from "lucide-react";
import { MotionSpan } from "@/utils/MotionWrapper";
import { ThemeSwitcher } from "../ThemeToggle";
import dynamic from "next/dynamic";
import { LoginForm } from "@/components/main/auth";
import UserDropdown from "./UserDropdown";
import { DesktopNavbarProps } from "@/types/main";
import { useState } from "react";
import { useTranslations } from "next-intl";

const CartSidebar = dynamic(
  () => import("@/components/main/CartSidebar").then((mod) => mod.default),
  { ssr: false }
);

const DesktopNavbar: React.FC<DesktopNavbarProps> = ({
  isAuthenticated,
  user,
  pathname,
  openLoginDialog,
  setOpenLoginDialog,
}) => {
  const [activeId, setActiveId] = useState<string>("home");
  const t = useTranslations("navbar");

  const links = [
    { href: "home", label: t("desktopNavbar.home") },
    { href: "about-us", label: t("desktopNavbar.aboutUs") },
    { href: "HowItWorks", label: t("desktopNavbar.howItWorks") },
    { href: "contact-us", label: t("desktopNavbar.features") },
    { href: "faq", label: t("desktopNavbar.frequentlyAskedQuestions") },
  ];

  const handleScroll = (href: string) => {
    const el = document.getElementById(href);
    if (!el) return;

    const offset = href === "home" ? 0 : -100;
    const top = el.getBoundingClientRect().top + window.scrollY + offset;

    window.scrollTo({ top, behavior: "smooth" });
    setActiveId(href);
  };

  return (
    <>
      <div data-testid="main-nav" className="hidden lg:flex items-center gap-4">
        {links?.map(({ href, label }) => {
          const isActive = activeId === href;

          return (
            <span
              key={href}
              onClick={() => handleScroll(href)}
              className={`
                relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 text-white cursor-pointer text-sm
                ${isActive ? "font-semibold" : "font-normal"}
              `}
            >
              <span>{label}</span>

              {isActive && (
                <MotionSpan
                  layoutId="underline"
                  className="absolute bottom-0.5 left-[40%] w-1/5 h-0.5 bg-white rounded-full shadow-md"
                />
              )}
            </span>
          );
        })}
      </div>

      <div className="flex items-center gap-3 h-full">
        {/* <div className="hidden md:block">
          <ThemeSwitcher />
        </div> */}
        {/* <CartSidebar />
        <UserDropdown
          user={user}
          isAuthenticated={isAuthenticated}
          onLoginClick={() => setOpenLoginDialog(true)}
        />
        <LoginForm
          open={openLoginDialog}
          onOpenChange={setOpenLoginDialog}
          onSuccess={() => setOpenLoginDialog(false)}
        /> */}
        <div className="bg-white text-bodyDark h-full px-4 rounded-full font-medium flex items-center gap-2 text-[15px] cursor-pointer max-lg:border max-lg:border-action">
          <Download width={18} className="max-lg:stroke-action-hover"/> {t("desktopNavbar.downloadApp")}
        </div>
      </div>
    </>
  );
};

export default DesktopNavbar;
