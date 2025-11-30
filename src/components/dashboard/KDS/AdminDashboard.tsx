import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Clock, TrendingUp, CheckCircle2, ChefHat, DollarSign } from 'lucide-react';
import type { OrderKDS } from '@/types';

interface Props {
  orders: OrderKDS[];
}

export function AdminDashboard({ orders }: Props) {
  const stats = useMemo(() => {
    const completedOrders = orders.filter(o => o.status === 'completed');
    const activeOrders = orders.filter(o => o.status !== 'completed');
    
    // Calculate average preparation time
    const avgPrepTime = completedOrders.length > 0
      ? completedOrders.reduce((sum, order) => {
          const prepTime = (order.updatedAt.getTime() - order.createdAt.getTime()) / 1000 / 60;
          return sum + prepTime;
        }, 0) / completedOrders.length
      : 0;

    // Orders per hour (mock calculation)
    const ordersPerHour = orders.length > 0 ? (orders.length / 8).toFixed(1) : '0';

    // Category breakdown
    const categoryStats = orders.reduce((acc, order) => {
      order.items.forEach(item => {
        acc[item.category] = (acc[item.category] || 0) + item.quantity;
      });
      return acc;
    }, {} as Record<string, number>);

    // Recent orders
    const recentOrders = [...orders]
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 10);

    return {
      totalOrders: orders.length,
      completedOrders: completedOrders.length,
      activeOrders: activeOrders.length,
      avgPrepTime,
      ordersPerHour,
      categoryStats,
      recentOrders,
    };
  }, [orders]);

  return (
    <div className="p-6 overflow-auto h-full">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1>Kitchen Performance Dashboard</h1>
          <p className="text-muted-foreground">Real-time analytics and order statistics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Total Orders Today</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{stats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">
                {stats.ordersPerHour} orders/hour
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Active Orders</CardTitle>
              <ChefHat className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{stats.activeOrders}</div>
              <p className="text-xs text-muted-foreground">
                Currently in kitchen
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Completed Orders</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{stats.completedOrders}</div>
              <p className="text-xs text-muted-foreground">
                Successfully delivered
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Avg Prep Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{stats.avgPrepTime.toFixed(1)}m</div>
              <p className="text-xs text-muted-foreground">
                Per order completion
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Category Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Category Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(stats.categoryStats)
                  .sort(([, a], [, b]) => b - a)
                  .map(([category, count]) => {
                    const total = Object.values(stats.categoryStats).reduce((a, b) => a + b, 0);
                    const percentage = ((count / total) * 100).toFixed(1);
                    
                    return (
                      <div key={category} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="capitalize">{category}</span>
                          <span className="text-muted-foreground">{count} items ({percentage}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-8 w-8 text-green-600" />
                    <div>
                      <div className="text-sm">Efficiency Score</div>
                      <div className="text-2xl text-green-600">92%</div>
                    </div>
                  </div>
                  <Badge className="bg-green-600">+5%</Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>On-time delivery rate</span>
                    <span>87%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '87%' }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Order accuracy</span>
                    <span>96%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '96%' }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Customer satisfaction</span>
                    <span>94%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '94%' }} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order #</TableHead>
                  <TableHead>Table</TableHead>
                  <TableHead>Waiter</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.recentOrders.map(order => {
                  const prepTime = Math.floor((order.updatedAt.getTime() - order.createdAt.getTime()) / 1000 / 60);
                  
                  return (
                    <TableRow key={order.id}>
                      <TableCell>#{order.orderNumber}</TableCell>
                      <TableCell>{order.tableNumber}</TableCell>
                      <TableCell>{order.waiterName}</TableCell>
                      <TableCell>{order.items.reduce((sum, item) => sum + item.quantity, 0)} items</TableCell>
                      <TableCell>{prepTime > 0 ? `${prepTime}m` : '<1m'}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            order.status === 'completed' ? 'bg-green-600' :
                            order.status === 'ready' ? 'bg-green-500' :
                            order.status === 'in-progress' ? 'bg-yellow-500 text-black' :
                            'bg-red-500'
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
