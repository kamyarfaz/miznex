"use client";
import { useDeleteContact, useGetContacts } from "@/services";
import { DataTable } from "@/app/[locale]/(admin)/components/common/DataTable";
import { useState, useMemo } from "react";
import { MessageSquare } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { columns } from "./columns";
import { Contact } from "@/types/admin";
import dynamic from "next/dynamic";

const ReplyModal = dynamic(() => import("./modal-reply-and-edit/ReplyModal"), {
  ssr: false,
});

const ViewMessageModal = dynamic(
  () => import("./modal-reply-and-edit/ViewMessageModal"),
  { ssr: false }
);

const contacts = [
  {
    id: "contact-001",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1-202-555-0123",
    message: "Hello, I have an issue with my recent order payment.",
    created_at: "2025-10-15T09:20:00Z",
    replies: [
      {
        id: "reply-001",
        subject: "Re: Issue with order payment",
        message:
          "Hi John, thanks for reaching out! Could you please share your invoice number so we can check the payment status?",
        created_at: "2025-10-15T10:05:00Z",
      },
      {
        id: "reply-002",
        subject: "Payment confirmation",
        message:
          "Your payment has been verified successfully. The order is now being processed.",
        created_at: "2025-10-15T12:40:00Z",
      },
    ],
  },
  {
    id: "contact-002",
    name: "Emily Carter",
    email: "emily.carter@example.com",
    phone: "+44-7700-900987",
    message: "Do you offer bulk discounts for corporate orders?",
    created_at: "2025-10-12T14:30:00Z",
    replies: [
      {
        id: "reply-003",
        subject: "Re: Bulk order inquiry",
        message:
          "Hi Emily, yes we do! Orders above 100 units qualify for special discounts. Please share your order details.",
        created_at: "2025-10-12T15:00:00Z",
      },
    ],
  },
  {
    id: "contact-003",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "+1-202-555-0176",
    message: "The app keeps crashing when I try to check out.",
    created_at: "2025-10-10T08:45:00Z",
    replies: [
      {
        id: "reply-004",
        subject: "Re: App crash issue",
        message:
          "Hi Michael, we’re sorry about the inconvenience. Could you tell us your device and OS version? We’re investigating this issue.",
        created_at: "2025-10-10T09:15:00Z",
      },
      {
        id: "reply-005",
        subject: "Update released",
        message:
          "We’ve just released an update that fixes the crash issue. Please update the app and let us know if the problem persists.",
        created_at: "2025-10-11T11:00:00Z",
      },
    ],
  },
  {
    id: "contact-004",
    name: "Sarah Lee",
    email: "sarah.lee@example.com",
    phone: "+33-612-555-090",
    message: "Can I change my delivery address after placing an order?",
    created_at: "2025-10-14T16:00:00Z",
    replies: [
      {
        id: "reply-006",
        subject: "Re: Changing delivery address",
        message:
          "Hi Sarah, yes, you can update your address before the order is shipped. Please go to your account settings → Orders → Edit Address.",
        created_at: "2025-10-14T16:30:00Z",
      },
    ],
  },
];

export default function Messages() {
  // Pagination and search states
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [searchValue, setSearchValue] = useState("");

  // Filter states
  const [sortBy, setSortBy] = useState<string>("");
  const [hasReply, setHasReply] = useState<string>("");

  // Modal states
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

  const { contacts: mocked, isLoading } = useGetContacts({
    page: currentPage,
    limit: currentLimit,
    name: searchValue || undefined,
    sortBy: sortBy || undefined,
    hasReply:
      hasReply === "true" ? true : hasReply === "false" ? false : undefined,
  });

  // delete contact
  const {
    mutate: deleteContact,
    isPending: isDeleting,
    variables: deletingVars,
  } = useDeleteContact();

  // Modal management functions
  const openViewModal = (contact: Contact) => {
    setSelectedContact(contact);
    setIsViewModalOpen(true);
  };

  const openReplyModal = (contact: Contact) => {
    setSelectedContact(contact);
    setIsReplyModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedContact(null);
  };

  const closeReplyModal = () => {
    setIsReplyModalOpen(false);
    setSelectedContact(null);
  };

  const switchToReplyFromView = () => {
    setIsViewModalOpen(false);
    setIsReplyModalOpen(true);
  };

  // Filter change handlers
  const handleSortChange = (newSortBy: string) => {
    setCurrentPage(1);
    setSortBy(newSortBy);
  };

  const handleReplyFilterChange = (newHasReply: string) => {
    setCurrentPage(1);
    setHasReply(newHasReply);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleLimitChange = (limit: number) => {
    setCurrentLimit(limit);
    setCurrentPage(1);
  };

  const headerProps = useMemo(
    () => ({
      title: "پیام های   کاربران",
      icon: <MessageSquare size={30} />,
      showColumnVisibility: true,
      actions: (
        <div className="flex flex-col md:flex-row items-center mt-2 md:mt-0 gap-4">
          <div className="flex items-center gap-2">
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="مرتب‌سازی بر اساس زمان" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">جدیدترین</SelectItem>
                <SelectItem value="oldest">قدیمی‌ترین</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Select value={hasReply} onValueChange={handleReplyFilterChange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="فیلتر بر اساس پاسخ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">پاسخ داده شده</SelectItem>
                <SelectItem value="false">بدون پاسخ</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ),
    }),
    [sortBy, hasReply, handleSortChange, handleReplyFilterChange]
  );

  return (
    <>
      <DataTable
        data={contacts}
        columns={columns({
          currentPage,
          currentLimit,
          onViewMessage: openViewModal,
          onReplyToMessage: openReplyModal,
          deleteContact,
          isDeleting,
          deletingVars,
        })}
        isLoading={false}
        headerProps={headerProps}
        emptyStateMessage="هیچ پیامی یافت نشد"
        emptyStateDescription="پیام‌های ارسالی از طریق فرم تماس با ما در اینجا نمایش داده می‌شوند"
        enablePagination={true}
        page={currentPage}
        limit={currentLimit}
        totalCount={contacts.length}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
        pageSizeOptions={[5, 10, 25, 50]}
        enableSearch={true}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      />

      {/* Modals */}
      <ViewMessageModal
        isOpen={isViewModalOpen}
        onClose={closeViewModal}
        contact={selectedContact}
        onReply={switchToReplyFromView}
      />

      <ReplyModal
        isOpen={isReplyModalOpen}
        onClose={closeReplyModal}
        contact={selectedContact}
      />
    </>
  );
}
