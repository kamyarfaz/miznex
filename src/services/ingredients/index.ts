import { fetchApi } from "@/hooks/api/useAuthToken";

import {
  Ingredient,
  CreateIngredientDto,
  UpdateIngredientDto,
  RestockIngredientDto,
  ConsumeIngredientDto,
  AssignIngredientsDto,
  QueryIngredientDto,
  ApiResponse,
  PaginatedResponse,
} from "@/types/index";

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

    const queryString = params.toString();
    const url = `${this.basePath}/restaurant/${restaurantId}${
      queryString ? `?${queryString}` : ""
    }`;

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
