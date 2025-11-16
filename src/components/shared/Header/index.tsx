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

  const t = useTranslations("navbar");

  return (
    <div >
      <nav className="fixed top-6 inset-x-4 h-12 rtl:max-w-[720px] ltr:max-w-[966px] bg-[#404040] backdrop-blur-sm mx-auto rounded-full shadow-[0px_4px_30px_rgba(0,0,0,0.2)] z-50">
        <div className="h-full flex items-center justify-between mx-auto p-[3px] rtl:pr-2 ltr:pl-2">
          <h3 className="text-theme-xl font-bold text-white">{t("miznex")}</h3>

          <DesktopNavbar
            {...sharedProps}
            openLoginDialog={openLoginDialog}
            setOpenLoginDialog={setOpenLoginDialog}
          />
          <MobileNavbar
            {...sharedProps}
            openMobileMenu={openMobileMenu}
            setOpenMobileMenu={setOpenMobileMenu}
            openMobileLoginDialog={openMobileLoginDialog}
            setOpenMobileLoginDialog={setOpenMobileLoginDialog}
          />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
