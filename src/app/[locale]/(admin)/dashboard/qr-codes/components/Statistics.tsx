import { StatisticsDataProps } from "@/types/admin";
import { StatisticsCard } from "./StatisticsCart";
import { QrCode, ChartColumn, SquareMousePointer, Eye } from "lucide-react";
import { useTranslations } from "next-intl";

export const Statistics = ({ data }: StatisticsDataProps) => {
  const t = useTranslations("adminPanel");

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatisticsCard
        title={t("dashboard.Qrcodes.Statistics.qr_scan")}
        icon={QrCode}
        value={data?.grossSales || 0}
        secondaryValue={data?.netRevenue || 0}
        secondaryLabel={t(
          "dashboard.Qrcodes.Statistics.compared_to_last_month"
        )}
      />

      <StatisticsCard
        title={t("dashboard.Qrcodes.Statistics.recent_visits")}
        icon={ChartColumn}
        value={data?.totalUsers || 0}
        secondaryValue={data?.newUsersThisMonth || 0}
        secondaryLabel={t(
          "dashboard.Qrcodes.Statistics.compared_to_last_month"
        )}
      />

      <StatisticsCard
        title={t("dashboard.Qrcodes.Statistics.item_clicks")}
        icon={SquareMousePointer}
        value={data?.totalOrder || 0}
        secondaryValue={data?.activeOrder || 0}
        secondaryLabel={t(
          "dashboard.Qrcodes.Statistics.compared_to_last_month"
        )}
      />

      <StatisticsCard
        title={t("dashboard.Qrcodes.Statistics.menu_views")}
        icon={Eye}
        value={data?.totalComments || 0}
        secondaryValue={data?.acceptedComments || 0}
        secondaryLabel={t(
          "dashboard.Qrcodes.Statistics.compared_to_last_month"
        )}
      />
    </div>
  );
};
