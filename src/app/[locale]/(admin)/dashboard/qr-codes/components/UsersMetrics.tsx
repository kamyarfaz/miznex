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
          <div className="border border-red-500 w-5/12 h-full">
            <div className="border border-red-500 w-full h-3/12"></div>
            <div className="border border-red-500 w-full h-9/12"></div>
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
