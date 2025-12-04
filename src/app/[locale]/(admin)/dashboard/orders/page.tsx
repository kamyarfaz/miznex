"use client";

import { DataTable } from "@/app/[locale]/(admin)/components/common/DataTable";
import { useMemo, useState } from "react";
import {
  CheckCircle2,
  Ban,
  Package,
  XCircle,
  Clock,
  RefreshCcw,
  Truck,
  RotateCcw,
} from "lucide-react";
import {
  useGetOrdersAdmin,
  useChangeOrderStatus,
  useOrderOverview,
} from "@/services";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { columns } from "./columns";
import { OrderAdmin } from "@/types/admin";
import { StatisticsSkeleton } from "@/components/skeleton";
import { StatisticsCard } from "../../components/common/StatisticsCard";
const data = {
  total: 248,
  active: 37,
  today: 12,
  byStatus: {
    pending: 10,
    processing: 27,
    delivered: 120,
    refunded: 5,
    done: 70,
    failed: 3,
    canceled: 13,
  },
};
const orders: OrderAdmin[] = [
  {
    id: "order-001",
    payment_amount: 180,
    discount_amount: 20,
    total_amount: 200,
    status: "processing",
    description: "Order for premium gym supplements",
    user: {
      id: "user-001",
      username: "john_doe",
      first_name: "John",
      last_name: "Doe",
      birthday: "1999-04-12",
      image: null,
      imageUrl: null,
      phone: "+1-202-555-0147",
      email: "john.doe@example.com",
      role: "user",
      new_email: null,
      new_phone: null,
      is_email_verified: true,
      status: "active",
      rt_hash: "hash123",
      created_at: "2024-01-15T10:00:00Z",
      updated_at: "2025-09-10T14:00:00Z",
    },
    address: {
      id: "address-001",
      province: "California",
      city: "Los Angeles",
      address: "123 Sunset Blvd, Los Angeles, CA",
      created_at: "2024-01-10T12:00:00Z",
    },
    items: [
      {
        id: "orderitem-001",
        count: 2,
        item: {
          id: "item-001",
          title: "Whey Protein 2kg",
          ingredients: ["Whey Isolate", "BCAA", "Glutamine"],
          description: "High-quality protein powder for muscle growth.",
          price: 100,
          discount: 10,
          quantity: 100,
          rate: 4.8,
          rate_count: 320,
          show: true,
          images: [{ imageUrl: "/images/products/whey.png" }],
          createdAt: "2024-01-01T09:00:00Z",
        },
      },
    ],
    payments: [
      {
        id: "payment-001",
        status: true,
        amount: 180,
        invoice_number: "INV-1001",
        authority: "AUTH-XYZ123",
        card_pan: "6037-****-****-1234",
        card_hash: "hash12345",
        ref_id: 987654,
        created_at: "2025-10-15T08:00:00Z",
        updated_at: "2025-10-15T08:10:00Z",
      },
    ],
  },
  {
    id: "order-002",
    payment_amount: 75,
    discount_amount: 5,
    total_amount: 80,
    status: "delivered",
    description: "Order for fitness accessories",
    user: {
      id: "user-002",
      username: "emily_carter",
      first_name: "Emily",
      last_name: "Carter",
      birthday: "2001-06-25",
      image: null,
      imageUrl: null,
      phone: "+44-7700-900987",
      email: "emily.carter@example.com",
      role: "user",
      new_email: null,
      new_phone: null,
      is_email_verified: true,
      status: "active",
      rt_hash: "hash456",
      created_at: "2024-03-05T15:00:00Z",
      updated_at: "2025-09-25T10:00:00Z",
    },
    address: {
      id: "address-002",
      province: "England",
      city: "London",
      address: "45 Oxford Street, London",
      created_at: "2024-03-04T11:30:00Z",
    },
    items: [
      {
        id: "orderitem-002",
        count: 1,
        item: {
          id: "item-002",
          title: "Workout Gloves",
          ingredients: ["Leather", "Elastic Fabric"],
          description: "Comfortable gloves for better grip during workouts.",
          price: 40,
          discount: 5,
          quantity: 200,
          rate: 4.6,
          rate_count: 150,
          show: true,
          images: [{ imageUrl: "/images/products/gloves.png" }],
          createdAt: "2024-03-01T09:00:00Z",
        },
      },
      {
        id: "orderitem-003",
        count: 1,
        item: {
          id: "item-003",
          title: "Resistance Bands Set",
          ingredients: ["Natural Latex"],
          description: "Set of 5 color-coded resistance bands for training.",
          price: 40,
          discount: 0,
          quantity: 50,
          rate: 4.9,
          rate_count: 210,
          show: true,
          images: [{ imageUrl: "/images/products/bands.png" }],
          createdAt: "2024-02-20T09:00:00Z",
        },
      },
    ],
    payments: [
      {
        id: "payment-002",
        status: true,
        amount: 75,
        invoice_number: "INV-1002",
        authority: "AUTH-ABC789",
        card_pan: "6274-****-****-9876",
        card_hash: "hash67890",
        ref_id: 654321,
        created_at: "2025-10-10T10:00:00Z",
        updated_at: "2025-10-10T10:10:00Z",
      },
    ],
  },
  {
    id: "order-003",
    payment_amount: 0,
    discount_amount: 0,
    total_amount: 60,
    status: "failed",
    description: "Order for pre-workout drink — payment failed",
    user: {
      id: "user-003",
      username: "mike_rogers",
      first_name: "Mike",
      last_name: "Rogers",
      birthday: "1995-02-18",
      image: null,
      imageUrl: null,
      phone: "+1-202-555-0176",
      email: "mike.rogers@example.com",
      role: "user",
      new_email: null,
      new_phone: null,
      is_email_verified: false,
      status: "active",
      rt_hash: "hash789",
      created_at: "2024-05-10T12:00:00Z",
      updated_at: "2025-08-11T08:00:00Z",
    },
    address: {
      id: "address-003",
      province: "New York",
      city: "Brooklyn",
      address: "88 Kings Highway, Brooklyn, NY",
      created_at: "2024-05-05T10:00:00Z",
    },
    items: [
      {
        id: "orderitem-004",
        count: 1,
        item: {
          id: "item-004",
          title: "Pre-Workout Energy Drink",
          ingredients: ["Caffeine", "Beta-Alanine", "Citrulline"],
          description: "Boost your energy before workouts.",
          price: 60,
          discount: 0,
          quantity: 75,
          rate: 4.7,
          rate_count: 110,
          show: true,
          images: [{ imageUrl: "/images/products/preworkout.png" }],
          createdAt: "2024-05-01T09:00:00Z",
        },
      },
    ],
    payments: [
      {
        id: "payment-003",
        status: false,
        amount: 0,
        invoice_number: "INV-1003",
        authority: "AUTH-FAIL111",
        card_pan: "5022-****-****-4567",
        card_hash: "hash99999",
        ref_id: 0,
        created_at: "2025-10-14T09:00:00Z",
        updated_at: "2025-10-14T09:05:00Z",
      },
    ],
  },
];
export default function Orders() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [selectedOrder, setSelectedOrder] = useState<OrderAdmin | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("newest");

  const { data: mock, isLoading: isLoadingOverview } = useOrderOverview();

  const {
    orders: mocked,
    isLoading,
    total,
  } = useGetOrdersAdmin({
    page: currentPage,
    limit: currentLimit,
    status: statusFilter || undefined,
    sortBy: sortBy || undefined,
  });

  const {
    mutate: changeStatus,
    isPending: isChangingStatus,
    variables: changeVars,
  } = useChangeOrderStatus();

  const handleStatusFilterChange = (newStatus: string) => {
    setStatusFilter(newStatus);
    setCurrentPage(1);
  };

  const handleSortByChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  };

  const headerProps = useMemo(
    () => ({
      title: "لیست سفارشات",
      icon: <Package size={30} />,
      actions: (
        <div className="flex flex-col md:flex-row mt-2 md:mt-0 items-center gap-4">
          <div className="flex items-center gap-2">
            <Select value={sortBy} onValueChange={handleSortByChange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="مرتب‌سازی" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">جدیدترین</SelectItem>
                <SelectItem value="oldest">قدیمی‌ترین</SelectItem>
                <SelectItem value="total_amount">مبلغ سفارش</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={statusFilter}
              onValueChange={handleStatusFilterChange}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="فیلتر وضعیت‌ها" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">در انتظار تایید</SelectItem>
                <SelectItem value="processing">در حال پردازش</SelectItem>
                <SelectItem value="delivered">تحویل داده شده</SelectItem>
                <SelectItem value="done">تکمیل شده</SelectItem>
                <SelectItem value="failed">ناموفق</SelectItem>
                <SelectItem value="canceled">لغوشده</SelectItem>
                <SelectItem value="refunded">بازگشت وجه</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ),
      showColumnVisibility: true,
    }),
    [statusFilter, handleStatusFilterChange, sortBy, handleSortByChange]
  );

  const pageSizeOptions = useMemo(() => [5, 10, 25, 50], []);

  return (
    <>
      {/* {isLoadingOverview ? (
        <StatisticsSkeleton cols={5} rows={10} />
      ) : ( */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-6">
        <StatisticsCard
          title="تعداد کل سفارشات"
          icon={Package}
          value={data?.total || 0}
        />

        <StatisticsCard
          title="سفارشات فعال"
          icon={Package}
          value={data?.active || 0}
        />

        <StatisticsCard
          title="سفارشات امروز"
          icon={Package}
          value={data?.today || 0}
        />

        <StatisticsCard
          title="در انتظار"
          icon={Clock}
          value={data?.byStatus?.pending || 0}
        />

        <StatisticsCard
          title="در حال پردازش"
          icon={RefreshCcw}
          value={data?.byStatus?.processing || 0}
        />

        <StatisticsCard
          title="تحویل شده"
          icon={Truck}
          value={data?.byStatus?.delivered || 0}
        />

        <StatisticsCard
          title="بازگشتی"
          icon={RotateCcw}
          value={data?.byStatus?.refunded || 0}
        />

        <StatisticsCard
          title="تکمیل شده"
          icon={CheckCircle2}
          value={data?.byStatus?.done || 0}
        />

        <StatisticsCard
          title="ناموفق"
          icon={XCircle}
          value={data?.byStatus?.failed || 0}
        />

        <StatisticsCard
          title="لغو شده"
          icon={Ban}
          value={data?.byStatus?.canceled || 0}
        />
      </div>
      {/* )} */}

      <DataTable
        data={orders}
        columns={columns({
          currentPage,
          currentLimit,
          orders,
          setSelectedOrder,
          changeStatus,
          isChangingStatus,
          changeVars,
        })}
        isLoading={false}
        totalCount={total}
        headerProps={headerProps}
        emptyStateMessage="هیچ سفارشی یافت نشد"
        emptyStateDescription="سفارشات جدید در اینجا نمایش داده خواهند شد"
        enablePagination={true}
        page={currentPage}
        limit={currentLimit}
        onPageChange={setCurrentPage}
        onLimitChange={(limit) => {
          setCurrentLimit(limit);
          setCurrentPage(1);
        }}
        pageSizeOptions={pageSizeOptions}
        enableSearch={false}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      />
    </>
  );
}
