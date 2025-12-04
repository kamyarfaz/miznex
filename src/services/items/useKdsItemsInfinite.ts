import { useInfiniteQuery } from "@tanstack/react-query";
import { MenuItemResponse } from "@/types/main/menu";
import { fetchApi } from "@/hooks/api/useAuthToken";

export interface KdsQuery {
  limit?: number;
  categoryId?: string;
  search?: string;
  sort?: string;
}

export const useGetKdsItemsInfinite = (
  restaurantId: string,
  query: KdsQuery = {}
) => {
  const fetchItems = async ({ pageParam = 1 }): Promise<MenuItemResponse> => {
    const params = new URLSearchParams({
      page: pageParam.toString(),
      limit: query.limit?.toString() || "12",
    });

    if (query.categoryId && query.categoryId !== "all")
      params.append("category", query.categoryId);

    if (query.search) params.append("search", query.search);
    if (query.sort) params.append("sort", query.sort);

    const queryString = params.toString();
    const endpoint = `/v1/menu/restaurant/${restaurantId}?${queryString}`;

    const response = await fetchApi.get<MenuItemResponse>(endpoint);

    return response;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["kds-items-infinite", restaurantId, query],
    queryFn: fetchItems,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage?.data?.page || 1;
      const totalCount = lastPage?.data?.totalCount || 0;
      const limit = lastPage?.data?.limit || 12;
      const totalPages = Math.ceil(totalCount / limit);

      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
  });

  // Flatten all pages into a single array
  const items = data?.pages.flatMap((page) => page?.data?.items || []) || [];
  const totalCount = data?.pages[0]?.data?.totalCount || 0;

  return {
    items,
    totalCount,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  };
};
