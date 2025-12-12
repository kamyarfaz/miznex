import { create } from "zustand";
export interface AppNotification {
  id: string;
  type:
    | "order-removed"
    | "status-updated"
    | "order-completed"
    | "order-updated"
    | "new-order";
  message: string;
  title: string;
}

interface NotificationStore {
  notifications: AppNotification[];
  addNotification: (n: AppNotification, autoDismiss?: number) => void;
  removeNotification: (id: string) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],

  addNotification: (n, autoDismiss = 4000) =>
    set((state) => {
      // prevent duplicates by ID
      if (state.notifications.some((x) => x.id === n.id)) return state;

      const updated = { notifications: [...state.notifications, n] };

      // auto remove after X ms
      if (autoDismiss > 0) {
        setTimeout(() => {
          set((s) => ({
            notifications: s.notifications.filter((x) => x.id !== n.id),
          }));
        }, autoDismiss);
      }

      return updated;
    }),

  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}));
