import MiznexSVG from "@/assets/svg/MiznexSVG";
import { MotionDiv } from "@/utils/MotionWrapper";
import { useTranslations } from "next-intl";

const Description = () => {
  const t = useTranslations("footer");

  return (
    <div className="space-y-3 col-span-2 sx:col-span-3 sm:col-span-1">
      <MotionDiv
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-2">
          <MiznexSVG />
          <h3 className="text-theme-xl font-bold text-action">{t("miznex")}</h3>
        </div>
        <p className="text-bodyDark leading-[26px] font-light mt-4">{t("intelligentPlatform")}</p>
      </MotionDiv>
    </div>
  );
};

export default Description;
