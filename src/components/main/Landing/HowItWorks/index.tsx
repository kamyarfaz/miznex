"use client";

import MenuSVG from "@/assets/svg/MenuSVG";
import QRCodeSVG from "@/assets/svg/QRCodeSVG";
import UserSVG from "@/assets/svg/UserSVG";
import { MotionDiv } from "@/utils/MotionWrapper";
import { useTranslations } from "next-intl";

const HowItWorks = () => {
  const t = useTranslations("howItWorks");
  
  return (
    <div className="relative" id="HowItWorks">
      <MotionDiv
        className="text-center mb-4 md:mb-9 peyda"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
        }}
      >
        <h2 className="mb-3 relative">
          <span className="text-bodyDark text-2xl relative z-10 font-bold">
            {t("howMiznexWorks")}
          </span>
        </h2>
        <p className="text-lg text-bodyNormal font-normal">
          {t("setUpYourDigitalMenu")}
        </p>
      </MotionDiv>

      <MotionDiv
        className="mb-4 md:mb-9 flex flex-col md:flex-row gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
        }}
      >
        <div className="w-full flex md:items-center max-md:flex-col min-h-[186px] justify-between p-8 gap-4 rounded-3xl bg-gradient-to-tr from-[#FF7B5C] to-[#FF5B35] md:[&>div]:w-1/3 [&>div>div]:text-white rtl:md:[&>div>div]:pl-8 rtl:md:[&>div>div]:pr-8 [&>div>div]:mt-2">
          <div>
            <UserSVG />
            <div>
              <h3 className="font-extrabold text-xl mb-3 peyda">
                {t("signUpForMiznex")}
              </h3>
              <p className="text-sm font-medium !leading-[22px]">
                {t("createYourFreeAccount")}
              </p>
            </div>
          </div>
          <div>
            <MenuSVG />
            <div>
              <h3 className="font-extrabold text-xl mb-3 peyda">
                {t("createYourDigitalMenu")}
              </h3>
              <p className="text-sm font-medium !leading-[22px]">
                {t("useOurSimpleEditor")}
              </p>
            </div>
          </div>

          <div>
            <QRCodeSVG />
            <div>
              <h3 className="font-extrabold text-xl mb-3 peyda">
                {t("shareYourQRCode")}
              </h3>
              <p className="text-sm font-medium !leading-[22px]">
                {t("createUniqueQRCode")}
              </p>
            </div>
          </div>
        </div>
      </MotionDiv>
    </div>
  );
};

export default HowItWorks;
