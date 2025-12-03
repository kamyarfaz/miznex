import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { OrderKDS, OrderStatusKDS } from '@/types';

interface Props {
  orders: OrderKDS[];
  onMarkDelivered: (orderId: string) => void;
}

const statusColors: Record<OrderStatusKDS, string> = {
  'new': 'bg-blue-500 text-white',
  'in-progress': 'bg-yellow-500 text-black',
  'ready': 'bg-green-500 text-white',
  'completed': 'bg-gray-400 text-white',
};

function getElapsedTime(createdAt: Date): string {
  const now = new Date();
  const elapsed = Math.floor((now.getTime() - createdAt.getTime()) / 1000 / 60);
  return `${elapsed}m`;
}

export function WaiterDisplay({ orders, onMarkDelivered }: Props) {
  const readyOrders = orders.filter(o => o.status === 'ready');
  const inProgressOrders = orders.filter(o => o.status === 'in-progress' || o.status === 'new');

  return (
    <div className="h-full p-6 overflow-auto">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Ready Orders - Priority */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="h-6 w-6 text-green-600" />
            <h2 className="text-green-600">Ready for Pickup ({readyOrders.length})</h2>
          </div>
          
          <AnimatePresence mode="popLayout">
            {readyOrders.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center text-muted-foreground">
                  No orders ready for pickup
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {readyOrders.map(order => (
                  <motion.div
                    key={order.id}
                    layout
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="relative"
                  >
                    <motion.div
                      animate={{
                        boxShadow: [
                          '0 0 0 0 rgba(34, 197, 94, 0)',
                          '0 0 0 10px rgba(34, 197, 94, 0.1)',
                          '0 0 0 0 rgba(34, 197, 94, 0)',
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="rounded-lg"
                    >
                      <Card className="border-2 border-green-500">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle>Order #{order.orderNumber}</CardTitle>
                            <Badge className={statusColors[order.status]}>
                              READY
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>Table {order.tableNumber}</span>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {getElapsedTime(order.createdAt)}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 mb-4">
                            {order.items.map(item => (
                              <div key={item.id} className="flex items-center gap-2 text-sm">
                                <span className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded">
                                  {item.quantity}
                                </span>
                                <span>{item.name}</span>
                              </div>
                            ))}
                          </div>
                          <Button
                            className="w-full bg-green-600 hover:bg-green-700"
                            onClick={() => onMarkDelivered(order.id)}
                          >
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Mark as Delivered
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* In Progress Orders */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-6 w-6 text-yellow-600" />
            <h2 className="text-yellow-600">In Progress ({inProgressOrders.length})</h2>
          </div>
          
          {inProgressOrders.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                No orders in progress
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {inProgressOrders.map(order => (
                <Card key={order.id} className="border-yellow-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <span>#{order.orderNumber}</span>
                      <Badge className={statusColors[order.status]}>
                        {order.status === 'new' ? 'NEW' : 'COOKING'}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Table {order.tableNumber}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      {order.items.slice(0, 3).map(item => (
                        <div key={item.id} className="text-sm flex items-center gap-2">
                          <span className="w-5 h-5 flex items-center justify-center bg-gray-100 rounded text-xs">
                            {item.quantity}
                          </span>
                          <span className="truncate">{item.name}</span>
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <div className="text-xs text-muted-foreground">
                          +{order.items.length - 3} more items
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
