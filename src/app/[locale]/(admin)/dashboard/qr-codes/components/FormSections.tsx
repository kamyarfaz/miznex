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

export function FormSections() {
  return (
    <Card className="flex flex-col bg-white/90 dark:bg-gray-900 border transition-all duration-500 h-full">
      <CardHeader className="flex-row items-start space-y-2 pb-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="space-y-1">
              <CardTitle className="text-medium font-semibold text-gray-800 dark:text-white">
                اطلاعات صفحه لندینگ
              </CardTitle>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="title" className="text-right block font-medium">
                نام کافه
              </Label>
              <Input
                id="title"
                // {...register("title")}
                placeholder="کافه جواد"
                className="text-right h-11 border-2 focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="space-y-3 w-full">
              <Label
                htmlFor="category"
                className="text-right block font-medium"
              >
                شعار کافه
              </Label>
              <Input
                id="title"
                // {...register("title")}
                placeholder="بهترین قهوه شهر"
                className="text-right h-11 border-2 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
          <div className="space-y-3">
            <Label
              htmlFor="description"
              className="text-right block font-medium"
            >
              توضیح کوتاه
            </Label>
            <Textarea
              id="description"
              // {...register("description")}
              placeholder="کافه جواد با بیش از 10 سال تجربه، بهترین قهوه‌های تازه و محیطی دنج و آرام برای شما فراهم کرده است."
              className="text-right min-h-[80px] border-2 focus:border-blue-500 transition-colors resize-none"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="title" className="text-right block font-medium">
                ساعت کاری
              </Label>
              <Input
                id="title"
                // {...register("title")}
                placeholder="8:00-23:00"
                className="text-right h-11 border-2 focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="space-y-3 w-full">
              <Label
                htmlFor="category"
                className="text-right block font-medium"
              >
                شماره تماس
              </Label>
              <Input
                id="title"
                // {...register("title")}
                placeholder="****0911278"
                className="text-right h-11 border-2 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
          <div className="space-y-3">
            <Label
              htmlFor="landing-image"
              className="text-right block font-medium"
            >
              لوگو کافه
            </Label>
            <div
              id="landing-image"
              className="relative group border-2 border-dashed rounded-lg transition-all duration-300 border-gray-300 dark:border-gray-600 hover:border-blue-500"
            >
              <div className="flex flex-col items-center justify-center h-32 p-4 text-center">
                <Upload size={24} className="text-slate-500 mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  نهایت حجم 2 مگابایت در فرمت PNG
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <Label
              htmlFor="landing-image"
              className="text-right block font-medium"
            >
              تصویر اصلی کافه
            </Label>
            <div
              id="landing-image"
              className="relative group border-2 border-dashed rounded-lg transition-all duration-300 border-gray-300 dark:border-gray-600 hover:border-blue-500"
            >
              <div className="flex flex-col items-center justify-center h-32 p-4 text-center">
                <Upload size={24} className="text-slate-500 mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  نهایت حجم 2 مگابایت در فرمت PNG
                </p>
              </div>
            </div>
          </div>
          <Button
            type="submit"
            disabled={false}
            className="py-2 px-6 text-base bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-xl transition-all duration-300"
          >
           ذخیره تغییرات
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
