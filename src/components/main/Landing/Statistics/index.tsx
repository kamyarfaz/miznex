"use client";

import { MotionDiv } from "@/utils/MotionWrapper";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

const Statistics = () => {
  const t = useTranslations("statistics");
  const params = useParams()
  
  const cards = [
    {
      title: t("autoInventoryManagment"),
      content:
        t("withEachCustomerOrder"),
    },
    {
      title: t("controlRawMaterials"),
      content:
        t("withEachCustomerOrder"),
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
            {t("professionalStatisticsSystem")}
          </span>
        </h2>
        <p className="text-lg text-bodyNormal font-normal">
          {t("noNeedForSeparateAccountingSystem")}
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
        <div className="flex items-center w-full h-[175px] justify-between p-8 mt-5 rounded-3xl text-center bg-white shadow-[0_0_35px_rgba(0,0,0,0.07)] [&>div]:w-1/3 [&>div]:flex [&>div]:flex-col [&>div]:items-center [&>div]:justify-center [&>div>div]:mt-3">
          <div>
            <h2 className="text-[#FF5B35] bg-secondary size-12 flex items-center justify-center rounded-full font-bold text-[28px]">
              {["fa", "ar"].includes(String(params.locale)) ? "۱" : "1"}
            </h2>
            <div>
              <h3 className="font-medium text-xl mb-1 peyda text-bodyDark">
                {t("customerPlacesOrder")}
              </h3>
              <p className="text-sm font-regular !leading-[22px] text-bodyNormal">
                {t("customerGivesYouOrder")}
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-[#FF5B35] bg-secondary size-12 flex items-center justify-center rounded-full font-bold text-[28px]">
              {["fa", "ar"].includes(String(params.locale)) ? "۲" : "2"}
            </h2>
            <div>
              <h3 className="font-medium text-xl mb-1 peyda text-bodyDark">
                {t("automaticInventoryReduction")}
              </h3>
              <p className="text-sm font-regular !leading-[22px] text-bodyNormal">
                {t("thePizzaInventorySystem")}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-[#FF5B35] bg-secondary size-12 flex items-center justify-center rounded-full font-bold text-[28px]">
              {["fa", "ar"].includes(String(params.locale)) ? "۳" : "3"}
            </h2>
            <div>
              <h3 className="font-medium text-xl mb-1 peyda text-bodyDark">
                {t("reduceRawMaterials")}
              </h3>
              <p className="text-sm font-regular !leading-[22px] text-bodyNormal">
                {t("rawMaterialsWillAlsoDecrease")}
              </p>
            </div>
          </div>
        </div>
      </MotionDiv>

      <MotionDiv
        className="mb-10 md:mb-20 flex flex-col md:flex-row gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
        }}
      >
        <div className="w-full flex items-start justify-between ltr:flex-row-reverse [&>div]:w-1/4 gap-6 relative z-10">
          {cards.map((item, index) => (
            <div
              className="flex flex-col p-6 gap-3 w-[290px] xl:pb-14 bg-white shadow-[0_0_35px_rgba(0,0,0,0.07)] rounded-3xl"
              key={index}
            >
              <h4 className="text-lg font-medium peyda text-bodyDark">{item.title}</h4>
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
