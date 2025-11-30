"use client";

import DiagramUpSVG from "@/assets/svg/DiagramUpSVG";
import Union3SVG from "@/assets/svg/Union3SVG";
import { MotionDiv } from "@/utils/MotionWrapper";
import { useTranslations } from "next-intl";

const Grow = () => {
  const t = useTranslations("grow");

  const cards = [
    {
      percentage: t("+45%"),
      title: t("increaseSatisfiedCustomers"),
      content: t("byProvidingModern"),
    },
    {
      percentage: t("+35%"),
      title: t("increaseOrders"),
      content: t("easyAccessToMenu"),
    },
    {
      percentage: t("+60%"),
      title: t("reduceErrorsInOrders"),
      content: t("withClearDigitalMenu"),
    },
    {
      percentage: t("+70%"),
      title: t("reduceOrderTakingTime"),
      content: t("customersDecideAndOrderFaster"),
    },
  ];
  return (
    <div className="relative mt-32">
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
        <div className="absolute left-0 top-0">
          <Union3SVG />
        </div>
        <h2 className="mb-3 relative z-10">
          <span className="text-bodyDark text-2xl font-bold flex items-center justify-center">
            {t("withMiznex")}
            <span className="text-success flex items-center mx-2 gap-2 ltr:flex-row-reverse">
              {t("growWithMiznex")} <DiagramUpSVG />
            </span>
            {t("Do")}
          </span>
        </h2>
        <p className="text-lg text-bodyNormal font-normal relative z-10">
          {t("createAMenuTakeOrders")}
        </p>
      </MotionDiv>

      <MotionDiv
        className="mb-4 md:mb-9"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
        }}
      >
        <div className="grid grid-cols-1 sx:grid-cols-2 lg:grid-cols-4 gap-6 max-2xl:max-w-7xl px-4 max-md:mt-6">
          {cards.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center justify-center p-5 gap-3 
                   sm:min-h-[150px] md:min-h-[174px] bg-white shadow-[0_0_35px_rgba(0,0,0,0.07)] rounded-3xl"
            >
              <span className="text-success text-[32px] font-medium peyda max-md:text-2xl">
                {item.percentage}
              </span>
              <h4 className="max-md:text-[18px] text-xl font-bold peyda text-bodyDark">
                {item.title}
              </h4>
              <p className="text-sm text-bodyNormal max-md:text-[12px]">{item.content}</p>
            </div>
          ))}
        </div>
      </MotionDiv>
    </div>
  );
};

export default Grow;
