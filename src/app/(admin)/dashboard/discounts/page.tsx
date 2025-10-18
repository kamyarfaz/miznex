"use client";

import { DataTable } from "@/app/(admin)/components/common/DataTable";
import { useState, useMemo } from "react";
import { ClipboardPlus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import dynamic from "next/dynamic";
import { columns } from "./columns";
import {
  useDeleteDiscount,
  useGetDiscounts,
  useUpdateDiscountStatus,
} from "@/services";

const CreateDiscountModal = dynamic(() => import("./create-discount"), {
  ssr: false,
});

const discounts = [
  {
    id: "disc-001",
    code: "SUMMER25",
    percent: 25,
    amount: null,
    expires_in: "2025-12-31T23:59:59Z",
    limit: 100,
    usage: 45,
    active: true,
  },
  {
    id: "disc-002",
    code: "WELCOME10",
    percent: 10,
    amount: null,
    expires_in: "2026-01-15T23:59:59Z",
    limit: 500,
    usage: 320,
    active: true,
  },
  {
    id: "disc-003",
    code: "FIXED5USD",
    percent: null,
    amount: 5,
    expires_in: "2025-11-30T23:59:59Z",
    limit: 50,
    usage: 47,
    active: true,
  },
  {
    id: "disc-004",
    code: "BLACKFRIDAY50",
    percent: 50,
    amount: null,
    expires_in: "2025-11-29T23:59:59Z",
    limit: 1000,
    usage: 999,
    active: false,
  },
  {
    id: "disc-005",
    code: "LOYAL20",
    percent: 20,
    amount: null,
    expires_in: "2026-03-01T23:59:59Z",
    limit: 200,
    usage: 0,
    active: true,
  },
];

export default function Discounts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [isActiveFilter, setIsActiveFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("newest");

  const {
    discounts: mocked,
    isLoading,
    total,
  } = useGetDiscounts({
    page: currentPage,
    limit: currentLimit,
    isActive: isActiveFilter === "" ? undefined : isActiveFilter === "true",
    sortBy: sortBy || undefined,
  });

  const {
    mutate: deleteDiscount,
    isPending: isPendingDiscount,
    variables: deletingVars,
  } = useDeleteDiscount();

  const {
    mutate: updateStatusDiscount,
    isPending: isPendingStatusUpdate,
    variables: updatingVars,
  } = useUpdateDiscountStatus();

  const handleIsActiveFilterChange = (newIsActive: string) => {
    setIsActiveFilter(newIsActive);
    setCurrentPage(1);
  };

  const handleSortByChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  };

  const headerProps = useMemo(
    () => ({
      title: "لیست کد های تخفیف",
      icon: <ClipboardPlus size={30} />,
      showColumnVisibility: true,
      actions: (
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-2">
            <Select value={sortBy} onValueChange={handleSortByChange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="مرتب‌سازی" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">جدیدترین</SelectItem>
                <SelectItem value="oldest">قدیمی‌ترین</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={isActiveFilter}
              onValueChange={handleIsActiveFilterChange}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="وضعیت فعال" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">فعال</SelectItem>
                <SelectItem value="false">غیرفعال</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <CreateDiscountModal />
        </div>
      ),
    }),
    [sortBy, handleSortByChange, isActiveFilter, handleIsActiveFilterChange]
  );

  return (
    <DataTable
      data={discounts}
      columns={columns({
        currentPage,
        currentLimit,
        deleteDiscount,
        isPendingDiscount,
        deletingVars,
        updateStatusDiscount,
        isPendingStatusUpdate,
        updatingVars,
      })}
      isLoading={false}
      headerProps={headerProps}
      emptyStateMessage="هیچ کد تخفیفی یافت نشد"
      emptyStateDescription="برای افزودن کد تخفیف، روی دکمه افزودن کلیک کنید"
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
