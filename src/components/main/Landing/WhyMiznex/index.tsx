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
        <div className="relative rounded-2xl mb-5 z-10 -left-1/6">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            breakpoints={{
              0: { slidesPerView: 1.2 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            centeredSlides={false}
            loop={true}
            freeMode={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={1000}
            className="h-full w-full !p-10 !overflow-visible"
          >
            {benefits.map((benefit, index) => (
              <SwiperSlide key={index}>
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
