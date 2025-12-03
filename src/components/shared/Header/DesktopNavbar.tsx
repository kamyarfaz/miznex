import { Download } from "lucide-react";
import { MotionSpan } from "@/utils/MotionWrapper";
import { DesktopNavbarProps } from "@/types/main";
import { useTranslations } from "next-intl";

const DesktopNavbar: React.FC<DesktopNavbarProps> = ({
  isAuthenticated,
  user,
  pathname,
  openLoginDialog,
  setOpenLoginDialog,
  links,
  handleScroll,
  activeId
}) => {
  const t = useTranslations("navbar");

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
        <div className="bg-white text-bodyDark h-full px-4 rounded-full font-medium flex items-center gap-2 text-[15px] cursor-pointer max-lg:border max-lg:border-action">
          <Download width={18} className="max-lg:stroke-action-hover" />{" "}
          {t("desktopNavbar.downloadApp")}
        </div>
      </div>
    </>
  );
};

export default DesktopNavbar;
