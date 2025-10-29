"use client";

import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import { useUserProfile } from "@/services";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

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

  return (
    <div >
      <nav className="fixed top-6 inset-x-4 h-12 max-w-[720px] bg-[#404040] backdrop-blur-sm mx-auto rounded-full shadow-lg z-50">
        <div className="h-full flex items-center justify-between mx-auto p-[3px] pr-2">
          <h3 className="text-theme-xl font-bold text-white">میزنکس</h3>

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
