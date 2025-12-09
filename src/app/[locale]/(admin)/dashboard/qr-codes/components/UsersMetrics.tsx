"use client";

import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Copy,
  Pencil,
  Redo2,
  CircleCheck,
  Lightbulb,
  Printer,
  Download,
  ToiletIcon,
  Settings2,
  ChevronDown,
  PlusSquare,
  Share2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function UsersMetrics() {
  const QrActions = [
    {
      id: "1",
      title:
        "کد QR را روی میزها، تابلوها یا کارت‌های مخصوص قرار دهید تا مشتریان بتوانند به آسانی با گوشی همراه خود آن را اسکن کنند.",
    },
    {
      id: "2",
      title:
        "مشتریان دوربین موبایل خود را باز کرده و QR code را اسکن می‌کنند که به صورت خودکار به منوی دیجیتال هدایت خواهند شد.",
    },
    {
      id: "3",
      title:
        "هر زمان نیاز بود، منوی خود را در اپلیکیشن به‌روزرسانی کنید و تغییرات به شکل آنی در منوی دیجیتال و QR code اعمال خواهد شد.",
    },
    {
      id: "4",
      title:
        "این لینک برای اشتراک گذاری منوی کافه شما در شبکه‌های اجتماعی استفاده می‌شود.",
    },
    {
      id: "5",
      title:
        "گزارش اسکن و بازدید منو را در این بخش ببینید تا بفهمید کدام منو یا شعبه بیشتر استفاده می‌شود.",
    },
  ];

  return (
    <Card className="flex flex-col bg-white/90 dark:bg-gray-900 border transition-all duration-500 h-full sm:h-[450px]">
      <CardHeader className="flex-row items-start space-y-2 pb-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="space-y-1">
              <CardTitle className="text-medium font-semibold text-gray-800 dark:text-white">
                QR Code اختصاصی شما
              </CardTitle>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0 ">
        <div className="border-none flex w-full h-[350px]">
          <div className="border-none w-3/12 h-full">
            <div className="border-none w-full h-4/6 bg-gray-200 dark:bg-gray-800 rounded-lg">
              {/* QR Code Image Placeholder */}
            </div>
            <div className="border-none flex flex-col justify-center items-center w-full h-2/6">
              <Button
                variant="outline"
                className="border text-slate-500 bg-white/90 dark:bg-gray-900 w-full py-1 px-4 transition-all duration-300 rounded-lg flex  items-center"
              >
                <Printer size={18} className="text-slate-500" />
                چاپ کد
              </Button>
              <Button
                variant="outline"
                className="border text-slate-500 bg-white/90 dark:bg-gray-900 w-full mt-2 py-1 px-4 transition-all duration-300 rounded-lg flex  items-center"
              >
                <Share2 size={18} className="text-slate-500" />
                اشتراک گذاری
              </Button>
            </div>
          </div>
          <div className="border-none w-9/12 h-full">
            <div className="border-none flex w-full h-3/12 items-center gap-2">
              <Input
                id="title"
                placeholder="https://miznex.com/menu"
                className="w-full h-9 rounded-lg bg-white text-left px-2 rtl:mr-6 ltr:ml-6 w-6/12 border border-orange-500 focus:outline-none focus:ring-0 text-sm"
              />

              <Button
                variant="outline"
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 ml-2 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-1 rounded-lg flex w-20 items-center gap-2"
              >
                <Copy size={16} />
                کپی
              </Button>
            </div>

            <div className="border-none w-full h-auto">
              <div className="flex flex-col p-4 rtl:mr-2 ltr:ml-2 space-y-5 text-justify">
                {QrActions.map((act) => (
                  <div key={act.id} className="flex">
                    <CircleCheck
                      size={16}
                      className="text-slate-400 dark:text-slate-400 flex-shrink-0"
                    />
                    <span className="text-xs rtl:mr-1 ltr:ml-1 text-slate-500">
                      {act.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
