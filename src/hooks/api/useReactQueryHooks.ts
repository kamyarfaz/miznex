import { fetchApi } from "@/hooks/api/useAuthToken";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

type ServerError = Error;

// GET
export const useGet = <T>(
  endpoint: string,
  options?: UseQueryOptions<T, ServerError>
) => {
  return useQuery<T, ServerError>({
    queryKey: options?.queryKey ?? [endpoint],
    ...options,
    queryFn: () => fetchApi.get<T>(endpoint),
    staleTime: 5 * 60 * 1000,
  });
};

// POST
export const usePost = <T, D = any>(
  getUrl: string | ((data: D) => string),
  getBody?: (data: D) => unknown,
  options?: UseMutationOptions<T, ServerError, D>
) => {
  return useMutation<T, ServerError, D>({
    mutationFn: async (data: D) => {
      const url = typeof getUrl === "string" ? getUrl : getUrl(data);
      const body = getBody ? getBody(data) : data;
      const res = await fetchApi.post<T>(url, body);
      return res;
    },
    ...options,
  });
};

// PUT
export const usePut = <T, D = any>(
  getUrl?: (data: D) => string,
  getBody?: (data: D) => unknown,
  options?: UseMutationOptions<T, ServerError, D>
) => {
  return useMutation<T, ServerError, D>({
    mutationFn: (data: D) => {
      const url = getUrl ? getUrl(data) : "";
      const hasBody = typeof getBody === "function";
      const body = hasBody ? getBody(data) : undefined;

      return fetchApi.put<T>(url, body);
    },
    ...options,
  });
};

// DELETE
export const useDelete = <T, D = any>(
  getUrl: (data: D) => string,
  options?: UseMutationOptions<T, ServerError, D>
) => {
  return useMutation<T, ServerError, D>({
    mutationFn: (data: D) => fetchApi.delete<T>(getUrl(data), data),
    ...options,
  });
};

// PATCH
export const usePatch = <T, D = any>(
  getUrl: string | ((data: D) => string),
  getBody?: (data: D) => unknown,
  options?: UseMutationOptions<T, ServerError, D>
) => {
  return useMutation<T, ServerError, D>({
    mutationFn: (data: D) => {
      const url = typeof getUrl === "string" ? getUrl : getUrl(data);
      const body = getBody ? getBody(data) : data;
      return fetchApi.patch<T>(url, body);
    },
    ...options,
  });
};
