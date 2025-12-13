import { fetchApi } from "@/hooks/api/useAuthToken";
import {
  ApiResponse,
  AssignIngredientsDto,
  ConsumeIngredientDto,
  CreateIngredientDto,
  Ingredient,
  PaginatedResponse,
  QueryIngredientDto,
  RestockIngredientDto,
  UpdateIngredientDto,
} from "@/types/index";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

class IngredientAPI {
  private basePath = "/ingredients";

  /**
   * Create a new ingredient
   */
  async create(
    dto: CreateIngredientDto
  ): Promise<ApiResponse<{ ingredient: Ingredient }>> {
    return fetchApi.post<ApiResponse<{ ingredient: Ingredient }>>(
      this.basePath,
      dto
    );
  }

  /**
   * Get all ingredients for a restaurant with optional filters
   */
  async findAll(
    restaurantId: string,
    query?: QueryIngredientDto
  ): Promise<PaginatedResponse<Ingredient>> {
    const params = new URLSearchParams();

    if (query?.search) params.append("search", query.search);
    if (query?.status) params.append("status", query.status);
    if (query?.page) params.append("page", query.page);
    if (query?.limit) params.append("limit", query.limit);

    const url = `${
      this.basePath
    }/restaurant/${restaurantId}?${params.toString()}`;

    return fetchApi.get<PaginatedResponse<Ingredient>>(url);
  }

  /**
   * Get a single ingredient by ID
   */
  async findOne(
    restaurantId: string,
    id: string
  ): Promise<{ ingredient: Ingredient }> {
    return fetchApi.get<{ ingredient: Ingredient }>(
      `${this.basePath}/${restaurantId}/${id}`
    );
  }

  /**
   * Update an ingredient
   */
  async update(
    restaurantId: string,
    id: string,
    dto: UpdateIngredientDto
  ): Promise<ApiResponse<{ ingredient: Ingredient }>> {
    return fetchApi.put<ApiResponse<{ ingredient: Ingredient }>>(
      `${this.basePath}/${restaurantId}/${id}`,
      dto
    );
  }

  /**
   * Restock an ingredient
   */
  async restock(
    restaurantId: string,
    id: string,
    dto: RestockIngredientDto
  ): Promise<ApiResponse<{ ingredient: Ingredient }>> {
    return fetchApi.post<ApiResponse<{ ingredient: Ingredient }>>(
      `${this.basePath}/${restaurantId}/${id}/restock`,
      dto
    );
  }

  /**
   * Consume an ingredient
   */
  async consume(
    restaurantId: string,
    id: string,
    dto: ConsumeIngredientDto
  ): Promise<ApiResponse<{ ingredient: Ingredient }>> {
    return fetchApi.post<ApiResponse<{ ingredient: Ingredient }>>(
      `${this.basePath}/${restaurantId}/${id}/consume`,
      dto
    );
  }

  /**
   * Assign ingredients to a menu item (Bill of Materials)
   */
  async assignToMenuItem(
    restaurantId: string,
    menuItemId: string,
    dto: AssignIngredientsDto
  ): Promise<ApiResponse<{ assignments: any[] }>> {
    return fetchApi.post<ApiResponse<{ assignments: any[] }>>(
      `${this.basePath}/restaurant/${restaurantId}/menu-item/${menuItemId}/assign`,
      dto
    );
  }

  /**
   * Delete an ingredient
   */
  async delete(restaurantId: string, id: string): Promise<ApiResponse<void>> {
    return fetchApi.delete<ApiResponse<void>>(
      `${this.basePath}/${restaurantId}/${id}`
    );
  }
}

export const ingredientAPI = new IngredientAPI();

interface UseIngredientsOptions {
  restaurantId: string;
  autoLoad?: boolean;
  initialPage?: number;
  initialLimit?: number;
}

