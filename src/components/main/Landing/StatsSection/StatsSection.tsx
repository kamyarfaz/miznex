"use client";

import Image from "next/image";
import aboutUs1 from "./../../../../assets/AboutUs/aboutUs1.png";
import aboutUs2 from "./../../../../assets/AboutUs/aboutUs2.png";
import aboutUs3 from "./../../../../assets/AboutUs/aboutUs3.png";
import aboutUs4 from "./../../../../assets/AboutUs/aboutUs4.png";
import aboutUs5 from "./../../../../assets/AboutUs/aboutUs5.png";
import aboutUs6 from "./../../../../assets/AboutUs/aboutUs6.png";
import TickCircleSVG from "@/assets/svg/TickCircleSVG";
import { MotionDiv } from "@/utils/MotionWrapper";
import { useTranslations } from "next-intl";

const StatsSection = () => {
  const t = useTranslations("statsSection");

  return (
    <MotionDiv
      className="mb-4 md:mb-9"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8 },
        },
      }}
    >
      <section
        data-testid="stats-section"
        className="flex flex-col xl:flex-row justify-center gap-6 pb-12 px-4 [&>div>div>div]:shadow-[0_0_35px_rgba(0,0,0,0.07)] [&>div>div>div]:flex [&>div>div>div]:flex-col [&>div>div>div]:bg-white [&>div>div>div]:p-5 [&>div>div>div]:rounded-3xl [&_h3]:text-lg [&_h3]:text-bodyDark [&_h3]:font-bold [&_h3]:peyda [&_img]:mb-3 [&_p]:text-[14px] [&_p]:mt-2 [&_p]:leading-[22px] [&_p]:text-bodyNormal"
      >
        <div className="flex gap-6 max-xl:[&>div]:w-full">
          <div className="flex flex-col justify-center">
            <div>
              <Image src={aboutUs1} alt={t("completelyFreeMenuCreation")} />
              <h3>{t("completelyFreeMenuCreation")}</h3>
              <p className="max-xl:!mb-0 max-2xl:mb-5">
                {t("createEditPublishAtNoCost")}
              </p>
              <ul className="text-bodyDark text-sm space-y-7 mt-4 [&>li]:flex [&>li]:items-center [&>li]:gap-2">
                <li>
                  <TickCircleSVG /> {t("completelyFreeMeansZeroCost")}
                </li>
                <li>
                  <TickCircleSVG /> {t("freeSetup")}
                </li>
                <li>
                  <TickCircleSVG /> {t("fastReliableAndSecure")}
                </li>
                <li>
                  <TickCircleSVG /> {t("freeAndQuickSupport")}
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-4">
            <div>
              <Image src={aboutUs2} alt={t("multipleMenus")} />
              <h3>{t("multipleMenus")}</h3>
              <p>{t("createDedicatedMenu")}</p>
            </div>

            <div>
              <Image src={aboutUs3} alt={t("mobileApp")} />
              <h3>{t("mobileApp")}</h3>
              <p>{t("createDedicatedMenu")}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-6 max-xl:[&>div]:w-full">
          <div className="flex flex-col justify-center">
            <div>
              <Image src={aboutUs4} alt={t("dedicatedAnalyticalDashboard")} />
              <h3>{t("dedicatedAnalyticalDashboard")}</h3>
              <p className="max-xl:!mb-0 max-2xl:mb-5">
                {t("analyzeYourBusiness")}
              </p>
              <ul className="text-bodyDark text-sm space-y-7 mt-4 [&>li]:flex [&>li]:items-center [&>li]:gap-2">
                <li>
                  <TickCircleSVG /> {t("totalSalesAnalysis")}
                </li>
                <li>
                  <TickCircleSVG /> {t("bestSellingItems")}
                </li>
                <li>
                  <TickCircleSVG /> {t("mostPopularItems")}
                </li>
                <li>
                  <TickCircleSVG /> {t("graphicalAnalyses")}
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-4">
            <div>
              <Image src={aboutUs5} alt={t("attractiveAppearance")} />
              <h3>{t("attractiveAppearance")}</h3>
              <p>{t("yourRestaurantCafeMenuShould")}</p>
            </div>

            <div>
              <Image src={aboutUs6} alt={t("onlinePayment")} />
              <h3>{t("onlinePayment")}</h3>
              <p>{t("avoidTheRush")}</p>
            </div>
          </div>
        </div>
      </section>
    </MotionDiv>
  );
};

export default StatsSection;
