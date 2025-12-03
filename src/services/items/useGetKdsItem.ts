import { useGet } from "@/hooks/api/useReactQueryHooks";
import { MenuItemResponse } from "@/types/main/menu";

export interface KdsQuery {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  sort?: string;
}

export const useGetKdsItems = (
  restaurantId: string,
  query: KdsQuery = {},
  initialData?: MenuItemResponse
) => {
  // Build query string safely
  const params = new URLSearchParams({
    page: query.page?.toString() || "1",
    limit: query.limit?.toString() || "10",
  });

  if (query.category && query.category !== "all")
    params.append("category", query.category);

  if (query.search) params.append("search", query.search);
  if (query.sort) params.append("sort", query.sort);

  const queryString = params.toString();
  const endpoint = `/v1/menu/restaurant/${restaurantId}?${queryString ?? ""}`;

  const { data, isLoading, error } = useGet(endpoint, {
    queryKey: ["kds-items", restaurantId, query],
    initialData,
  });

  return {
    items: data?.data?.items,
    total: data?.data?.totalCount,
    page: data?.data?.page,
    limit: data?.data?.limit,
    isLoading,
    error,
  };
};
