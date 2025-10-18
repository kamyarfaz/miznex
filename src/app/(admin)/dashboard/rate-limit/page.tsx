"use client";

import { DataTable } from "@/app/(admin)/components/common/DataTable";
import { useMemo, useState } from "react";
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldX,
  Activity,
} from "lucide-react";
import {
  useGetRateLimitRecords,
  useGetRateLimitStats,
  useBlockUser,
  useUnblockUser,
  useResetRateLimit,
} from "@/services";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { columns } from "./columns";
import { RateLimitRecordsParams } from "@/types/admin";
import { StatisticsSkeleton } from "@/components/skeleton";
import { StatisticsCard } from "../../components/common/StatisticsCard";

const rateLimitRecords = {
  data: {
    records: [
      {
        id: "rate-001",
        identifier: "192.168.1.10",
        endpoint: "/api/auth/login",
        violation_count: 3,
        window_start_at: "2025-10-18T09:00:00Z",
        requests_in_window: 65,
        block_status: "temporary",
        block_expires_at: "2025-10-18T09:15:00Z",
        violation_count_reset_at: "2025-10-18T12:00:00Z",
        created_at: "2025-10-18T09:00:00Z",
        updated_at: "2025-10-18T09:05:00Z",
      },
      {
        id: "rate-002",
        identifier: "user_12345",
        endpoint: "/api/orders",
        violation_count: 0,
        window_start_at: "2025-10-18T08:00:00Z",
        requests_in_window: 48,
        block_status: "none",
        block_expires_at: null,
        violation_count_reset_at: "2025-10-18T12:00:00Z",
        created_at: "2025-10-18T08:00:00Z",
        updated_at: "2025-10-18T08:45:00Z",
      },
      {
        id: "rate-003",
        identifier: "admin_panel",
        endpoint: "/api/admin/users",
        violation_count: 7,
        window_start_at: "2025-10-17T22:00:00Z",
        requests_in_window: 220,
        block_status: "permanent",
        block_expires_at: null,
        violation_count_reset_at: null,
        created_at: "2025-10-17T22:00:00Z",
        updated_at: "2025-10-18T07:30:00Z",
      },
      {
        id: "rate-004",
        identifier: "10.0.0.22",
        endpoint: "/api/products",
        violation_count: 1,
        window_start_at: "2025-10-18T06:30:00Z",
        requests_in_window: 102,
        block_status: "none",
        block_expires_at: null,
        violation_count_reset_at: "2025-10-18T12:30:00Z",
        created_at: "2025-10-18T06:30:00Z",
        updated_at: "2025-10-18T07:00:00Z",
      },
      {
        id: "rate-005",
        identifier: "user_98765",
        endpoint: "/api/cart/update",
        violation_count: 2,
        window_start_at: "2025-10-18T09:10:00Z",
        requests_in_window: 80,
        block_status: "temporary",
        block_expires_at: "2025-10-18T09:25:00Z",
        violation_count_reset_at: "2025-10-18T12:10:00Z",
        created_at: "2025-10-18T09:10:00Z",
        updated_at: "2025-10-18T09:12:00Z",
      },
    ],
  },
};

export default function RateLimit() {
  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState<RateLimitRecordsParams>({
    page: 1,
    limit: 10,
    identifier: searchValue,
  });

  const handleFilterChange = (
    key: keyof RateLimitRecordsParams,
    value?: string | number
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
      ...(key !== "page" ? { page: 1 } : {}),
    }));
  };

  // Rate limit hooks
  const { data: stats, isLoading: isLoadingStats } = useGetRateLimitStats();
  const { data: mockRateLimitRecords, isLoading: isLoadingRateLimitRecords } =
    useGetRateLimitRecords({ ...filters, identifier: searchValue });

  // Mutation hooks
  const blockUser = useBlockUser();
  const unblockUser = useUnblockUser();
  const resetRateLimit = useResetRateLimit();

  const headerProps = useMemo(
    () => ({
      title: "مدیریت محدودیت ها",
      icon: <Shield size={30} />,
      actions: (
        <div className="flex flex-col md:flex-row mt-2 md:mt-0 items-center gap-4">
          <div className="flex items-center gap-2">
            <Select
              value={filters.blockStatus}
              onValueChange={(value) =>
                handleFilterChange("blockStatus", value)
              }
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="فیلتر وضعیت بلاک" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">عادی</SelectItem>
                <SelectItem value="temporary">موقت</SelectItem>
                <SelectItem value="permanent">دائمی</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ),
      showColumnVisibility: true,
    }),
    [filters, handleFilterChange]
  );

  const pageSizeOptions = useMemo(() => [5, 10, 25, 50], []);

  return (
    <>
      {/* {isLoadingStats ? (
        <StatisticsSkeleton cols={4} rows={4} />
      ) : ( */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          <StatisticsCard
            title="تعداد کل رکوردها"
            icon={Activity}
            value={stats?.data.total_records || 0}
          />

          <StatisticsCard
            title="بلاک شده موقت"
            icon={ShieldAlert}
            value={stats?.data.temporarily_blocked || 0}
          />

          <StatisticsCard
            title="بلاک شده دائمی"
            icon={ShieldX}
            value={stats?.data.permanently_blocked || 0}
          />

          <StatisticsCard
            title="کل بلاک شده‌ها"
            icon={ShieldCheck}
            value={stats?.data.active_blocked || 0}
          />
        </div>
      {/* )} */}

      <DataTable
        data={rateLimitRecords?.data.records || []}
        columns={columns({
          currentPage: filters.page || 1,
          currentLimit: filters.limit || 10,
          records: rateLimitRecords?.data.records || [],
          // Block User
          blockUser: blockUser.mutate,
          isBlocking: blockUser.isPending,
          blockingVars: blockUser.variables,
          // Unblock User
          unblockUser: unblockUser.mutate,
          isUnblocking: unblockUser.isPending,
          unblockingVars: unblockUser.variables,
          // Reset Rate Limit
          resetRateLimit: resetRateLimit.mutate,
          isResetting: resetRateLimit.isPending,
          resettingVars: resetRateLimit.variables,
        })}
        isLoading={false}
        totalCount={rateLimitRecords?.data.total || 0}
        headerProps={headerProps}
        emptyStateMessage="هیچ رکورد محدودیت یافت نشد"
        emptyStateDescription="رکوردهای محدودیت درخواست در اینجا نمایش داده خواهند شد"
        enablePagination={true}
        page={filters.page}
        limit={filters.limit}
        onPageChange={(page) => handleFilterChange("page", page)}
        onLimitChange={(limit) => {
          handleFilterChange("limit", limit);
          handleFilterChange("page", 1);
        }}
        pageSizeOptions={pageSizeOptions}
        enableSearch={true}
        searchPlaceholder="جستجو بر اساس شناسه"
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      />
    </>
  );
}
