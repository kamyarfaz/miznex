import { ResourcesProps } from "@/types/main";
import { MotionDiv } from "@/utils/MotionWrapper";
import { useTranslations } from "next-intl";

const Resources = ({ resources }: ResourcesProps) => {
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
          <div className="w-1 h-[9px] bg-action rounded-full"></div> {t("resources")}
        </h3>
      </MotionDiv>

      <div className="text-right space-y-3">
        {resources.map((item, index) => (
          <MotionDiv
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <span className="text-bodyDark text-sm font-regular">
              {item.text}
            </span>
          </MotionDiv>
        ))}
      </div>
    </div>
  );
};

export default Resources;
