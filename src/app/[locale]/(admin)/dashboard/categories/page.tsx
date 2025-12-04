"use client";
import { DataTable } from "@/app/[locale]/(admin)/components/common/DataTable";
import { useMemo, useState } from "react";
import { ChartBarStacked } from "lucide-react";
import { useDeleteCategories, useGetCategoriesAdmin } from "@/services";
import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import { CategoryModal } from "./add-with-edit-modal";

const categories = [
  {
    id: "cat-001",
    title: "Pizza",
    image: "https://example.com/images/categories/pizza.jpg",
    imageUrl: "https://example.com/images/categories/pizza.jpg",
    show: true,
  },
  {
    id: "cat-002",
    title: "Burgers",
    image: "https://example.com/images/categories/burger.jpg",
    imageUrl: "https://example.com/images/categories/burger.jpg",
    show: true,
  },
  {
    id: "cat-003",
    title: "Drinks",
    image: "https://example.com/images/categories/drinks.jpg",
    imageUrl: "https://example.com/images/categories/drinks.jpg",
    show: true,
  },
  {
    id: "cat-004",
    title: "Desserts",
    image: "https://example.com/images/categories/dessert.jpg",
    imageUrl: "https://example.com/images/categories/dessert.jpg",
    show: false,
  },
  {
    id: "cat-005",
    title: "Salads",
    image: "https://example.com/images/categories/salad.jpg",
    imageUrl: "https://example.com/images/categories/salad.jpg",
    show: true,
  },
];


export default function Categories() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [searchValue, setSearchValue] = useState("");

  const { categories: mocked, isLoading, total } = useGetCategoriesAdmin({
    page: currentPage,
    limit: currentLimit,
  });
  const {
    mutate: deleteCategory,
    isPending: isDeleting,
    variables: deletingVars,
  } = useDeleteCategories();

  const headerProps = useMemo(
    () => ({
      title: "لیست دسته‌بندی‌ها",
      icon: <ChartBarStacked size={30} />,
      showColumnVisibility: true,
      actions: (
        <CategoryModal
          initialData={null}
          trigger={
            <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all duration-300">
              افزودن دسته‌بندی
            </Button>
          }
        />
      ),
    }),
    []
  );

  return (
    <DataTable
      data={categories}
      columns={columns({
        currentPage,
        currentLimit,
        deleteCategory,
        isDeleting,
        deletingVars,
      })}
      isLoading={false}
      headerProps={headerProps}
      emptyStateMessage="هیچ دسته‌بندی یافت نشد"
      emptyStateDescription="برای افزودن دسته‌بندی، روی دکمه افزودن کلیک کنید"
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
      searchPlaceholder="جستجو در عنوان ها...."
    />
  );
}
