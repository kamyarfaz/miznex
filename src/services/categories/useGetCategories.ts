import { useGet } from "@/hooks/api/useReactQueryHooks";
import { CategoryResponseMenu } from "@/types/main/menu";

export const useGetCategories = (queryString?: string) => {
  const {
    data: result,
    isLoading,
    error,
  } = useGet<CategoryResponseMenu>(`/categories?${queryString}`, {
    queryKey: ["categories"],
    staleTime: 0,
  });
  return {
    categories: result?.data?.categories,
    total: result?.data?.totalCount,
    page: result?.data?.page,
    limit: result?.data?.limit,
    isLoading,
    error,
  };
};
