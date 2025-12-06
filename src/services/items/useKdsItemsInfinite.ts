import { useInfiniteQuery } from "@tanstack/react-query";
import { MenuItemResponse } from "@/types/main/menu";
import { fetchApi } from "@/hooks/api/useAuthToken";

export interface KdsQuery {
  limit?: number;
  categoryId?: string;
  search?: string;
  sort?: string;
  minPrice?: number;
  maxPrice?: number;
  orderBy?: string;
}

export const useGetKdsItemsInfinite = (
  restaurantId: string,
  query: KdsQuery = {}
) => {
  const { categoryId, search, minPrice, maxPrice, orderBy, sort } = query;
  const fetchItems = async ({ pageParam = 1 }): Promise<MenuItemResponse> => {
    const params = new URLSearchParams({
      page: pageParam.toString(),
      limit: query.limit?.toString() || "12",
    });

    if (orderBy) params.append("orderBy", orderBy);
    if (sort) params.append("sort", sort);
    if (query.categoryId && query.categoryId !== "all")
      params.append("categoryId", query.categoryId);
    if (query.minPrice) params.append("minPrice", query.minPrice.toString());
    if (query.maxPrice) params.append("maxPrice", query.maxPrice.toString());
    if (query.search) params.append("search", query.search);

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
    queryKey: [
      "kds-items-infinite",
      restaurantId,
      categoryId,
      search,
      maxPrice,
      minPrice,
      sort,
      orderBy,
    ],
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
