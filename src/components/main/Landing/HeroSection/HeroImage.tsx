"use client";

import Image from "next/image";
import { MotionDiv } from "@/utils/MotionWrapper";
import Photo from "./../../../../assets/HeroSection/HeroSection.png";
import Photo2 from "./../../../../assets/HeroSection/HeroImgBack.png";
import Photo3 from "./../../../../assets/HeroSection/HeroSectionEn.png";
import GlassButton from "@/components/ui/GlassButton";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

const HeroImage = () => {
  const t = useTranslations("heroSection");
  const params = useParams()

  return (
    <MotionDiv
      className="relative mb-4 max-w-[696px] max-lg:max-w-[550px] max-md:mx-auto max-lg:order-1 rtl:max-lg:-left-16 ltr:max-lg:-right-16  rtl:max-md:left-16 ltr:max-md:right-16"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <Image
        width={390}
        src={params.locale == "fa" ? Photo : Photo3}
        alt="pic"
        className="relative z-10 rtl:right-40 ltr:left-40 h-[56%] w-[56%]"
      />
      <Image
        width={700}
        src={Photo2}
        alt="pic"
        className="absolute -top-8 rtl:left-0 ltr:right-0 scale-110"
      />
      <GlassButton text={t("heroImage.smartDashboard")} customClass="rtl:left-10 ltr:right-10 -top-3 max-2xl:-top-6 rtl:max-2xl:-left-5 ltr:max-2xl:-right-5 max-md:scale-[70%]" />
      <GlassButton text={t("heroImage.smartMenu")} customClass="rtl:left-[70px] ltr:right-[70px] -bottom-2 max-2xl:-bottom-4 !border-none rtl:max-2xl:-left-10 ltr:max-2xl:right-1 max-md:scale-[70%]" />
      <GlassButton text={t("heroImage.free")} customClass="rtl:right-32 ltr:left-32 top-[72px] !border-2 max-2xl:top-10 max-md:scale-[70%]" />
    </MotionDiv>
  );
};

export default HeroImage;
