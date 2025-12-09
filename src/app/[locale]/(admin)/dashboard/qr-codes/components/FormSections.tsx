"use client";

import * as React from "react";

import {
  Trash2,
  Plus,
  Upload,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MotionDiv } from "@/utils/MotionWrapper";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";

export function FormSections() {
  const t = useTranslations("adminPanel");

  return (
    <Card className="flex flex-col bg-white/90 dark:bg-gray-900 border transition-all duration-500 h-full">
      <CardHeader className="flex-row items-start space-y-2 pb-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="space-y-1">
              <CardTitle className="text-medium font-semibold text-gray-800 dark:text-white">
                {t("dashboard.Qrcodes.FormSections.title")}
              </CardTitle>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="title" className="rtl:text-right ltr:text-left block font-medium">
                {t("dashboard.Qrcodes.FormSections.cafe_name_label")}
              </Label>
              <Input
                id="title"
                // {...register("title")}
                placeholder={t("dashboard.Qrcodes.FormSections.cafe_name")}
                className="rtl:text-right ltr:text-left h-11 border-2 focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="space-y-3 w-full">
              <Label
                htmlFor="category"
                className="rtl:text-right ltr:text-left block font-medium"
              >
                {t("dashboard.Qrcodes.FormSections.cafe_slogan_label")}
              </Label>
              <Input
                id="title"
                // {...register("title")}
                placeholder={t("dashboard.Qrcodes.FormSections.cafe_slogan")}
                className="rtl:text-right ltr:text-left h-11 border-2 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
          <div className="space-y-3">
            <Label
              htmlFor="description"
              className="rtl:text-right ltr:text-left block font-medium"
            >
              {t("dashboard.Qrcodes.FormSections.short_description_label")}
            </Label>
            <Textarea
              id="description"
              // {...register("description")}
              placeholder={t(
                "dashboard.Qrcodes.FormSections.short_description"
              )}
              className="rtl:text-right ltr:text-left min-h-[80px] border-2 focus:border-blue-500 transition-colors resize-none"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="title" className="rtl:text-right ltr:text-left block font-medium">
                {t("dashboard.Qrcodes.FormSections.working_hours_label")}
              </Label>
              <Input
                id="title"
                // {...register("title")}
                placeholder="8:00-23:00"
                className="rtl:text-right ltr:text-left h-11 border-2 focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="space-y-3 w-full">
              <Label
                htmlFor="category"
                className="rtl:text-right ltr:text-left block font-medium"
              >
                {t("dashboard.Qrcodes.FormSections.phone_number_label")}
              </Label>
              <Input
                id="title"
                // {...register("title")}
                placeholder="09123456789"
                className="rtl:text-right ltr:text-left h-11 border-2 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
          <div className="space-y-3">
            <Label
              htmlFor="landing-image"
              className="rtl:text-right ltr:text-left block font-medium"
            >
              {t("dashboard.Qrcodes.FormSections.cafe_logo_label")}
            </Label>
            <div
              id="landing-image"
              className="relative group border-2 border-dashed rounded-lg transition-all duration-300 border-gray-300 dark:border-gray-600 hover:border-blue-500"
            >
              <div className="flex flex-col items-center justify-center h-32 p-4 text-center">
                <Upload size={24} className="text-slate-500 mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t("dashboard.Qrcodes.FormSections.image_limit_note")}
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <Label
              htmlFor="landing-image"
              className="rtl:text-right ltr:text-left block font-medium"
            >
              {t("dashboard.Qrcodes.FormSections.main_image_label")}
            </Label>
            <div
              id="landing-image"
              className="relative group border-2 border-dashed rounded-lg transition-all duration-300 border-gray-300 dark:border-gray-600 hover:border-blue-500"
            >
              <div className="flex flex-col items-center justify-center h-32 p-4 text-center">
                <Upload size={24} className="text-slate-500 mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t("dashboard.Qrcodes.FormSections.image_limit_note")}
                </p>
              </div>
            </div>
          </div>
          <Button
            type="submit"
            disabled={false}
            className="py-2 px-6 text-base bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {t("dashboard.Qrcodes.FormSections.save_changes")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
