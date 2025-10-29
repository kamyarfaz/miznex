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

const StatsSection = () => {
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
        className="flex flex-col xl:flex-row justify-center gap-6 pb-12 px-4 [&>div>div>div]:shadow-[0_0_35px_rgba(0,0,0,0.07)] [&>div>div>div]:flex [&>div>div>div]:flex-col [&>div>div>div]:bg-white [&>div>div>div]:p-5 [&>div>div>div]:rounded-3xl [&_h3]:text-lg [&_h3]:text-bodyDark [&_h3]:font-bold [&_img]:mb-3 [&_p]:text-[14px] [&_p]:mt-2 [&_p]:leading-[22px] [&_p]:text-bodyNormal"
      >
        <div className="flex gap-6 max-xl:[&>div]:w-full">
          <div className="flex flex-col justify-center">
            <div>
              <Image src={aboutUs1} alt="ساخت منوی کاملاً رایگان" />
              <h3>ساخت منوی کاملاً رایگان</h3>
              <p className="max-xl:!mb-0 max-2xl:mb-5">
                بساز، ویرایش کن، منتشر کن بدون هیچ هزینه‌ای!
              </p>
              <ul className="text-bodyDark text-sm space-y-7 mt-4 [&>li]:flex [&>li]:items-center [&>li]:gap-2">
                <li>
                  <TickCircleSVG /> کاملاً رایگان یعنی هزینه صفر
                </li>
                <li>
                  <TickCircleSVG /> راه‌اندازی رایگان
                </li>
                <li>
                  <TickCircleSVG /> سریع، مطمئن و امن
                </li>
                <li>
                  <TickCircleSVG /> پشتیبانی رایگان و سریع
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-4">
            <div>
              <Image src={aboutUs2} alt="منوی چندگانه" />
              <h3>منوی چندگانه</h3>
              <p>برای صبحانه، ناهار، شام و ... منوی اختصاصی بساز!</p>
            </div>

            <div>
              <Image src={aboutUs3} alt="اپ موبایل" />
              <h3>اپ موبایل</h3>
              <p>برای صبحانه، ناهار، شام و ... منوی اختصاصی بساز!</p>
            </div>
          </div>
        </div>
        <div className="flex gap-6 max-xl:[&>div]:w-full">
          <div className="flex flex-col justify-center">
            <div>
              <Image src={aboutUs4} alt="داشبورد تحلیلی اختصاصی" />
              <h3>داشبورد تحلیلی اختصاصی</h3>
              <p className="max-xl:!mb-0 max-2xl:mb-5">
                بیزینس خودت رو تحلیل کن و سطح درآمد ماهانه رو افزایش بده!
              </p>
              <ul className="text-bodyDark text-sm space-y-7 mt-4 [&>li]:flex [&>li]:items-center [&>li]:gap-2">
                <li>
                  <TickCircleSVG /> تحلیل فروش کل
                </li>
                <li>
                  <TickCircleSVG /> آیتم‌های پرفروش
                </li>
                <li>
                  <TickCircleSVG /> پرطرفدارترین آیتم‌ها
                </li>
                <li>
                  <TickCircleSVG /> تحلیل‌های نموداری
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-4">
            <div>
              <Image src={aboutUs5} alt="ظاهر جذاب" />
              <h3>ظاهر جذاب</h3>
              <p>منوی رستوران/کافه‌ات باید مثل غذاهایت جذاب باشد.</p>
            </div>

            <div>
              <Image src={aboutUs6} alt="پرداخت آنلاین" />
              <h3>پرداخت آنلاین</h3>
              <p>با پرداخت آنلاین از شلوغی دم صندوق جلوگیری کن!</p>
            </div>
          </div>
        </div>
      </section>
    </MotionDiv>
  );
};

export default StatsSection;
