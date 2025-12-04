"use client";

import {
  Header,
  StatsCards,
  QuickActions,
} from "@/components/profile/overview";
import {
  HeaderSkeleton,
  StatsCardsSkeleton,
  RecentOrdersSkeleton,
  PopularProductsSkeleton,
  PromotionalBannerSkeleton,
  QuickActionsSkeleton,
} from "@/components/skeleton";
import dynamic from "next/dynamic";

import {
  useUserProfile,
  useGetFavorites,
  useGetOrders,
  useProfileOverview,
} from "@/services";

const RecentOrders = dynamic(
  () => import("@/components/profile/overview").then((mod) => mod.RecentOrders),
  { ssr: false }
);

const PopularProducts = dynamic(
  () =>
    import("@/components/profile/overview").then((mod) => mod.PopularProducts),
  { ssr: false }
);

const PromotionalBanner = dynamic(
  () =>
    import("@/components/profile/overview").then(
      (mod) => mod.PromotionalBanner
    ),
  { ssr: false }
);

const ordersData = {
  length: 2,
  total: 2,
  page: 1,
  limit: 10,
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
            description:
              "Crispy Caesar salad with grilled chicken and dressing.",
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

const favoritesData = [
  {
    id: "fav-001",
    isAvailable: true,
    item: {
      id: "item-101",
      title: "Margherita Pizza",
      ingredients: ["Tomato", "Mozzarella", "Basil"],
      description: "Classic Italian pizza with fresh mozzarella and basil.",
      price: 12.99,
      discount: 10,
      quantity: 1,
      rate: 4.7,
      rate_count: 256,
      show: true,
      createdAt: "2025-09-20T13:45:00Z",
    },
  },
  {
    id: "fav-002",
    isAvailable: true,
    item: {
      id: "item-102",
      title: "Beef Burger Deluxe",
      ingredients: ["Beef Patty", "Cheddar", "Lettuce", "Tomato", "Bun"],
      description:
        "Juicy grilled beef burger with melted cheddar and fresh veggies.",
      price: 15.5,
      discount: 5,
      quantity: 1,
      rate: 4.5,
      rate_count: 180,
      show: true,
      createdAt: "2025-09-18T10:10:00Z",
    },
  },
  {
    id: "fav-003",
    isAvailable: false,
    item: {
      id: "item-103",
      title: "Vegan Smoothie Bowl",
      ingredients: ["Banana", "Berries", "Coconut", "Chia Seeds"],
      description:
        "A refreshing smoothie bowl packed with nutrients and antioxidants.",
      price: 9.99,
      discount: 0,
      quantity: 1,
      rate: 4.8,
      rate_count: 340,
      show: true,
      createdAt: "2025-08-30T08:30:00Z",
    },
  },
];

const overviewData = {
  data: {
    address: {
      total: 3,
    },
    favorite: {
      total: 12,
    },
    order: {
      total: 8,
      active: 2,
    },
  },
};

export default function OverviewPage() {
  const { data: user, isLoading: userLoading } = useUserProfile();
  const { data: mockedOrdersData, isLoading: ordersLoading } = useGetOrders({
    limit: 100,
    page: 1,
  });
  const { data: mockedFavoritesData, isLoading: favoritesLoading } =
    useGetFavorites({
      limit: 100,
      page: 1,
    });
  const { data: mockOverviewData, isLoading: overviewLoading } =
    useProfileOverview();

  return (
    <div
      data-testid="profile-overview"
      className="space-y-8 p-4 sm:p-6 lg:p-4 bg-gradient-to-br from-rose-50/50 to-amber-50/50 dark:from-gray-900 dark:to-gray-800 min-h-screen"
    >
      {userLoading ? <HeaderSkeleton /> : <Header user={user} />}

      {userLoading || ordersLoading || favoritesLoading || overviewLoading ? (
        <StatsCardsSkeleton />
      ) : (
        <StatsCards data={overviewData?.data} />
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* {ordersLoading ? (
          <RecentOrdersSkeleton />
        ) : ( */}
        <RecentOrders ordersData={ordersData} />
        {/* // )} */}

        {/* {favoritesLoading ? (
          <PopularProductsSkeleton />
        ) : ( */}
        <PopularProducts favoritesData={favoritesData} />
        {/* )} */}
      </div>

      {userLoading ? <PromotionalBannerSkeleton /> : <PromotionalBanner />}

      {userLoading ? <QuickActionsSkeleton /> : <QuickActions />}
    </div>
  );
}
