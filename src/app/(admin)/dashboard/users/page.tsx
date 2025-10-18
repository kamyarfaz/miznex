"use client";
import { DataTable } from "@/app/(admin)/components/common/DataTable";
import { useMemo, useState } from "react";
import { Users as UsersIcon, UserX, UserPlus, Activity } from "lucide-react";

import { columns } from "./columns";
import {
  useAddUserToBlacklist,
  useChangeUserPermission,
  useGetUserListAdmin,
  useUserOverview,
} from "@/services";
import { StatisticsSkeleton } from "@/components/skeleton";
import { StatisticsCard } from "../../components/common/StatisticsCard";

const users = [
  {
    id: "user-001",
    username: "john_doe",
    first_name: "John",
    last_name: "Doe",
    birthday: "1995-04-12",
    image: "/images/users/john.png",
    phone: "+1-202-555-0147",
    email: "john.doe@example.com",
    role: "user",
    is_email_verified: true,
    status: "active",
    created_at: "2024-09-10T12:00:00Z",
    updated_at: "2025-10-15T08:30:00Z",
    addressList: [
      {
        id: "addr-001",
        province: "California",
        city: "Los Angeles",
        address: "1234 Sunset Blvd, Apt 5B",
        created_at: "2024-09-12T10:20:00Z",
      },
    ],
  },
  {
    id: "user-002",
    username: "emily_carter",
    first_name: "Emily",
    last_name: "Carter",
    birthday: "2000-02-08",
    image: "/images/users/emily.png",
    phone: "+1-404-555-0890",
    email: "emily.carter@example.com",
    role: "user",
    is_email_verified: false,
    status: "pending",
    created_at: "2025-01-05T09:45:00Z",
    updated_at: "2025-10-10T14:22:00Z",
    addressList: [
      {
        id: "addr-002",
        province: "New York",
        city: "Brooklyn",
        address: "88 Bedford Ave, Floor 2",
        created_at: "2025-02-01T11:15:00Z",
      },
      {
        id: "addr-003",
        province: "New York",
        city: "Manhattan",
        address: "250 5th Ave",
        created_at: "2025-03-11T14:00:00Z",
      },
    ],
  },
  {
    id: "user-003",
    username: "mike_rogers",
    first_name: "Mike",
    last_name: "Rogers",
    birthday: "1988-07-22",
    image: "/images/users/mike.png",
    phone: "+1-303-555-1209",
    email: "mike.rogers@example.com",
    role: "admin",
    is_email_verified: true,
    status: "active",
    created_at: "2023-12-20T10:00:00Z",
    updated_at: "2025-09-30T16:45:00Z",
    addressList: [
      {
        id: "addr-004",
        province: "Texas",
        city: "Dallas",
        address: "450 Elm St, Suite 7",
        created_at: "2024-01-03T13:50:00Z",
      },
    ],
  },
  {
    id: "user-004",
    username: "sarah_lee",
    first_name: "Sarah",
    last_name: "Lee",
    birthday: "1998-11-03",
    image: "/images/users/sarah.png",
    phone: "+1-708-555-7700",
    email: "sarah.lee@example.com",
    role: "user",
    is_email_verified: true,
    status: "blocked",
    created_at: "2024-11-10T08:00:00Z",
    updated_at: "2025-07-01T09:00:00Z",
    addressList: [],
  },
  {
    id: "user-005",
    username: "daniel_kim",
    first_name: "Daniel",
    last_name: "Kim",
    birthday: "1992-09-17",
    image: "/images/users/daniel.png",
    phone: "+1-212-555-1234",
    email: "daniel.kim@example.com",
    role: "moderator",
    is_email_verified: true,
    status: "active",
    created_at: "2023-05-18T10:25:00Z",
    updated_at: "2025-09-20T13:45:00Z",
    addressList: [
      {
        id: "addr-005",
        province: "Florida",
        city: "Miami",
        address: "765 Ocean Dr",
        created_at: "2024-03-22T15:10:00Z",
      },
    ],
  },
];

export default function Users() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [searchValue, setSearchValue] = useState("");

  const { data, isLoading: isLoadingOverview } = useUserOverview();

  const {
    users: mocked,
    isLoading: isLoadingUsers,
    total,
  } = useGetUserListAdmin({
    page: currentPage,
    limit: currentLimit,
  });

  const {
    mutate: changePermission,
    isPending: isChangingPermission,
    variables: changePermissionVars,
  } = useChangeUserPermission();

  const {
    mutate: addToBlacklist,
    isPending: isAddingToBlacklist,
    variables: addToBlacklistVars,
  } = useAddUserToBlacklist();

  const headerProps = useMemo(
    () => ({
      title: "لیست کاربران",
      icon: <UsersIcon size={30} />,
      showColumnVisibility: true,
    }),
    []
  );

  return (
    <>
      {isLoadingOverview ? (
        <StatisticsSkeleton cols={5} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-6">
          <StatisticsCard
            title="تعداد کل کاربران"
            icon={UsersIcon}
            value={data?.total || 0}
          />

          <StatisticsCard
            title="کاربران مسدود شده"
            icon={UserX}
            value={data?.blockedUsers || 0}
          />

          <StatisticsCard
            title="کاربران جدید این هفته"
            icon={UserPlus}
            value={data?.newUsersThisWeek || 0}
          />

          <StatisticsCard
            title="کاربران فعال ماهانه"
            icon={Activity}
            value={data?.monthlyActiveUsers || 0}
          />
          <StatisticsCard
            title="کاربران جدید این ماه"
            icon={UserPlus}
            value={data?.newUsersThisMonth || 0}
          />
        </div>
      )}

      <DataTable
        data={users}
        columns={columns({
          currentPage,
          currentLimit,
          changePermission,
          isChangingPermission,
          changePermissionVars,
          addToBlacklist,
          isAddingToBlacklist,
          addToBlacklistVars,
        })}
        isLoading={false}
        headerProps={headerProps}
        emptyStateMessage="هیچ کاربری یافت نشد"
        emptyStateDescription="کاربران جدید در اینجا نمایش داده خواهند شد"
        enablePagination={true}
        page={currentPage}
        limit={currentLimit}
        totalCount={total}
        onPageChange={setCurrentPage}
        onLimitChange={(limit) => {
          setCurrentLimit(limit);
          setCurrentPage(1);
        }}
        pageSizeOptions={[5, 10, 25, 50]}
        enableSearch={true}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      />
    </>
  );
}
