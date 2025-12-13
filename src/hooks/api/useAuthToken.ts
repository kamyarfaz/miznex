
export const getApiUrl = (endpoint: string, isServer: boolean = false) => {
  if (isServer) {
    return endpoint.startsWith("http")
      ? endpoint
      : `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;
  }
  if (endpoint.startsWith("http")) return endpoint;
  return `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;
};

const makeRequest = async (url: string, options: RequestInit) => {
  const fullUrl = getApiUrl(url);
  const isFormData = options.body instanceof FormData;

  const headers = {
    Accept: "application/json",
    ...(options.headers || {}),
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5NTBiNmU1NC0zYzY5LTRiYmItYThjNS0zYzU5YTFlNGNiNTIiLCJmaXJzdE5hbWUiOiJuYXZpZHJlemEiLCJsYXN0TmFtZSI6ImFiYmFzemFkZWgiLCJlbWFpbCI6Im5hdmlkcmV6YWFiYmFzemFkZWg4OUBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NjUzMDcxOTMsImV4cCI6MTc2NTkxMTk5M30.IJuqfhKjhRnNtWYZYARqZhK7mktfYRVeWHqSXzJIHV4"
  };

  const req = await fetch(fullUrl, {
    ...options,
    headers,
    credentials: "include"
  });
  return req;
};

const onError = async (response: Response, url: string) => {
  let errorData: any = {};

  try {
    errorData = await response.json();
  } catch {
    errorData = {
      statusCode: response.status,
      message: response.statusText || "Server Error",
      timestamp: new Date().toISOString(),
      path: url,
    };
  }

  const customError = new Error(errorData.message || "Server Error");
  (customError as any).statusCode = errorData.statusCode || response.status;
  (customError as any).message = errorData.message || response.statusText;
  (customError as any).timestamp = errorData.timestamp;
  (customError as any).path = errorData.path || url;
  (customError as any).response = { data: errorData };

  throw customError;
};

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  try {
    const response = await makeRequest(url, options);

    if (response.status === 401) {
      console.log("401 handling");
    }

    if (response.ok) {
      const json = await response.json();
      return json;
    }

    await onError(response, url);
  } catch (error) {
    console.log("fetchWithAuth error", error);
    throw error;
  }
}


type FetchOptions = Omit<RequestInit, "method" | "body">;

export const fetchApi = {
  get: <T>(url: string, options: FetchOptions = {}): Promise<T> =>
    fetchWithAuth(url, { ...options, method: "GET" }) as Promise<T>,

  post: <T, D = any>(
    url: string,
    data?: D,
    options: FetchOptions = {}
  ): Promise<T> => {
    const isFormData = data instanceof FormData;

    return fetchWithAuth(url, {
      ...options,
      method: "POST",
      body: isFormData ? data : data ? JSON.stringify(data) : undefined,
      headers: {
        ...(options.headers || {}),
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
      },
    }) as Promise<T>;
  },

  put: <T, D = any>(
    url: string,
    data?: D,
    options: FetchOptions = {}
  ): Promise<T> => {
    const isFormData = data instanceof FormData;

    return fetchWithAuth(url, {
      ...options,
      method: "PUT",
      body: isFormData ? data : data ? JSON.stringify(data) : undefined,
      headers: {
        ...(options.headers || {}),
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
      },
    }) as Promise<T>;
  },

  delete: <T, D = any>(
    url: string,
    data?: D,
    options: FetchOptions = {}
  ): Promise<T> => {
    const isFormData = data instanceof FormData;

    return fetchWithAuth(url, {
      ...options,
      method: "DELETE",
      body: isFormData ? data : data ? JSON.stringify(data) : undefined,
      headers: {
        ...(options.headers || {}),
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
      },
    }) as Promise<T>;
  },

  patch: <T, D = any>(
    url: string,
    data?: D,
    options: FetchOptions = {}
  ): Promise<T> => {
    const isFormData = data instanceof FormData;

    return fetchWithAuth(url, {
      ...options,
      method: "PATCH",
      body: isFormData ? data : data ? JSON.stringify(data) : undefined,
      headers: {
        ...(options.headers || {}),
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
      },
    }) as Promise<T>;
  },
};
