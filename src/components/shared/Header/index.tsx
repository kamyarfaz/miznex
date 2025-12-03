"use client";

import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import { useUserProfile } from "@/services";
import { usePathname } from "next/navigation";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import { useTranslations } from "next-intl";

const Navbar = () => {
  // Auth and user data
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { data: userProfile } = useUserProfile();
  const user = userProfile;
  const pathname = usePathname();

  // State management
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [openMobileLoginDialog, setOpenMobileLoginDialog] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  // Shared props for both desktop and mobile components
  const sharedProps = {
    isAuthenticated,
    user,
    pathname,
  };

  const [activeId, setActiveId] = useState<string>("home");

  const handleScroll = (href: string) => {
    const el = document.getElementById(href);
    if (!el) return;

    const offset = href === "home" ? 0 : -100;
    const top = el.getBoundingClientRect().top + window.scrollY + offset;

    window.scrollTo({ top, behavior: "smooth" });
    setActiveId(href);
  };

  const t = useTranslations("navbar");

  const links = [
    { href: "home", label: t("desktopNavbar.home") },
    { href: "about-us", label: t("desktopNavbar.aboutUs") },
    { href: "HowItWorks", label: t("desktopNavbar.howItWorks") },
    { href: "contact-us", label: t("desktopNavbar.features") },
    { href: "faq", label: t("desktopNavbar.frequentlyAskedQuestions") },
  ];

  return (
    <div>
      <nav className="fixed top-0 lg:top-6 max-lg:py-3 max-lg:h-16 inset-x-4 h-12 rtl:lg:max-w-[720px] ltr:lg:max-w-[966px] bg-white lg:bg-[#404040] lg:backdrop-blur-sm mx-auto lg:rounded-full lg:shadow-[0px_4px_30px_rgba(0,0,0,0.2)] z-50">
        <div className="h-full flex items-center justify-between mx-auto p-[3px] rtl:pr-2 ltr:pl-2">
          <div className="flex items-center gap-2">
            <MobileNavbar
              {...sharedProps}
              openMobileMenu={openMobileMenu}
              setOpenMobileMenu={setOpenMobileMenu}
              openMobileLoginDialog={openMobileLoginDialog}
              setOpenMobileLoginDialog={setOpenMobileLoginDialog}
              links={links}
              handleScroll={handleScroll}
              activeId={activeId}
            />
            <h3 className="text-theme-xl font-bold text-action lg:text-white">
              {t("miznex")}
            </h3>
          </div>

          <DesktopNavbar
            {...sharedProps}
            openLoginDialog={openLoginDialog}
            setOpenLoginDialog={setOpenLoginDialog}
            links={links}
            handleScroll={handleScroll}
            activeId={activeId}
          />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