interface UseIngredientsReturn {
  // State
  ingredients: Ingredient[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  page: number;
  limit: number;

  // Actions
  loadIngredients: (query?: QueryIngredientDto) => Promise<void>;
  createIngredient: (
    dto: Omit<CreateIngredientDto, "restaurantId">
  ) => Promise<Ingredient>;
  updateIngredient: (
    id: string,
    dto: UpdateIngredientDto
  ) => Promise<Ingredient>;
  restockIngredient: (
    id: string,
    dto: RestockIngredientDto
  ) => Promise<Ingredient>;
  consumeIngredient: (
    id: string,
    dto: ConsumeIngredientDto
  ) => Promise<Ingredient>;
  assignToMenuItem: (
    menuItemId: string,
    dto: AssignIngredientsDto
  ) => Promise<any[]>;
  deleteIngredient: (id: string) => Promise<void>;
  getIngredient: (id: string) => Promise<Ingredient>;

  // Pagination
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;

  // Utility
  refresh: () => Promise<void>;
}

export function useIngredients({
  restaurantId,
  autoLoad = true,
  initialPage = 1,
  initialLimit = 50,
}: UseIngredientsOptions): UseIngredientsReturn {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [currentQuery, setCurrentQuery] = useState<QueryIngredientDto>({});

  /**
   * Load all ingredients with optional filters
   */
  const loadIngredients = useCallback(
    async (query?: QueryIngredientDto) => {
      if (!restaurantId) {
        console.warn("Restaurant ID is required to load ingredients");
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const queryToUse = query || currentQuery;
        setCurrentQuery(queryToUse);

        const response = await ingredientAPI.findAll(restaurantId, {
          ...queryToUse,
          page: queryToUse.page || page.toString(),
          limit: queryToUse.limit || limit.toString(),
        });

        setIngredients(response.ingredients);
        setTotalCount(response.totalCount);
        setPage(response.page);
        setLimit(response.limit);
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || "Failed to load ingredients";
        setError(errorMessage);
        console.error("Load ingredients error:", err);
      } finally {
        setLoading(false);
      }
    },
    [restaurantId, page, limit, currentQuery]
  );

  /**
   * Refresh current view
   */
  const refresh = useCallback(async () => {
    await loadIngredients(currentQuery);
  }, [loadIngredients, currentQuery]);

  /**
   * Create a new ingredient
   */
  const createIngredient = useCallback(
    async (
      dto: Omit<CreateIngredientDto, "restaurantId">
    ): Promise<Ingredient> => {
      if (!restaurantId) {
        throw new Error("Restaurant ID is required");
      }

      try {
        setLoading(true);
        const response = await ingredientAPI.create({
          ...dto,
          restaurantId,
        });

        const newIngredient = response.data.ingredient;
        setIngredients((prev) => [newIngredient, ...prev]);
        setTotalCount((prev) => prev + 1);

        toast.success(response.message || "Ingredient created successfully");
        return newIngredient;
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || "Failed to create ingredient";
        toast.error(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [restaurantId]
  );

  /**
   * Update an existing ingredient
   */
  const updateIngredient = useCallback(
    async (id: string, dto: UpdateIngredientDto): Promise<Ingredient> => {
      if (!restaurantId) {
        throw new Error("Restaurant ID is required");
      }

      try {
        setLoading(true);
        const response = await ingredientAPI.update(restaurantId, id, dto);

        const updatedIngredient = response.data.ingredient;
        setIngredients((prev) =>
          prev.map((ing) => (ing.id === id ? updatedIngredient : ing))
        );

        toast.success(response.message || "Ingredient updated successfully");
        return updatedIngredient;
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || "Failed to update ingredient";
        toast.error(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [restaurantId]
  );

  /**
   * Restock an ingredient
   */
  const restockIngredient = useCallback(
    async (id: string, dto: RestockIngredientDto): Promise<Ingredient> => {
      if (!restaurantId) {
        throw new Error("Restaurant ID is required");
      }

      try {
        setLoading(true);
        const response = await ingredientAPI.restock(restaurantId, id, dto);

        const updatedIngredient = response.data.ingredient;
        setIngredients((prev) =>
          prev.map((ing) => (ing.id === id ? updatedIngredient : ing))
        );

        toast.success(response.message || "Ingredient restocked successfully", {
          description: `+${dto.quantity} units`,
        });
        return updatedIngredient;
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || "Failed to restock ingredient";
        toast.error(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [restaurantId]
  );

  /**
   * Consume an ingredient
   */
  const consumeIngredient = useCallback(
    async (id: string, dto: ConsumeIngredientDto): Promise<Ingredient> => {
      if (!restaurantId) {
        throw new Error("Restaurant ID is required");
      }

      try {
        setLoading(true);
        const response = await ingredientAPI.consume(restaurantId, id, dto);

        const updatedIngredient = response.data.ingredient;
        setIngredients((prev) =>
          prev.map((ing) => (ing.id === id ? updatedIngredient : ing))
        );

        toast.success(response.message || "Ingredient consumed successfully", {
          description: `-${dto.quantity} units`,
        });
        return updatedIngredient;
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || "Failed to consume ingredient";
        toast.error(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [restaurantId]
  );

  /**
   * Assign ingredients to a menu item (Bill of Materials)
   */
  const assignToMenuItem = useCallback(
    async (menuItemId: string, dto: AssignIngredientsDto): Promise<any[]> => {
      if (!restaurantId) {
        throw new Error("Restaurant ID is required");
      }

      try {
        setLoading(true);
        const response = await ingredientAPI.assignToMenuItem(
          restaurantId,
          menuItemId,
          dto
        );

        // Reload ingredients to get updated assignments
        await loadIngredients(currentQuery);

        toast.success(
          response.message || "Bill of materials updated successfully"
        );
        return response.data.assignments;
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || "Failed to assign ingredients";
        toast.error(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [restaurantId, loadIngredients, currentQuery]
  );

  /**
   * Delete an ingredient
   */
  const deleteIngredient = useCallback(
    async (id: string): Promise<void> => {
      if (!restaurantId) {
        throw new Error("Restaurant ID is required");
      }

      try {
        setLoading(true);
        const response = await ingredientAPI.delete(restaurantId, id);

        setIngredients((prev) => prev.filter((ing) => ing.id !== id));
        setTotalCount((prev) => prev - 1);

        toast.success(response.message || "Ingredient deleted successfully");
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || "Failed to delete ingredient";
        toast.error(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [restaurantId]
  );

  /**
   * Get a single ingredient by ID
   */
  const getIngredient = useCallback(
    async (id: string): Promise<Ingredient> => {
      if (!restaurantId) {
        throw new Error("Restaurant ID is required");
      }

      try {
        setLoading(true);
        const response = await ingredientAPI.findOne(restaurantId, id);
        return response.ingredient;
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || "Failed to get ingredient";
        toast.error(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [restaurantId]
  );

  // Auto-load on mount if enabled
  useEffect(() => {
    if (autoLoad && restaurantId) {
      loadIngredients();
    }
  }, [autoLoad, restaurantId]); // Only run on mount

  // Reload when page or limit changes
  useEffect(() => {
    if (restaurantId && !autoLoad) {
      // Only reload if not auto-loading (to avoid double load)
      loadIngredients();
    }
  }, [page, limit]);

  return {
    // State
    ingredients,
    loading,
    error,
    totalCount,
    page,
    limit,

    // Actions
    loadIngredients,
    createIngredient,
    updateIngredient,
    restockIngredient,
    consumeIngredient,
    assignToMenuItem,
    deleteIngredient,
    getIngredient,

    // Pagination
    setPage,
    setLimit,

    // Utility
    refresh,
  };
}
