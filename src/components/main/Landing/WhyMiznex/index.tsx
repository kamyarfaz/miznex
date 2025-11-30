"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { MotionDiv } from "@/utils/MotionWrapper";
import TickCircleSVG from "@/assets/svg/TickCircleSVG";
import { useTranslations } from "next-intl";

const WhyMiznex = () => {
  const t = useTranslations("WhyMiznex");

  const benefits = [
    t("betterBusinessManagement"),
    t("increaseRevenueByAttractingMoreCustomers"),
    t("improveServiceQuality"),
    t("modernAndProfessionaImage"),
    t("reduceOperationalAndPrintingCosts"),
    t("becomeMoreCompetitiveInMarket"),
  ];
  const duplicatedBenefits = [...benefits, ...benefits, ...benefits];

  return (
    <div className="relative mt-32">
      <MotionDiv
        className="text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
        }}
      >
        <h2 className="mb-3 relative z-10">
          <span className="text-bodyDark text-2xl font-bold flex items-center justify-center peyda">
            {t("whyBusinessNeedMiznex")}
          </span>
        </h2>
      </MotionDiv>
      <MotionDiv
        className="mb-4 md:mb-9 w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
        }}
      >
        <div className="relative rounded-2xl mb-5 z-10 rtl:-left-1/6 ltr:-right-1/6 rtl:max-md:-left-1/2 ltr:max-md:-right-1/2">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView="auto"
            centeredSlides={false}
            loop={true}
            freeMode={true}
            autoplay={{
              delay: 10,
              disableOnInteraction: false,
            }}
            speed={3000}
            className="h-full w-full !p-10 !overflow-visible !ease-linear"
          >
            {duplicatedBenefits.map((benefit, index) => (
              <SwiperSlide key={index} className="!w-auto">
                <div className="flex items-center text-center justify-center whitespace-nowrap p-4 gap-2 bg-white text-bodyDark shadow-[0_0_35px_rgba(0,0,0,0.07)] rounded-[12px]">
                  <TickCircleSVG />
                  {benefit}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </MotionDiv>
    </div>
  );
};

export default WhyMiznex;
