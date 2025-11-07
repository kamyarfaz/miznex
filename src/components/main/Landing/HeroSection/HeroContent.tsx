"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Coffee,
  Utensils,
  Clock,
  MapPin,
  Phone,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  MotionDiv,
  MotionH1,
  MotionP,
  MotionSpan,
} from "@/utils/MotionWrapper";
import VideoButton from "./VideoButton";
import { useTranslations } from "next-intl";

const HeroContent = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const t = useTranslations("heroSection");

  const features = [
    {
      icon: Coffee,
      text: "قهوه تازه",
      color: "text-amber-600 dark:text-amber-400",
    },
    {
      icon: Utensils,
      text: "غذای خانگی",
      color: "text-orange-600 dark:text-orange-300",
    },
    {
      icon: Clock,
      text: "۲۴/۷ باز",
      color: "text-red-600 dark:text-red-400",
    },
  ];

  const contactInfo = [
    {
      icon: MapPin,
      text: "تهران، خیابان ولیعصر",
      color: "text-amber-600 dark:text-amber-400",
    },
    {
      icon: Phone,
      text: "۰۲۱-۱۲۳۴۵۶۷۸",
      color: "text-orange-600 dark:text-orange-300",
    },
  ];

  return (
    <div className="text-center lg:text-right space-y-8">
      <MotionDiv
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative rounded-full w-max">
          <div className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-[#E2E2E2] to-white p-[1px]"></div>
          <div className="relative bg-[#F2F2F2] rounded-full pl-2.5 flex items-center gap-2">
            <span className="py-1 px-2.5 bg-gradient-to-l from-[#FF5B35] to-[#FF7B5C] text-white rounded-full">
              {t("heroContent.miznex")}
            </span>
            <span className="text-[16px]">{t("heroContent.theFirstFreeMenuMaker")}</span>
          </div>
        </div>
        <MotionH1
          className="text-2xl lg:text-3xl xl:text-[40px] font-semibold text-[#3B3B3B]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <MotionSpan
            data-testid="hero-title"
            className="relative z-10"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            {t("heroContent.createAnOnlineAndFreeMenu")}
          </MotionSpan>
          <br className="my-5" />
          <MotionSpan
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {t("heroContent.yourRestaurantCafeInNoTime")}
          </MotionSpan>
        </MotionH1>

        <MotionP
          data-testid="hero-description"
          className="text-xs lg:text-sm xl:text-[16px] font-normal text-bodyNormal max-w-2xl mx-auto lg:mx-0 leading-relaxed flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <span>{t("heroContent.aSmartAndFreeAlternative")}</span>

          <span>
            {t("heroContent.digitalMenuWithIntegrated")}
          </span>
        </MotionP>
      </MotionDiv>

      <MotionDiv
        className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.3 }}
      >
        <MotionDiv className="flex items-center gap-4 text-[15px] [&>div]:rounded-full [&>div]:cursor-pointer [&>div]:py-2 [&>div]:px-[29px]">
          <div className="text-white bg-[#404040] font-medium">{t("heroContent.downloadApp")}</div>
          <div className="text-bodyDark font-normal border border-bodyNormal">
            {t("heroContent.support")}
          </div>
        </MotionDiv>
      </MotionDiv>
    </div>
  );
};

export default HeroContent;
