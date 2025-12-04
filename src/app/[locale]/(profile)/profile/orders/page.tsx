"use client";

import { useState, useEffect } from "react";
import { useCancelOrder, useGetOrders } from "@/services";
import { OrderSkeleton } from "@/components/skeleton";
import { GetOrdersParams } from "@/types/Profile";
import { OrderAdmin } from "@/types/admin";
import {
  OrdersHeader,
  EmptyState,
  OrdersPagination,
  OrderDetailsModal,
  OrderCard,
} from "@/components/profile/orders";
import { confirm } from "@/components/shared/ConfirmModal";

const orders = {
  orders: [
    {
      id: "order-001",
      payment_amount: 85.5,
      discount_amount: 10,
      total_amount: 95.5,
      status: "delivered",
      description: "Order delivered successfully",
      user: {
        id: "user-001",
        username: "john_doe",
        first_name: "John",
        last_name: "Doe",
        birthday: "2000-05-15",
        image: null,
        imageUrl: "https://example.com/users/john.jpg",
        phone: "+1-202-555-0148",
        email: "john@example.com",
        role: "customer",
        new_email: null,
        new_phone: null,
        is_email_verified: true,
        status: "active",
        rt_hash: "xyz123",
        created_at: "2025-01-10T08:45:00Z",
        updated_at: "2025-10-15T14:20:00Z",
      },
      address: {
        id: "addr-001",
        province: "California",
        city: "Los Angeles",
        address: "1234 Sunset Blvd, Apt 56",
        created_at: "2025-09-20T10:00:00Z",
      },
      items: [
        {
          id: "order-item-001",
          count: 2,
          item: {
            id: "item-101",
            title: "Chicken Caesar Salad",
            ingredients: ["Chicken", "Lettuce", "Parmesan", "Croutons"],
            description: "Crispy Caesar salad with grilled chicken and dressing.",
            price: 12.5,
            discount: 10,
            quantity: 1,
            rate: 4.5,
            rate_count: 120,
            show: true,
            createdAt: "2025-07-15T12:30:00Z",
            images: [
              { imageUrl: "https://example.com/images/salad1.jpg" },
              { imageUrl: "https://example.com/images/salad2.jpg" },
            ],
          },
        },
        {
          id: "order-item-002",
          count: 1,
          item: {
            id: "item-102",
            title: "Iced Latte",
            ingredients: ["Espresso", "Milk", "Ice"],
            description: "Smooth iced latte with a rich espresso flavor.",
            price: 5.5,
            discount: 0,
            quantity: 1,
            rate: 4.8,
            rate_count: 200,
            show: true,
            createdAt: "2025-06-30T09:00:00Z",
            images: [{ imageUrl: "https://example.com/images/latte.jpg" }],
          },
        },
      ],
      payments: [
        {
          id: "payment-001",
          status: true,
          amount: 85.5,
          invoice_number: "INV-20251010-001",
          authority: "AUTH-987654",
          card_pan: "6037-****-****-2345",
          card_hash: "HASH123",
          ref_id: 998877,
          created_at: "2025-10-10T10:10:00Z",
          updated_at: "2025-10-10T10:15:00Z",
        },
      ],
    },
    {
      id: "order-002",
      payment_amount: 42.0,
      discount_amount: 5,
      total_amount: 47.0,
      status: "pending",
      description: "Awaiting payment confirmation",
      user: {
        id: "user-001",
        username: "john_doe",
        first_name: "John",
        last_name: "Doe",
        birthday: "2000-05-15",
        image: null,
        imageUrl: "https://example.com/users/john.jpg",
        phone: "+1-202-555-0148",
        email: "john@example.com",
        role: "customer",
        new_email: null,
        new_phone: null,
        is_email_verified: true,
        status: "active",
        rt_hash: "xyz123",
        created_at: "2025-01-10T08:45:00Z",
        updated_at: "2025-10-15T14:20:00Z",
      },
      address: {
        id: "addr-002",
        province: "New York",
        city: "Brooklyn",
        address: "78 Greenpoint Ave, Unit 3B",
        created_at: "2025-09-21T09:30:00Z",
      },
      items: [
        {
          id: "order-item-003",
          count: 1,
          item: {
            id: "item-103",
            title: "Vegan Wrap",
            ingredients: ["Avocado", "Lettuce", "Tomato", "Tortilla"],
            description:
              "Healthy vegan wrap with fresh vegetables and creamy avocado.",
            price: 10.0,
            discount: 5,
            quantity: 1,
            rate: 4.3,
            rate_count: 90,
            show: true,
            createdAt: "2025-08-01T08:00:00Z",
            images: [{ imageUrl: "https://example.com/images/wrap.jpg" }],
          },
        },
      ],
      payments: [
        {
          id: "payment-002",
          status: false,
          amount: 42.0,
          invoice_number: "INV-20251011-002",
          authority: "AUTH-123456",
          card_pan: "5022-****-****-9981",
          card_hash: "HASH456",
          ref_id: 0,
          created_at: "2025-10-11T09:40:00Z",
          updated_at: "2025-10-11T09:45:00Z",
        },
      ],
    },
  ],
};


export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<OrderAdmin | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<GetOrdersParams>({
    page: 1,
    limit: 4,
  });

  const handleFilterChange = (
    key: keyof GetOrdersParams,
    value?: string | number
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
      ...(key !== "page" ? { page: 1 } : {}),
    }));
  };

  const { data: mockedOrders, isLoading, total, page, limit } = useGetOrders(filters);

  const {
    mutate: CancelOrder,
    isPending,
    cancellingOrderId,
  } = useCancelOrder();

  const totalPages = Math?.max(1, Math?.ceil(total / limit));
  const currentPage = page;

  useEffect(() => {
    if (
      !isLoading &&
      orders?.orders?.length === 0 &&
      currentPage > 1 &&
      total > 0
    ) {
      handleFilterChange("page", currentPage - 1);
    }
  }, [orders, currentPage, total, isLoading]);

  const handleViewDetails = (order: OrderAdmin) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleCancelOrder = async (orderId: string) => {
    const confirmed = await confirm({
      title: "لغو سفارش",
      description: "آیا مطمئن هستید که می‌خواهید این سفارش را لغو کنید؟",
      confirmText: "لغو سفارش",
      cancelText: "انصراف",
    });

    if (confirmed) {
      CancelOrder(orderId);
    }
  };

  // if (isLoading) {
  //   return <OrderSkeleton />;
  // }

  if (orders?.orders?.length === 0 && total === 0) {
    return <EmptyState />;
  }

  return (
    <div className="container mx-auto px-2 py-8">
      <OrdersHeader />

      <div className="flex flex-col gap-4 p-4 bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-800 rounded-lg shadow-md">
        <OrderCard
          isPending={isPending}
          cancellingOrderId={cancellingOrderId}
          CancelOrder={handleCancelOrder}
          orders={orders?.orders || []}
          onViewDetails={handleViewDetails}
        />

        <OrdersPagination
          selectedLimit={limit}
          onLimitChange={(limit: number) => handleFilterChange("limit", limit)}
          totalItems={total}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page: number) => handleFilterChange("page", page)}
        />
      </div>

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
