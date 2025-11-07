"use client";
import { MotionDiv } from "@/utils/MotionWrapper";
import { useTranslations } from "next-intl";

const CategorySectionClient = () => {
  const t = useTranslations("categorySection");

  return (
    <>
      <div className="relative" id="about-us">
        <MotionDiv
          className="text-center mb-4 md:mb-9 peyda"
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
          <h2 className="mb-3 relative">
            <span className="text-bodyDark text-2xl relative z-10 font-bold">
              {t("miznexEverythingInHands")}
            </span>
          </h2>
          <p className="text-lg text-bodyNormal font-normal">
            {t("createMeTakeOrders")}
          </p>
        </MotionDiv>
      </div>
    </>
  );
};

export default CategorySectionClient;
