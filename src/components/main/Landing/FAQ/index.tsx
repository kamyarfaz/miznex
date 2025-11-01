"use client";

import { useState } from "react";
import FAQSVG from "@/assets/svg/FAQSVG";
import { MotionDiv } from "@/utils/MotionWrapper";
import { ArrowBigDown, ChevronDown } from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "آیا منوی Mizenex روی همه گوشی‌ها کار می‌کند؟",
      answer:
        "بله، منوهای ما کاملاً ریسپانسیو هستند و به طور کامل روی انواع گوشی‌های اندروید و iOS و همچنین دسکتاپ نمایش داده می‌شوند.",
    },
    {
      question: "آیا برای استفاده از Mizenex به کدنویسی نیاز است؟",
      answer: "خیر، استفاده از Mizenex نیازی به دانش برنامه‌نویسی ندارد.",
    },
    {
      question: "اگر منو را بروزرسانی کنیم، آیا QR کد تغییر می‌کند؟",
      answer: "خیر، QR کد ثابت می‌ماند و فقط محتوای منو به‌روزرسانی می‌شود.",
    },
    {
      question: "اگر منو را حذف کنیم، آیا QR کد تغییر می‌کند؟",
      answer: "در صورت حذف کامل منو، QR کد دیگر فعال نخواهد بود.",
    },
  ];

  return (
    <>
      <MotionDiv
        className="text-center mb-8 mt-16 peyda"
        id="faq"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
        }}
      >
        <h2 className="text-2xl font-bold text-bodyDark mb-3">سوالات متداول</h2>
        <p className="text-bodyNormal text-lg">
          هر آنچه باید درباره میزنکس بدانید
        </p>
      </MotionDiv>

      <MotionDiv
        className="text-center mb-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
        }}
      >
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#F6F6F6] rounded-2xl overflow-hidden p-4 w-full max-w-[738px]"
              >
                <div>
                  <button
                    className="w-full flex justify-between items-center text-right cursor-pointer text-bodyDark "
                    onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                  >
                    <span className="font-medium text-headings text-lg">{faq.question}</span>

                    <ChevronDown
                      className={`text-xl transition-transform text-i-primary ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                      strokeWidth={1.5}
                    />
                  </button>

                  {openIndex === index && (
                    <div className="text-bodyNormal ml-20 mt-3 text-right font-regular">
                      {faq.answer}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col min-w-[253px]">
            <FAQSVG className="w-full" />
            <div className="text-center mt-6">
              <p className="text-[#494848] font-medium">هنوز سوالی دارید؟</p>
              <button className="mt-3 bg-surface-dark text-white px-4 py-2 rounded-full text-[15px] font-regular">
                تماس با پشتیبانی
              </button>
            </div>
          </div>
        </div>
      </MotionDiv>
    </>
  );
};

export default FAQ;
