"use client";
import { DataTable } from "@/app/[locale]/(admin)/components/common/DataTable";
import { useMemo, useState } from "react";
import { User } from "lucide-react";
import { columns } from "./columns";
import { useGetBlacklist, useRemoveUserFromBlacklist } from "@/services";

const blacklist = [
  {
    id: "user-201",
    username: "spam_account_99",
    first_name: null,
    last_name: null,
    birthday: null,
    image: null,
    imageUrl: null,
    phone: "+1-202-555-0187",
    email: "spam99@example.com",
    role: "user",
    new_email: null,
    new_phone: null,
    is_email_verified: false,
    status: "block",
    rt_hash: "hash-abc123",
    created_at: "2025-05-21T09:30:00Z",
    updated_at: "2025-10-01T10:15:00Z",
  },
  {
    id: "user-202",
    username: "fake_refund_request",
    first_name: "Rick",
    last_name: "Turner",
    birthday: "1990-03-10",
    image: "",
    imageUrl: "",
    phone: "+44-7700-900123",
    email: "rick.turner@example.com",
    role: "user",
    new_email: null,
    new_phone: null,
    is_email_verified: true,
    status: "block",
    rt_hash: "hash-def456",
    created_at: "2024-12-02T15:40:00Z",
    updated_at: "2025-10-10T09:00:00Z",
  },
  {
    id: "user-203",
    username: "abuse_admin_access",
    first_name: "Sophie",
    last_name: "Lane",
    birthday: "1985-09-20",
    image: "",
    imageUrl: "",
    phone: "+33-612-555-987",
    email: "sophie.lane@example.com",
    role: "admin",
    new_email: null,
    new_phone: null,
    is_email_verified: true,
    status: "block",
    rt_hash: "hash-ghi789",
    created_at: "2025-02-18T11:20:00Z",
    updated_at: "2025-10-11T11:45:00Z",
  },
];

export default function Blacklist() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [searchValue, setSearchValue] = useState("");

  const { 
    // mockBlacklist, 
    // isLoading,
     total } = useGetBlacklist({
    page: currentPage,
    limit: currentLimit,
  });

  const {
    mutate: removeFromBlacklist,
    isPending: isRemoving,
    variables: removingVars,
  } = useRemoveUserFromBlacklist();
  const headerProps = useMemo(
    () => ({
      title: "لیست سیاه",
      icon: <User size={30} />,
      showColumnVisibility: true,
    }),
    []
  );

  return (
    <DataTable
      data={blacklist}
      columns={columns({
        currentPage,
        currentLimit,
        removeFromBlacklist,
        isRemoving,
        removingVars,
      })}
      isLoading={false}
      headerProps={headerProps}
      emptyStateMessage="هیچ کاربری در لیست سیاه یافت نشد"
      emptyStateDescription="کاربران مسدود شده در اینجا نمایش داده خواهند شد"
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
  );
}
