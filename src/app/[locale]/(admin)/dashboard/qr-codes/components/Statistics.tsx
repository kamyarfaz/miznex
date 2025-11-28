import { StatisticsDataProps } from "@/types/admin";
import { StatisticsCard } from "./StatisticsCart";
import {
  QrCode,
  ChartColumn,
  SquareMousePointer,
  Eye
} from "lucide-react";

export const Statistics = ({ data }: StatisticsDataProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatisticsCard
        title="اسکن QR Code"
        icon={QrCode}
        value={data?.grossSales || 0}
        secondaryValue={data?.netRevenue || 0}
        secondaryLabel="نسبت به ماه قبل"
      />

      <StatisticsCard
        title="بازدید اخیر"
        icon={ChartColumn}
        value={data?.totalUsers || 0}
        secondaryValue={data?.newUsersThisMonth || 0}
        secondaryLabel="نسبت به ماه قبل"
      />

      <StatisticsCard
        title="کلیک روی آیتم ها"
        icon={SquareMousePointer}
        value={data?.totalOrder || 0}
        secondaryValue={data?.activeOrder || 0}
        secondaryLabel="نسبت به ماه قبل"
      />

      <StatisticsCard
        title="بازدید منو"
        icon={Eye}
        value={data?.totalComments || 0}
        secondaryValue={data?.acceptedComments || 0}
        secondaryLabel="نسبت به ماه قبل"
      />
    </div>
  );
};
