"use client";

import { useTranslations } from "next-intl";
import {
  MotionDiv,
  MotionH1,
  MotionP,
  MotionSpan,
} from "@/utils/MotionWrapper";

const HeroContent = () => {
  const t = useTranslations("heroSection");

  return (
    <div className="max-lg: text-center rtl:text-right ltr:text-left space-y-8 max-lg:order-2">
      <MotionDiv
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative rounded-full w-max">
          <div className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-[#E2E2E2] to-white p-[1px]"></div>
          <div className="relative bg-[#F2F2F2] rounded-full pl-2.5 flex items-center ltr:flex-row-reverse gap-2">
            <span className="py-1 px-2.5 bg-gradient-to-l from-[#FF5B35] to-[#FF7B5C] text-white rounded-full">
              {t("heroContent.miznex")}
            </span>
            <span className="text-[16px] flex items-center gap-1">
              <span>🔥</span>
              <span className="bg-gradient-to-r from-[#5B6171] to-[#444955] bg-clip-text text-transparent">{t("heroContent.theFirstFreeMenuMaker")}</span>
            </span>
          </div>
        </div>
        <MotionH1
          className="text-lg lg:text-3xl xl:text-[40px] font-semibold text-[#3B3B3B]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <MotionSpan
            data-testid="hero-title"
            className="relative z-10"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            {t("heroContent.createAnOnlineAndFreeMenu")}
          </MotionSpan>
          <br className="lg:my-5" />
          <MotionSpan
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {t("heroContent.yourRestaurantCafeInNoTime")}
          </MotionSpan>
        </MotionH1>

        <MotionP
          data-testid="hero-description"
          className="text-[16px] font-normal text-bodyNormal max-w-2xl lg:mx-0 leading-relaxed flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <span>{t("heroContent.aSmartAndFreeAlternative")}</span>
          <span>{t("heroContent.digitalMenuWithIntegrated")}</span>
        </MotionP>
      </MotionDiv>

      <MotionDiv
        className="flex flex-col sm:flex-row gap-6 justify-start"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.3 }}
      >
        <MotionDiv className="flex items-center gap-4 text-[15px] [&>div]:rounded-full [&>div]:cursor-pointer [&>div]:py-2 [&>div]:px-[29px]">
          <div className="text-white bg-action lg:bg-[#404040] font-medium">
            {t("heroContent.downloadApp")}
          </div>
          <div className="text-bodyDark font-normal border border-bodyNormal">
            {t("heroContent.support")}
          </div>
        </MotionDiv>
      </MotionDiv>
    </div>
  );
};

export default HeroContent;
