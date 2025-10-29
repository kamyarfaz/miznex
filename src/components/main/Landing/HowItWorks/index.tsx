"use client";

import MenuSVG from "@/assets/svg/MenuSVG";
import QRCodeSVG from "@/assets/svg/QRCodeSVG";
import UserSVG from "@/assets/svg/UserSVG";
import { MotionDiv } from "@/utils/MotionWrapper";

const HowItWorks = () => {
  return (
    <div className="relative" id="HowItWorks">
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
            نحوه کار میزنکس
          </span>
        </h2>
        <p className="text-lg text-bodyNormal font-normal">
          منوی دیجیتال خود را در سه مرحله ساده راه‌اندازی کنید
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
        <div className="flex items-center h-[186px] justify-between p-8 rounded-3xl bg-gradient-to-tr from-[#FF7B5C] to-[#FF5B35] [&>div>div]:text-white [&>div>div]:pl-8 [&>div>div]:mt-2">
          <div>
            <UserSVG />
            <div>
              <h3 className="font-extrabold text-xl mb-3 peyda">
                در میزنس ثبت‌نام کنید
              </h3>
              <p className="text-sm font-medium !leading-[22px]">
                حساب کاربری رایگان خود را در چند ثانیه بسازید. نیازی به هیچ
                هزینه‌ای برای شروع نیست.
              </p>
            </div>
          </div>
          <div>
            <MenuSVG />
            <div>
              <h3 className="font-extrabold text-xl mb-3 peyda">
                منوی دیجیتال خود را بسازید
              </h3>
              <p className="text-sm font-medium !leading-[22px]">
                از ویرایشگر ساده ما برای افزودن آیتم‌ها، عکس‌ها، قیمت‌ها و
                سفارشی‌سازی ظاهر مناسب با برند خود استفاده کنید.
              </p>
            </div>
          </div>

          <div>
            <QRCodeSVG />
            <div>
              <h3 className="font-extrabold text-xl mb-3 peyda">
                کد QR خود را با مشتریان به اشتراک بگذارید
              </h3>
              <p className="text-sm font-medium !leading-[22px]">
                یک کد QR منحصر به فرد ایجاد کنید و به مشتریان اجازه دهید تا منوی
                شما را فوراً روی دستگاه‌هایشان مشاهده کنند.
              </p>
            </div>
          </div>
        </div>
      </MotionDiv>
    </div>
  );
};

export default HowItWorks;
