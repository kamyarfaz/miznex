"use client";

import dynamic from "next/dynamic";
import { useAdminOverview } from "@/services";
import {
  StatisticsSkeleton,
  UsersMetricsSkeleton,
  OrderMetricsSkeleton,
  RevenueMetricsSkeleton,
  ItemsMetricsSkeleton,
  CommentsMetricsSkeleton,
  LatestCommentsSkeleton,
} from "@/components/skeleton";

const Statistics = dynamic(() =>
  import("./components").then((mod) => mod.Statistics)
);

const UsersMetrics = dynamic(() =>
  import("./components").then((mod) => mod.UsersMetrics)
);

const OrderMetrics = dynamic(() =>
  import("./components").then((mod) => mod.OrderMetrics)
);

const RevenueMetrics = dynamic(() =>
  import("./components").then((mod) => mod.RevenueMetrics)
);

const ItemsMetrics = dynamic(() =>
  import("./components").then((mod) => mod.ItemsMetrics)
);

const CommentsMetrics = dynamic(() =>
  import("./components").then((mod) => mod.CommentsMetrics)
);

const LastestComments = dynamic(() =>
  import("./components").then((mod) => mod.LastestComments)
);

const data = {
  // 👤 User Overview
  user: {
    total: 1250,
    blockedUsers: 32,
    newUsersThisWeek: 58,
    newUsersThisMonth: 210,
    monthlyActiveUsers: 870,
  },

  // 📦 Order Overview
  order: {
    total: 2480,
    active: 135,
    today: 18,
    byStatus: {
      pending: 42,
      processing: 93,
      delivered: 1870,
      refunded: 28,
      done: 390,
      failed: 12,
      canceled: 45,
    },
  },

  // 🛒 Item Overview
  item: {
    total: 430,
    lowStockItems: [
      { id: "item-001", title: "Whey Protein 2kg", quantity: 5 },
      { id: "item-002", title: "Pre-Workout Drink", quantity: 8 },
      { id: "item-003", title: "Resistance Bands Set", quantity: 3 },
    ],
    topSellingItems: [
      { id: "item-010", title: "Workout Gloves", totalSold: 980 },
      { id: "item-011", title: "BCAA Powder", totalSold: 750 },
      { id: "item-012", title: "Shaker Bottle", totalSold: 680 },
    ],
  },

  // 🎟️ Discount Overview
  discount: {
    active: 6,
    expiringInWeek: [
      { code: "FIT10", usage: 125, active: true },
      { code: "SUMMER20", usage: 97, active: true },
    ],
    topUsed: [
      { code: "WELCOME5", usage: 320, active: true },
      { code: "LOYAL15", usage: 270, active: true },
    ],
  },

  // 💰 Revenue Overview
  revenue: {
    total: {
      grossSales: 184000,
      discounts: 15000,
      netRevenue: 169000,
    },
    today: {
      grossSales: 2800,
      discounts: 250,
      netRevenue: 2550,
    },
    thisWeek: {
      grossSales: 17400,
      discounts: 1300,
      netRevenue: 16100,
    },
    thisMonth: {
      grossSales: 74800,
      discounts: 6200,
      netRevenue: 68600,
    },
    averageOrderValue: 68.5,
  },

  // 💬 Message Overview
  message: {
    total: 185,
    unreplied: 23,
  },

  // ⭐ Comment Overview
  comment: {
    total: 540,
    accepted: 490,
    unaccepted: 50,
    latestUnacceptedComments: [
      {
        id: "comment-001",
        text: "The delivery took too long.",
        accept: false,
        star: 2,
        created_at: "2025-10-15T09:30:00Z",
      },
      {
        id: "comment-002",
        text: "Product packaging was damaged.",
        accept: false,
        star: 3,
        created_at: "2025-10-14T18:20:00Z",
      },
      {
        id: "comment-003",
        text: "Did not receive the free gift mentioned.",
        accept: false,
        star: 4,
        created_at: "2025-10-13T11:45:00Z",
      },
    ],
  },

  // 🎫 Ticket Overview
  ticket: {
    total: 92,
    open: 17,
    closed: 61,
    answered: 14,
  },
};

export default function Overview() {
  const { data: mock, isLoading: mockLoading } = useAdminOverview();

  const isLoading = false;
  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 xl:col-span-12">
          {isLoading ? (
            <StatisticsSkeleton cols={5} />
          ) : (
            <Statistics
              data={{
                totalComments: data?.comment?.total,
                acceptedComments: data?.comment?.accepted,
                totalUsers: data?.user?.total,
                newUsersThisMonth: data?.user?.newUsersThisMonth,
                totalOrder: data?.order?.total,
                activeOrder: data?.order?.active,
                grossSales: data?.revenue?.total?.grossSales,
                netRevenue: data?.revenue?.total?.netRevenue,
                totalTickets: data?.ticket?.total,
                openTickets: data?.ticket?.open,
              }}
            />
          )}
        </div>

        <div className="col-span-12 xl:col-span-6">
          {isLoading ? (
            <UsersMetricsSkeleton />
          ) : (
            <UsersMetrics data={data?.user} />
          )}
        </div>

        <div className="col-span-12 xl:col-span-6">
          {isLoading ? (
            <OrderMetricsSkeleton />
          ) : (
            <OrderMetrics data={data?.order} />
          )}
        </div>

        <div className="col-span-12 xl:col-span-6">
          {isLoading ? (
            <RevenueMetricsSkeleton />
          ) : (
            <RevenueMetrics revenue={data?.revenue} />
          )}
        </div>

        <div className="col-span-12 xl:col-span-6">
          {isLoading ? (
            <ItemsMetricsSkeleton />
          ) : (
            <ItemsMetrics data={data?.item} />
          )}
        </div>

        <div className="col-span-12 xl:col-span-6">
          {isLoading ? (
            <CommentsMetricsSkeleton />
          ) : (
            <CommentsMetrics data={data?.comment} />
          )}
        </div>

        <div className="col-span-12 xl:col-span-6">
          {isLoading ? (
            <LatestCommentsSkeleton />
          ) : (
            <LastestComments data={data?.comment} />
          )}
        </div>
      </div>
    </>
  );
}
