import { MotionDiv } from "@/utils/MotionWrapper";
import { QuickLinksProps } from "@/types/main";
import { useTranslations } from "next-intl";

const QuickLinks = ({ quickLinks }: QuickLinksProps) => {
  const t = useTranslations("footer");

  return (
    <div className="space-y-3 items-start h-full">
      <MotionDiv
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-t-dark font-medium flex items-center gap-2">
          <div className="w-1 h-[9px] bg-action rounded-full"></div> {t("quickLinks")}
        </h3>
      </MotionDiv>

      <div className="space-y-3">
        {quickLinks.map((link, index) => (
          <MotionDiv
            key={index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <span className="text-bodyDark text-sm font-regular">
              {link.text}
            </span>
          </MotionDiv>
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;
