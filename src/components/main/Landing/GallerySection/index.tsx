"use client";

import DiagramUpSVG from "@/assets/svg/DiagramUpSVG";
import Union3SVG from "@/assets/svg/Union3SVG";
import { MotionDiv } from "@/utils/MotionWrapper";

const Grow = () => {
  const cards = [
    {
      percentage: "+۴۵٪",
      title: "افزایش مشتریان راضی",
      content: "با ارائه تجربه دیجیتال مدرن و حرفه‌ای به مشتریان",
    },
    {
      percentage: "+۳۵٪",
      title: "افزایش سفارشات",
      content: "دسترسی آسان به منو باعث افزایش تعداد سفارشات می‌شود",
    },
    {
      percentage: "+۶۰٪",
      title: "کاهش خطا در سفارشات",
      content: "با منوی دیجیتال واضح، اشتباهات سفارش‌گیری کاهش می‌یابد",
    },
    {
      percentage: "+۷۰٪",
      title: "کاهش زمان سفارش‌گیری",
      content: "مشتریان سریع‌تر تصمیم می‌گیرند و سفارش می‌دهند",
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
            با میزنکس
            <span className="text-success flex items-center mx-2 gap-2">
              رشد <DiagramUpSVG />
            </span>
            کنید!
          </span>
        </h2>
        <p className="text-lg text-bodyNormal font-normal relative z-10">
          منو بسازید، سفارش بگیرید و پرداخت را در همان لحظه پردازش کنید! همه در
          یک پلتفرم موبایل‌محور!
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
        <div className="w-full flex items-start justify-between [&>div]:w-1/4 gap-6 relative z-10">
          {cards.map((item, index) => (
            <div
              className="flex flex-col items-center text-center justify-center p-6 gap-3 w-[290px] h-[174px] max-2xl:!h-max bg-white shadow-[0_0_35px_rgba(0,0,0,0.07)] rounded-3xl"
              key={index}
            >
              <span className="text-success text-[32px] font-medium peyda">
                {item.percentage}
              </span>
              <h4 className="text-xl font-bold peyda text-bodyDark">{item.title}</h4>
              <p className="text-sm text-bodyNormal">{item.content}</p>
            </div>
          ))}
        </div>
      </MotionDiv>
    </div>
  );
};

export default Grow;
