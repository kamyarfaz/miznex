"use client";

import { MotionDiv } from "@/utils/MotionWrapper";

const Statistics = () => {
  const cards = [
    {
      title: "مدیریت خودکار موجودی",
      content:
        "با هر سفارش مشتری، موجودی آیتم‌های منو به صورت خودکار کاهش می‌یابد",
    },
    {
      title: "کنترل مواد اولیه",
      content:
        "با هر سفارش مشتری، موجودی آیتم‌های منو به صورت خودکار کاهش می‌یابد",
    },
    {
      title: "صرفه‌جویی در زمان",
      content: "دیگر نیازی به حسابداری دستی و شمارش موجودی نیست",
    },
    {
      title: "گزارش‌های آماری دقیق",
      content: "دسترسی لحظه‌ای به گزارش فروش، محبوب‌ترین آیتم‌ها و روند فروش",
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
            سیستم آمارگیری حرفه‌ای
          </span>
        </h2>
        <p className="text-lg text-bodyNormal font-normal">
          دیگر نیازی به سیستم حسابداری جداگانه ندارید! میزانکس به صورت هوشمند
          موجودی و مواد اولیه شما را مدیریت می‌کند
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
              ۱
            </h2>
            <div>
              <h3 className="font-medium text-xl mb-1 peyda text-bodyDark">
                مشتری سفارش می‌دهد
              </h3>
              <p className="text-sm font-regular !leading-[22px] text-bodyNormal">
                مشتری سفارش را به شما میدهد
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-[#FF5B35] bg-secondary size-12 flex items-center justify-center rounded-full font-bold text-[28px]">
              ۲
            </h2>
            <div>
              <h3 className="font-medium text-xl mb-1 peyda text-bodyDark">
                کاهش خودکار موجودی
              </h3>
              <p className="text-sm font-regular !leading-[22px] text-bodyNormal">
                سیستم موجودی پیتزا را ۱ عدد کم می‌کند
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-[#FF5B35] bg-secondary size-12 flex items-center justify-center rounded-full font-bold text-[28px]">
              ۳
            </h2>
            <div>
              <h3 className="font-medium text-xl mb-1 peyda text-bodyDark">
                کاهش مواد اولیه
              </h3>
              <p className="text-sm font-regular !leading-[22px] text-bodyNormal">
                خمیر، پنیر، گوشت و سایر مواد اولیه نیز کاهش می‌یابند
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
        <div className="w-full flex items-start justify-between [&>div]:w-1/4 gap-6 relative z-10">
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
