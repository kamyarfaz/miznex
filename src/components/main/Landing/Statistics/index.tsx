"use client";

import { MotionDiv } from "@/utils/MotionWrapper";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Statistics = () => {
  const t = useTranslations("statistics");
  const params = useParams();
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev === 2 ? 0 : prev + 1));
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const cards = [
    {
      title: t("autoInventoryManagment"),
      content: t("withEachCustomerOrder"),
    },
    {
      title: t("controlRawMaterials"),
      content: t("withEachCustomerOrder"),
    },
    {
      title: t("saveTime"),
      content: t("noMoreNeedForManualAccounting"),
    },
    {
      title: t("accurateStatisticalReports"),
      content: t("instantAccessToSalesReports"),
    },
  ];

  return (
    <div className="relative mt-20" id="contact-us">
      <MotionDiv
        className="text-center lg:mb-9 peyda"
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
            {t("professionalStatisticsSystem")}
          </span>
        </h2>
        <p className="text-lg text-bodyNormal font-normal">
          {t("noNeedForSeparateAccountingSystem")}
        </p>
      </MotionDiv>

      <MotionDiv
        className="lg:mb-9 flex items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
        }}
      >
        <div className="w-[5px] h-[215px] bg-disable lg:hidden relative bottom-2.5 rounded-full sm:right-7 sm:top-3">
          <div
            className={`bg-action h-1/3 rounded-full relative transition-all duration-200`}
            style={{ top: index * 33.33 + "%" }}
          ></div>
        </div>
        <div className="flex max-lg:flex-col items-start lg:items-center w-full lg:h-[175px] justify-between sm:p-8 max-sm:mb-8 mt-5 rounded-3xl text-center lg:bg-white lg:shadow-[0_0_35px_rgba(0,0,0,0.07)] [&>div]:max-lg:mb-4 [&>div]:lg:w-1/3 [&>div]:flex [&>div]:lg:flex-col [&>div]:items-center [&>div]:justify-center [&>div>div]:mt-3">
          <div className="rtl:max-lg:text-right ltr:max-lg:text-left">
            <h2 className="text-[#FF5B35] bg-secondary max-lg:scale-[60%] relative max-lg:bottom-1.5 size-12 flex items-center justify-center rounded-full font-bold text-[28px]">
              {["fa", "ar"].includes(String(params.locale)) ? "۱" : "1"}
            </h2>
            <div>
              <h3 className="font-medium text-xl mb-1 peyda text-bodyDark">
                {t("customerPlacesOrder")}
              </h3>
              <p className={`text-sm font-regular !leading-[22px] text-bodyNormal ${index == 0 ? "" : "max-lg:hidden"}`}>
                {t("customerGivesYouOrder")}
              </p>
            </div>
          </div>
          <div className="rtl:max-lg:text-right ltr:max-lg:text-left">
            <h2 className="text-[#FF5B35] bg-secondary max-lg:scale-[60%] relative max-lg:bottom-1.5 size-12 flex items-center justify-center rounded-full font-bold text-[28px]">
              {["fa", "ar"].includes(String(params.locale)) ? "۲" : "2"}
            </h2>
            <div>
              <h3 className="font-medium text-xl mb-1 peyda text-bodyDark">
                {t("automaticInventoryReduction")}
              </h3>
              <p className={`text-sm font-regular !leading-[22px] text-bodyNormal ${index == 1 ? "" : "max-lg:hidden"}`}>
                {t("thePizzaInventorySystem")}
              </p>
            </div>
          </div>

          <div className="rtl:max-lg:text-right ltr:max-lg:text-left">
            <h2 className="text-[#FF5B35] bg-secondary max-lg:scale-[60%] relative max-lg:bottom-1.5 size-12 flex items-center justify-center rounded-full font-bold text-[28px]">
              {["fa", "ar"].includes(String(params.locale)) ? "۳" : "3"}
            </h2>
            <div>
              <h3 className="font-medium text-xl mb-1 peyda text-bodyDark">
                {t("reduceRawMaterials")}
              </h3>
              <p className={`text-sm font-regular !leading-[22px] text-bodyNormal ${index == 2 ? "" : "max-lg:hidden"}`}>
                {t("rawMaterialsWillAlsoDecrease")}
              </p>
            </div>
          </div>
        </div>
      </MotionDiv>

      <MotionDiv
        className="mb-10 md:mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
        }}
      >
        <div className="grid sx:grid-cols-2 lg:grid-cols-4 gap-6 max-2xl:max-w-7xl max-lg:px-4">
          {cards.map((item, index) => (
            <div
              key={index}
              className="flex flex-col p-6 gap-3 bg-white shadow-[0_0_35px_rgba(0,0,0,0.07)] rounded-3xl
                   min-h-[180px] justify-between"
            >
              <h4 className="text-lg font-medium peyda text-bodyDark">
                {item.title}
              </h4>
              <span className="w-full h-[1px] bg-bo-primary"></span>
              <p className="text-sm text-bodyNormal">{item.content}</p>
            </div>
          ))}
        </div>
      </MotionDiv>
    </div>
  );
};

export default Statistics;
