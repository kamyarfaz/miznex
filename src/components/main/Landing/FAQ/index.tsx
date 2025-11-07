"use client";

import { useState } from "react";
import FAQSVG from "@/assets/svg/FAQSVG";
import { MotionDiv } from "@/utils/MotionWrapper";
import { ArrowBigDown, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const t = useTranslations("faq");

  const faqs = [
    {
      question: t("doesMiznexMenuWork"),
      answer: t("yesOurMenusAreFullyResponsive"),
    },
    {
      question: t("isCodingRequiredToUse"),
      answer: t("noProgrammingKnowledgeRequired"),
    },
    {
      question: t("ifWeUpdateMenu"),
      answer: t("qrRemainsSameOnMenuUpdate"),
    },
    {
      question: t("qrChangeOnMenuDelete"),
      answer: t("qrInactiveOnMenuDeletion"),
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
        <h2 className="text-2xl font-bold text-bodyDark mb-3">{t("question")}</h2>
        <p className="text-bodyNormal text-lg">
          {t("aboutMizenex")}
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
              <p className="text-[#494848] font-medium">{t("stillHaveQuestions")}</p>
              <button className="mt-3 bg-surface-dark text-white px-4 py-2 rounded-full text-[15px] font-regular">
                {t("contactSupport")}
              </button>
            </div>
          </div>
        </div>
      </MotionDiv>
    </>
  );
};

export default FAQ;
