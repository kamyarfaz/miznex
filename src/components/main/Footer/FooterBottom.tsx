"use client";
import { MotionDiv, MotionP } from "@/utils/MotionWrapper";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import eNamad from "./../../../assets/footer/eNamad.png";
import zarinpal from "./../../../assets/footer/zarinpal.png";
import Image from "next/image";
import TelegramSVG from "@/assets/svg/TelegramSVG";
import InstagramSVG from "@/assets/svg/InstagramSVG";
import LinkedinSVG from "@/assets/svg/LinkedinSVG";
import XSVG from "@/assets/svg/XSVG";

const FooterBottom = () => {
  const t = useTranslations("footer");
  const params = useParams();

  const socialMedia = [
    <TelegramSVG />,
    <InstagramSVG />,
    <LinkedinSVG />,
    <XSVG />,
  ];
  return (
    <>
      <MotionDiv
        className="py-6 flex flex-row justify-between items-center max-md:gap-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col gap-4">
          <h3 className="text-t-dark font-medium max-sx:text-[14px] whitespace-nowrap">
            {t("miznexOnSocialMedia")}
          </h3>
          <div className="flex items-center gap-4">
            {socialMedia.map((item, index) => (
              <div
                className="flex items-center justify-center rounded-2xl border border-bo-primary w-11 h-11 max-sx:!size-8 max-sx:[&>svg]:scale-75"
                key={index}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-10 max-sm:gap-4">
          <Image
            width={55}
            height={77}
            src={zarinpal}
            alt="pic"
            className="h-[77px] w-[55px] max-sm:h-[62px] max-sm:w-[40px]"
          />
          <a
            referrerPolicy="origin"
            target="_blank"
            href="https://trustseal.enamad.ir/?id=682981&Code=Ou7SR3tN4IPlRtENXyhQVTZEWVY6gmWT"
          >
            <img
              referrerPolicy="origin"
              src="https://trustseal.enamad.ir/logo.aspx?id=682981&Code=Ou7SR3tN4IPlRtENXyhQVTZEWVY6gmWT"
              alt=""
              style={{ cursor: "pointer" }}
              className="h-[77px] w-[55px] max-sm:h-[62px] max-sm:w-[40px]"
            />
          </a>
        </div>
      </MotionDiv>
      <MotionDiv
        className="pt-8 border-t border-t-bo-primary flex flex-col-reverse md:flex-row justify-between items-start md:items-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center md:text-right mt-4 md:mt-0">
          <MotionP
            className="text-bodyNormal text-[12px] font-regular"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            ©{" "}
            {["fa"].includes(String(params.locale))
              ? new Date().toLocaleDateString("fa-IR", { year: "numeric" })
              : new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                })}{" "}
            {t("copyRight")}
          </MotionP>
        </div>

        <MotionDiv
          className="flex items-center gap-4 text-bodyNormal text-[12px] font-regular"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <span>{t("privacyPolicy")}</span>
          <span>{t("termsOfUse")}</span>
          <span>{t("termsAndConditions")}</span>
        </MotionDiv>
      </MotionDiv>
    </>
  );
};

export default FooterBottom;
