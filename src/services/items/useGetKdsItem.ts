import { useGet } from "@/hooks/api/useReactQueryHooks";
import { MenuItemResponse } from "@/types/main/menu";

// useGetItems is used to get the items useQuery
export const useGetKdsItems = (
  restaurantId: string,
  queryString?: string,
  initialData?: MenuItemResponse
) => {
  const endpoint = `/v1/menu/restaurant/${restaurantId}?${queryString}`;

  const { data, isLoading, error } = useGet(endpoint, {
    queryKey: ["kds-items", queryString],
    initialData: initialData,
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
