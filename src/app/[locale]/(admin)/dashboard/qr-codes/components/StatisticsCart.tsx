"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { formatCurrency } from "@/utils/formatters";

interface StatisticsCardProps {
  title: string;
  icon: LucideIcon;
  value: string | number;
  valueLabel?: string;
  secondaryValue?: string | number;
  secondaryLabel?: string;
  className?: string;
  iconClassName?: string;
  valueClassName?: string;
  secondaryValueClassName?: string;
}

export const StatisticsCard = ({
  title,
  icon: Icon,
  value,
  valueLabel,
  secondaryValue,
  secondaryLabel,
  className = "",
  iconClassName = "",
  valueClassName = "",
  secondaryValueClassName = "",
}: StatisticsCardProps) => {
  const formatValue = (val: string | number) => {
    if (typeof val === "number") {
      return formatCurrency(val);
    }
    return val;
  };

  const formatPercent = (val: string | number) => {
    if (typeof val === "number") {
      const sign = val > 0 ? "+" : "";
      return (
        <span dir="ltr" style={{ display: "inline-block" }}>
          {sign} {formatCurrency(val)}
        </span>
      );
    }
    return val;
  };

  return (
    <Card
      className={`bg-white/90 dark:bg-gray-900 border transition-all duration-500 h-[140px] ${className}`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <Icon
          size={26}
          className={`text-grey-400 dark:text-grey-400 ${iconClassName}`}
        />
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <div className="flex justify-between">
            <CardTitle className="text-sm font-bold text-gray-700 dark:text-gray-300">
              {title}
            </CardTitle>
            <p className={`text-medium font-bold space-x-1 ${valueClassName}`}>
              <span>{formatValue(value)}</span>
            </p>
          </div>

          {secondaryValue && secondaryLabel && (
            <p
              className={`text-muted-foreground text-xs flex justify-between ${secondaryValueClassName}`}
            >
              <span>{secondaryLabel}</span>
              <span
                className={
                  Number(secondaryValue) > 0 ? "text-green-500" : "text-red-500"
                }
              >
                {formatPercent(secondaryValue)}
              </span>
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
