"use client";

import Image from "next/image";
import { MotionDiv } from "@/utils/MotionWrapper";
import Photo from "./../../../../assets/HeroSection/HeroSection.png";
import Photo2 from "./../../../../assets/HeroSection/HeroImgBack.png";
import GlassButton from "@/components/ui/GlassButton";

const HeroImage = () => {
  return (
    <MotionDiv
      className="relative mb-4 max-w-[696px]"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <Image
        width={390}
        src={Photo}
        alt="pic"
        className="relative z-10 right-40 h-[56%] w-[56%]"
      />
      <Image
        width={700}
        src={Photo2}
        alt="pic"
        className="absolute -top-8 left-0 scale-110"
      />
      <GlassButton text="داشبورد هوشمند" customClass="left-10 -top-3 max-2xl:-left-5" />
      <GlassButton text="منوی هوشمند" customClass="left-[70px] -bottom-2 !border-none max-2xl:left-1" />
      <GlassButton text="رایگان" customClass="right-32 top-[72px] !border-2 max-2xl:top-12" />
    </MotionDiv>
  );
};

export default HeroImage;
