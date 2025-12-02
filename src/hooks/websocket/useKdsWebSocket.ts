import { useEffect, useRef, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import type { OrderKDS, OrderStatusKDS } from '@/types';

interface OrdersUpdateEvent {
  orders: OrderKDS[];
  action: 'add' | 'update' | 'remove';
  timestamp: number;
}

interface NotificationEvent {
  type: 'new-order' | 'order-ready' | 'warning' | 'offline';
  title: string;
  message: string;
  orderId: string;
  timestamp: number;
}

interface UseKdsWebSocketOptions {
  token: string;
  section?: string;
  restaurantId?: string;
  autoConnect?: boolean;
}

export function useKdsWebSocket({
  token,
  section,
  restaurantId,
  autoConnect = true,
}: UseKdsWebSocketOptions) {
  const [connected, setConnected] = useState(false);
  const [orders, setOrders] = useState<OrderKDS[]>([]);
  const [notifications, setNotifications] = useState<NotificationEvent[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!autoConnect || !token) return;

    const socket = io('http://localhost:3000/kds', {
      auth: { token },
      transports: ['websocket', 'polling'],
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('✅ Connected to KDS Gateway');
      setConnected(true);
    });

    socket.on('connected', (data) => {
      console.log('Connection confirmed:', data);
      
      if (section || restaurantId) {
        socket.emit('joinSection', { section, restaurantId });
      }
    });

    socket.on('disconnect', () => {
      console.log('❌ Disconnected from KDS Gateway');
      setConnected(false);
    });

    socket.on('ordersUpdate', (data: OrdersUpdateEvent) => {
      console.log('📦 Orders update:', data.action, data.orders);
      
      setOrders((prev) => {
        if (data.action === 'add') {
          return [...data.orders, ...prev];
        }
        
        if (data.action === 'update') {
          return prev.map((order) => {
            const updated = data.orders.find((o) => o.id === order.id);
            return updated || order;
          });
        }
        
        if (data.action === 'remove') {
          const removedIds = data.orders.map((o) => o.id);
          return prev.filter((order) => !removedIds.includes(order.id));
        }
        
        return prev;
      });
    });

    socket.on('statusUpdate', (data: { orderId: string; status: string; timestamp: number }) => {
      console.log('🔄 Status update:', data);
      
      setOrders((prev) =>
        prev.map((order) =>
          order.id === data.orderId
            ? { ...order, status: data.status as OrderStatusKDS, updatedAt: new Date(data.timestamp) }
            : order
        )
      );
    });

    socket.on('notification', (data: NotificationEvent) => {
      console.log('🔔 Notification:', data);
      setNotifications((prev) => [...prev, data]);
      
      // Auto-dismiss after 5 seconds
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.timestamp !== data.timestamp));
      }, 5000);
    });

    socket.on('error', (error) => {
      console.error('❌ Socket error:', error);
    });

    return () => {
      socket.disconnect();
    };
  }, [token, section, restaurantId, autoConnect]);

  const updateOrderStatus = useCallback(async (orderId: string, status: OrderStatusKDS) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/kds/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      const result = await response.json();
      console.log('✅ Status updated:', result);
    } catch (error) {
      console.error('❌ Failed to update status:', error);
      throw error;
    }
  }, [token]);

  const updateItemStatus = useCallback(async (
    orderId: string,
    itemId: string,
    status: OrderStatusKDS
  ) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/kds/orders/${orderId}/items/${itemId}/status`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update item status');
      }

      const result = await response.json();
      console.log('✅ Item status updated:', result);
    } catch (error) {
      console.error('❌ Failed to update item status:', error);
      throw error;
    }
  }, [token]);

  const fetchOrders = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (section) params.append('kitchenSection', section);
      if (restaurantId) params.append('restaurantId', restaurantId);

      const response = await fetch(
        `http://localhost:3000/api/v1/kds/orders?${params.toString()}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const result = await response.json();
      setOrders(result.data.orders);
    } catch (error) {
      console.error('❌ Failed to fetch orders:', error);
    }
  }, [token, section, restaurantId]);

  const dismissNotification = useCallback((timestamp: number) => {
    setNotifications((prev) => prev.filter((n) => n.timestamp !== timestamp));
  }, []);

  return {
    connected,
    orders,
    notifications,
    updateOrderStatus,
    updateItemStatus,
    fetchOrders,
    dismissNotification,
  };
}