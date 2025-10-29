"use client";
import { MotionDiv } from "@/utils/MotionWrapper";

const CategorySectionClient = () => {
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
              با میزنکس همه چیز دست خودته!
            </span>
          </h2>
          <p className="text-lg text-bodyNormal font-normal">
            منو بسازید، سفارش بگیرید و پرداخت را در همان لحظه پردازش کنید! همه
            در یک پلتفرم موبایل‌محور!
          </p>
        </MotionDiv>
      </div>
    </>
  );
};

export default CategorySectionClient;
