"use client";

import { DataTable } from "@/app/(admin)/components/common/DataTable";
import { useMemo, useState } from "react";
import { Package } from "lucide-react";
import { useCloseTicket, useDeleteTicket, useGetTickets } from "@/services";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import dynamic from "next/dynamic";

import { columns } from "./columns";
import { TicketFilters } from "@/types/Profile";

const AdminTicketChatModal = dynamic(
  () => import("./AdminTicketChatModal").then((mod) => mod.default),
  { ssr: false }
);

const tickets = [
  {
    id: "ticket-001",
    subject: "Payment not going through",
    status: "open",
    created_at: "2025-10-17T14:20:00Z",
    user: {
      id: "user-001",
      username: "john_doe",
      first_name: "John",
      last_name: "Doe",
      image: "/images/users/john.png",
      role: "user",
      imageUrl: "/images/users/john.png",
    },
    length: 4, // number of messages in the ticket thread
  },
  {
    id: "ticket-002",
    subject: "Issue with product delivery",
    status: "answered",
    created_at: "2025-10-15T09:45:00Z",
    user: {
      id: "user-002",
      username: "emily_carter",
      first_name: "Emily",
      last_name: "Carter",
      image: "/images/users/emily.png",
      role: "user",
      imageUrl: "/images/users/emily.png",
    },
    length: 6,
  },
  {
    id: "ticket-003",
    subject: "Need refund for incorrect order",
    status: "closed",
    created_at: "2025-10-10T11:00:00Z",
    user: {
      id: "user-003",
      username: "mike_rogers",
      first_name: "Mike",
      last_name: "Rogers",
      image: "/images/users/mike.png",
      role: "user",
      imageUrl: "/images/users/mike.png",
    },
    length: 5,
  },
  {
    id: "ticket-004",
    subject: "App crashes when adding to cart",
    status: "open",
    created_at: "2025-10-18T08:15:00Z",
    user: {
      id: "user-004",
      username: "sarah_lee",
      first_name: "Sarah",
      last_name: "Lee",
      image: "/images/users/sarah.png",
      role: "user",
      imageUrl: "/images/users/sarah.png",
    },
    length: 3,
  },
  {
    id: "ticket-005",
    subject: "Discount code not working",
    status: "answered",
    created_at: "2025-10-12T16:40:00Z",
    user: {
      id: "user-005",
      username: "daniel_kim",
      first_name: "Daniel",
      last_name: "Kim",
      image: "/images/users/daniel.png",
      role: "user",
      imageUrl: "/images/users/daniel.png",
    },
    length: 2,
  },
];

export default function Tickets() {
  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState<TicketFilters>({ page: 1, limit: 10 });
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  const handleFilterChange = (
    key: keyof TicketFilters,
    value?: string | number
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
      ...(key !== "page" ? { page: 1 } : {}),
    }));
  };

  const {
    tickets: mock,
    isLoading,
    total,
  } = useGetTickets({
    ...filters,
  });

  const {
    mutate: deleteTicket,
    isPending: isDeletingTicket,
    variables: deletingVars,
  } = useDeleteTicket();

  const {
    mutate: closeTicket,
    isPending: isClosingTicket,
    variables: closingVars,
  } = useCloseTicket();

  const headerProps = useMemo(
    () => ({
      title: "لیست تیکت ها",
      icon: <Package size={30} />,
      actions: (
        <div className="flex flex-col md:flex-row mt-2 md:mt-0 items-center gap-4">
          <div className="flex items-center gap-2">
            <Select
              value={filters.sortBy}
              onValueChange={(value) => handleFilterChange("sortBy", value)}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="مرتب سازی" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">جدیدترین</SelectItem>
                <SelectItem value="oldest">قدیمی‌ترین</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={filters.status}
              onValueChange={(value) => handleFilterChange("status", value)}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="فیلتر وضعیت‌ها" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">در انتظار تایید</SelectItem>
                <SelectItem value="answered">پاسخ داده شده</SelectItem>
                <SelectItem value="closed">بسته شده</SelectItem>
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

  const handleOpenChat = (ticketId: string) => {
    setSelectedTicketId(ticketId);
    setIsChatModalOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatModalOpen(false);
    setSelectedTicketId(null);
  };

  return (
    <>
      <DataTable
        data={tickets}
        columns={columns({
          // filters
          currentPage: filters.page || 1,
          currentLimit: filters.limit || 10,
          // tickets
          tickets,
          // delete ticket
          deleteTicket,
          isDeletingTicket,
          deletingVars,
          // close ticket
          closeTicket,
          isClosingTicket,
          closingVars,
          // chat modal
          onOpenChat: handleOpenChat,
        })}
        isLoading={false}
        totalCount={total}
        headerProps={headerProps}
        emptyStateMessage="هیچ تیکتی یافت نشد"
        emptyStateDescription="تیکت های جدید در اینجا نمایش داده خواهند شد"
        enablePagination={true}
        page={filters.page}
        limit={filters.limit}
        onPageChange={(page) => handleFilterChange("page", page)}
        onLimitChange={(limit) => {
          handleFilterChange("limit", limit);
          handleFilterChange("page", 1);
        }}
        pageSizeOptions={pageSizeOptions}
        enableSearch={false}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      />

      {/* Chat Modal */}
      <AdminTicketChatModal
        ticketId={selectedTicketId}
        isOpen={isChatModalOpen}
        onClose={handleCloseChat}
      />
    </>
  );
}
