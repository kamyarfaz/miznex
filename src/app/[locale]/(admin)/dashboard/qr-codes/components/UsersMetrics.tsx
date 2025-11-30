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
} from "lucide-react";
import Link from "next/link";
import { Settings2, ChevronDown, PlusSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function UsersMetrics() {
  const QuickAction = [
    { id: "1", title: "ویرایش لینک", icon: Pencil, href: "#" },
    { id: "2", title: "اشتراک گذاری لینک", icon: Redo2, href: "#" },
  ];

  const Tips = [
    { id: "1", title: "همیشه QR Code را در دسترس قرار دهید." },
    { id: "2", title: "کیفیت چاپ QR Code مهم است." },
    { id: "3", title: "لینک کوتاه و قابل فهم انتخاب کنید." },
  ];

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
          <div className="border border-red-500 w-3/12 h-full">
            <div className="border border-red-500 w-full h-4/6"></div>
            <div className="border border-red-500 w-full h-2/6"></div>
          </div>
          <div className="border-none w-5/12 h-full">
            <div className="border-none flex w-full h-3/12 items-center gap-2">
              <Button
                variant="outline"
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 mr-2 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-1 px-4 rounded-lg flex w-24 items-center gap-2"
              >
                <Copy size={16} />
                کپی
              </Button>

              {/* WRAPPER گرادیانی */}
              <div className="p-[1.5px] rounded bg-gradient-to-r w-full ml-3 from-amber-500 to-orange-500 inline-flex">
                {/* خود Input بدون padding و بدون border */}
                <Input
                  id="title"
                  placeholder="https://miznex.com/menu"
                  className="w-full text-left h-8 rounded bg-white dark:bg-gray-900 p-0 px-2 border-none focus:ring-0 focus:outline-none"
                />
              </div>
            </div>

            <div className="border-none w-full h-auto">
              <div className="flex flex-col p-4 space-y-3 text-justify">
                {QrActions.map((act) => (
                  <div id={act.id} className="flex">
                    <CircleCheck
                      size={16}
                      className="text-slate-400 dark:text-slate-400 flex-shrink-0"
                    />
                    <span className="text-xs mr-1 text-slate-500">
                      {act.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="border border-tranparent w-4/12 h-full">
            <Card className="bg-white/90 dark:bg-gray-900 border rounded-xl pb-4 pt-1 pr-2 mb-4 transition-all duration-500 w-full h-auto">
              <CardTitle className="text-sm m-2 font-semibold text-gray-800 dark:text-white">
                عملیات سریع
              </CardTitle>
              <CardContent className="flex flex-col flex-1 justify-start pb-0 space-y-2">
                {QuickAction.map((action) => (
                  <div id={action.id} className="flex">
                    <action.icon
                      size={15}
                      className="text-grey-400 dark:text-grey-400"
                    />
                    <Link
                      href={action.href}
                      className="text-xs mr-2 font-medium"
                    >
                      {action.title}
                    </Link>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="bg-white/90 dark:bg-gray-900 border rounded-xl pb-4 pt-1 pr-2 w-full h-auto">
              <CardTitle className="text-sm m-2 font-semibold text-gray-800 dark:text-white">
                نکات مفید
              </CardTitle>
              <CardContent className="flex flex-col flex-1 justify-start pb-0 space-y-2 cursor-default">
                {Tips.map((tip) => (
                  <div id={tip.id} className="flex">
                    <Lightbulb
                      size={15}
                      className={`text-grey-400 dark:text-grey-400`}
                    />
                    <span className="text-xs mr-2 font-medium">
                      {tip.title}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
