import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

import { fetchApi } from "@/hooks/api/useAuthToken";

export interface MenuItemImage {
  id: string;
  imageUrl: string;
}

export interface MenuItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  category: {
    id: string;
    title: string;
  };
  images: MenuItemImage[];
  isFav?: boolean | null;
}

export interface MenuItemsResponse {
  data: {
    items: MenuItem[];
    totalCount: number;
    page: number;
    limit: number;
    maxPage: number;
  };
}

export interface UpdateMenuQuantityDto {
  quantity: number;
}

class MenuAPI {
  private basePath = "http://localhost:3000/api/v1/menu";

  /**
   * Get all menu items for a restaurant
   */
  async findAllByRestaurant(
    restaurantId: string,
    page: number = 1,
    limit: number = 100
  ): Promise<MenuItemsResponse> {
    return fetchApi.get<MenuItemsResponse>(
      `${this.basePath}/restaurant/${restaurantId}?page=${page}&limit=${limit}`
    );
  }

  /**
   * Get a single menu item
   */
  async findOne(id: string): Promise<{ item: MenuItem }> {
    const response = await fetchApi.get<{ item: MenuItem }>(
      `${this.basePath}/${id}`
    );
    return response.data;
  }

  /**
   * Update menu item quantity
   */
  async updateQuantity(
    id: string,
    quantity: number
  ): Promise<{ message: string; data: { item: MenuItem } }> {
    return fetchApi.put<{
      message: string;
      data: { item: MenuItem };
    }>(`${this.basePath}/${id}`, { quantity });
  }
}

export const menuAPI = new MenuAPI();

interface UseMenuOptions {
  restaurantId: string;
  autoLoad?: boolean;
}

interface UseMenuReturn {
  // State
  menuItems: MenuItem[];
  loading: boolean;
  error: string | null;
  totalCount: number;

  // Actions
  loadMenuItems: () => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<MenuItem>;
  getMenuItem: (id: string) => Promise<MenuItem>;

  // Utility
  refresh: () => Promise<void>;
}

export function useMenu({
  restaurantId,
  autoLoad = true,
}: UseMenuOptions): UseMenuReturn {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  /**
   * Load all menu items for the restaurant
   */
  const loadMenuItems = useCallback(async () => {
    if (!restaurantId) {
      console.warn("Restaurant ID is required to load menu items");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await menuAPI.findAllByRestaurant(restaurantId, 1, 100);
      setMenuItems(response.data.items);
      setTotalCount(response.data.totalCount);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to load menu items";
      setError(errorMessage);
      console.error("Load menu items error:", err);
    } finally {
      setLoading(false);
    }
  }, [restaurantId]);

  /**
   * Refresh current view
   */
  const refresh = useCallback(async () => {
    await loadMenuItems();
  }, [loadMenuItems]);

  /**
   * Update menu item quantity
   */
  const updateQuantity = useCallback(
    async (id: string, quantity: number): Promise<MenuItem> => {
      try {
        setLoading(true);
        const response = await menuAPI.updateQuantity(id, quantity);

        const updatedItem = response.data.item;
        setMenuItems((prev) =>
          prev.map((item) => (item.id === id ? updatedItem : item))
        );

        toast.success("Quantity updated successfully", {
          description: `Updated to ${quantity} units`,
        });

        return updatedItem;
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || "Failed to update quantity";
        toast.error(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /**
   * Get a single menu item
   */
  const getMenuItem = useCallback(async (id: string): Promise<MenuItem> => {
    try {
      setLoading(true);
      const response = await menuAPI.findOne(id);
      return response.item;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to get menu item";
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-load on mount if enabled
  useEffect(() => {
    if (autoLoad && restaurantId) {
      loadMenuItems();
    }
  }, [autoLoad, restaurantId, loadMenuItems]);

  return {
    // State
    menuItems,
    loading,
    error,
    totalCount,

    // Actions
    loadMenuItems,
    updateQuantity,
    getMenuItem,

    // Utility
    refresh,
  };
}
