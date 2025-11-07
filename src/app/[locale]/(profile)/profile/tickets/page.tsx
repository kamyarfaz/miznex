"use client";

import { useState } from "react";
import { useGetUserTickets } from "@/services";
import { Ticket, TicketFilters } from "@/types/Profile";
import {
  TicketsList,
  TicketChat,
  NewTicketForm,
} from "@/components/profile/tickets";

export const ticketsData = {
  statusCode: 200,
  message: "Messages fetched successfully",
  data: {
    total: 3,
    tickets: [
      {
        id: "ticket-001",
        subject: "Problem with order payment",
        status: "answered",
        created_at: "2025-10-15T10:30:00Z",
        length: 3,
        user: {
          id: "user-001",
          username: "john_doe",
          first_name: "John",
          last_name: "Doe",
          image: "https://example.com/users/john.jpg",
          imageUrl: "https://example.com/users/john.jpg",
          role: "customer",
        },
      },
    ],
    messages: [
      {
        id: "msg-001",
        message:
          "Hello, I made a payment for my order but it still shows as pending.",
        created_at: "2025-10-15T10:35:00Z",
        sender: {
          id: "user-001",
          username: "john_doe",
          first_name: "John",
          last_name: "Doe",
          image: "https://example.com/users/john.jpg",
          imageUrl: "https://example.com/users/john.jpg",
          role: "customer",
        },
      },
      {
        id: "msg-002",
        message:
          "Hi John, thank you for reaching out! Could you please provide your invoice number so we can check the payment status?",
        created_at: "2025-10-15T10:50:00Z",
        sender: {
          id: "admin-001",
          username: "support_agent",
          first_name: "Sarah",
          last_name: "Lee",
          image: "https://example.com/users/support.jpg",
          imageUrl: "https://example.com/users/support.jpg",
          role: "support",
        },
      },
      {
        id: "msg-003",
        message: "Sure! The invoice number is INV-20251010-001.",
        created_at: "2025-10-15T10:55:00Z",
        sender: {
          id: "user-001",
          username: "john_doe",
          first_name: "John",
          last_name: "Doe",
          image: "https://example.com/users/john.jpg",
          imageUrl: "https://example.com/users/john.jpg",
          role: "customer",
        },
      },
    ],
  },
};

export default function TicketsPage() {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [view, setView] = useState<"list" | "chat" | "new">("list");
  const [filters, setFilters] = useState<TicketFilters>({ page: 1, limit: 5 });

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

  const { data: mockTicketsData, isLoading } = useGetUserTickets({
    ...filters,
  });

  const handleTicketSelect = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setView("chat");
  };

  const handleBackToList = () => {
    setView("list");
    setSelectedTicket(null);
  };

  return (
    <>
      <div className="h-full mb-12 ">
        {view === "list" && (
          <TicketsList
            totalPages={ticketsData?.data?.total || 0}
            filters={filters}
            onFilterChange={handleFilterChange}
            tickets={ticketsData?.data?.tickets as Ticket}
            isLoading={isLoading}
            newTicket={() => setView("new")}
            onTicketSelect={handleTicketSelect}
          />
        )}

        {view === "chat" && selectedTicket && (
          <div className="lg:static md:h-auto  fixed inset-0 z-50 ">
            <TicketChat ticket={selectedTicket?.id} onBack={handleBackToList} />
          </div>
        )}

        {view === "new" && (
          <NewTicketForm
            list={() => setView("list")}
            onCancel={handleBackToList}
          />
        )}
      </div>
    </>
  );
}
