import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/utils/utils";
import type { OrderKDS } from "@/types";
import {
  AlertCircle,
  BarChart3,
  CheckCircle2,
  ChefHat,
  Clock,
  DollarSign,
  Package,
  Table as TableIcon,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { useMemo } from "react";

interface Props {
  orders: OrderKDS[];
}

export function AdminDashboard({ orders }: Props) {
  const stats = useMemo(() => {
    const completedOrders = orders.filter((o) => o.status === "delivered");
    const pendingOrders = orders.filter((o) => o.status === "pending");
    const processingOrders = orders.filter((o) => o.status === "processing");
    const readyOrders = orders.filter((o) => o.status === "done");

    // Calculate average preparation time for completed orders only
    const avgPrepTime =
      completedOrders.length > 0
        ? completedOrders.reduce((sum, order) => {
            const prepTime =
              (new Date(order.updatedAt).getTime() -
                new Date(order.createdAt).getTime()) /
              1000 /
              60;
            return sum + prepTime;
          }, 0) / completedOrders.length
        : 0;

    // Orders per hour based on last 8 hours
    const today = new Date();
    const eightHoursAgo = new Date(today.getTime() - 8 * 60 * 60 * 1000);
    const recentOrders = orders.filter(
      (o) => new Date(o.createdAt) > eightHoursAgo
    );
    const ordersPerHour = recentOrders.length > 0 ? (recentOrders.length / 8).toFixed(1) : "0";

    // Category breakdown
    const categoryStats = orders.reduce((acc, order) => {
      order.items.forEach((item) => {
        const category = item.category || "uncategorized";
        acc[category] = (acc[category] || 0) + item.quantity;
      });
      return acc;
    }, {} as Record<string, number>);

    // Table performance
    const tableStats = orders.reduce((acc, order) => {
      acc[order.tableNumber] = (acc[order.tableNumber] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Recent orders (last 8)
    const recentOrdersList = [...orders]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 8);

    // Efficiency score (mock calculation)
    const efficiencyScore = completedOrders.length > 0
      ? Math.min(100, Math.max(60, 100 - (avgPrepTime - 15) * 2))
      : 0;

    return {
      totalOrders: orders.length,
      completedOrders: completedOrders.length,
      pendingOrders: pendingOrders.length,
      processingOrders: processingOrders.length,
      readyOrders: readyOrders.length,
      avgPrepTime,
      ordersPerHour,
      efficiencyScore,
      categoryStats,
      tableStats,
      recentOrders: recentOrdersList,
    };
  }, [orders]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered": return "bg-emerald-500";
      case "done": return "bg-emerald-400";
      case "processing": return "bg-amber-500";
      case "pending": return "bg-rose-500";
      default: return "bg-gray-500";
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      grill: "bg-orange-500",
      salad: "bg-green-500",
      drinks: "bg-blue-500",
      dessert: "bg-pink-500",
      appetizer: "bg-purple-500",
      default: "bg-gray-500",
    };
    return colors[category?.toLowerCase()] || colors.default;
  };

  return (
    <div className="h-full p-4 md:p-6 overflow-auto bg-slate-50">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100">
              <BarChart3 className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Kitchen Dashboard</h1>
              <p className="text-sm text-slate-500">
                Real-time analytics and performance metrics
              </p>
            </div>
          </div>
          
          {/* Quick stats */}
          <div className="flex items-center gap-6 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span>
                <span className="font-semibold">{orders.length}</span> total orders
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-3 w-3" />
              <span>
                <span className="font-semibold">{stats.ordersPerHour}</span> orders/hour
              </span>
            </div>
            <div className="flex items-center gap-2">
              <TableIcon className="h-3 w-3" />
              <span>
                <span className="font-semibold">{Object.keys(stats.tableStats).length}</span> active tables
              </span>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Orders */}
          <Card className="relative overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Total Orders</p>
                  <h3 className="text-3xl font-bold text-slate-900 mt-2">
                    {stats.totalOrders}
                  </h3>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm text-emerald-600 font-medium">
                      {stats.ordersPerHour}/hour
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-full bg-blue-100">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Orders */}
          <Card className="relative overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Active Orders</p>
                  <h3 className="text-3xl font-bold text-slate-900 mt-2">
                    {stats.pendingOrders + stats.processingOrders}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-rose-500" />
                      <span className="text-slate-600">{stats.pendingOrders} pending</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-amber-500" />
                      <span className="text-slate-600">{stats.processingOrders} cooking</span>
                    </div>
                  </div>
                </div>
                <div className="p-3 rounded-full bg-amber-100">
                  <ChefHat className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Completed Orders */}
          <Card className="relative overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Completed</p>
                  <h3 className="text-3xl font-bold text-slate-900 mt-2">
                    {stats.completedOrders}
                  </h3>
                  <div className="flex items-center gap-1 mt-1">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm text-emerald-600 font-medium">
                      {stats.readyOrders} ready for pickup
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-full bg-emerald-100">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Avg Prep Time */}
          <Card className="relative overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Avg Prep Time</p>
                  <h3 className="text-3xl font-bold text-slate-900 mt-2">
                    {stats.avgPrepTime.toFixed(1)}m
                  </h3>
                  <div className="flex items-center gap-1 mt-1">
                    {stats.avgPrepTime > 20 ? (
                      <>
                        <TrendingDown className="h-4 w-4 text-rose-500" />
                        <span className="text-sm text-rose-600 font-medium">
                          Needs attention
                        </span>
                      </>
                    ) : (
                      <>
                        <TrendingUp className="h-4 w-4 text-emerald-500" />
                        <span className="text-sm text-emerald-600 font-medium">
                          On target
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="p-3 rounded-full bg-purple-100">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Second Row - Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category Performance */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Category Performance</h3>
                <Package className="h-5 w-5 text-slate-400" />
              </div>
              
              <div className="space-y-4">
                {Object.entries(stats.categoryStats)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 5)
                  .map(([category, count]) => {
                    const total = Object.values(stats.categoryStats).reduce(
                      (a, b) => a + b,
                      0
                    );
                    const percentage = total > 0 ? ((count / total) * 100).toFixed(1) : "0";

                    return (
                      <div key={category} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div 
                              className={cn(
                                "h-3 w-3 rounded-full",
                                getCategoryColor(category)
                              )} 
                            />
                            <span className="text-sm font-medium text-slate-700 capitalize">
                              {category}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-semibold text-slate-900">{count}</span>
                            <span className="text-xs text-slate-500 ml-2">({percentage}%)</span>
                          </div>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                          <div
                            className={cn(
                              "h-2 rounded-full transition-all",
                              getCategoryColor(category)
                            )}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>

              {Object.keys(stats.categoryStats).length === 0 && (
                <div className="text-center py-8 text-slate-500">
                  <Package className="h-12 w-12 mx-auto mb-2 text-slate-300" />
                  <p>No category data available</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Top Tables */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Top Tables</h3>
                <Users className="h-5 w-5 text-slate-400" />
              </div>
              
              <div className="space-y-3">
                {Object.entries(stats.tableStats)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 5)
                  .map(([table, orderCount]) => (
                    <div key={table} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                          <TableIcon className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">Table {table}</div>
                          <div className="text-xs text-slate-500">{orderCount} orders</div>
                        </div>
                      </div>
                      <Badge variant="secondary" className="font-semibold">
                        #{Object.keys(stats.tableStats).indexOf(table) + 1}
                      </Badge>
                    </div>
                  ))}
              </div>

              {Object.keys(stats.tableStats).length === 0 && (
                <div className="text-center py-8 text-slate-500">
                  <Users className="h-12 w-12 mx-auto mb-2 text-slate-300" />
                  <p>No table data available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card>
          <CardContent className="p-0">
            <div className="p-5 border-b">
              <h3 className="text-lg font-semibold text-slate-900">Recent Orders</h3>
              <p className="text-sm text-slate-500 mt-1">Latest 8 orders in the system</p>
            </div>
            
            <div className="overflow-x-auto">
              <div className="min-w-full">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-5 py-3 bg-slate-50 text-sm font-medium text-slate-500 border-b">
                  <div className="col-span-2">Order #</div>
                  <div className="col-span-2">Table</div>
                  <div className="col-span-2">Waiter</div>
                  <div className="col-span-2">Items</div>
                  <div className="col-span-2">Time</div>
                  <div className="col-span-2">Status</div>
                </div>

                {/* Table Rows */}
                <div className="divide-y">
                  {stats.recentOrders.map((order) => {
                    const prepTime = Math.floor(
                      (new Date(order.updatedAt).getTime() -
                        new Date(order.createdAt).getTime()) /
                        1000 /
                        60
                    );

                    return (
                      <div key={order.id} className="grid grid-cols-12 gap-4 px-5 py-3 hover:bg-slate-50 transition-colors">
                        <div className="col-span-2">
                          <div className="font-semibold text-slate-900">#{order.orderNumber}</div>
                        </div>
                        <div className="col-span-2">
                          <Badge variant="outline" className="font-normal">
                            Table {order.tableNumber}
                          </Badge>
                        </div>
                        <div className="col-span-2 text-sm text-slate-700">
                          {order.waiterName || "Guest"}
                        </div>
                        <div className="col-span-2">
                          <div className="text-sm font-medium text-slate-900">
                            {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                          </div>
                        </div>
                        <div className="col-span-2">
                          <div className="flex items-center gap-2 text-sm text-slate-700">
                            <Clock className="h-3 w-3" />
                            {prepTime > 0 ? `${prepTime}m` : "<1m"}
                          </div>
                        </div>
                        <div className="col-span-2">
                          <Badge className={cn("text-white", getStatusColor(order.status))}>
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {stats.recentOrders.length === 0 && (
              <div className="text-center py-12 text-slate-500">
                <AlertCircle className="h-12 w-12 mx-auto mb-2 text-slate-300" />
                <p>No recent orders</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}