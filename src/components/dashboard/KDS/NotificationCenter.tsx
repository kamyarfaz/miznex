"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Bell, CheckCircle2 } from "lucide-react";
import { useNotificationStore } from "@/store/notificationStore";

const notificationStyles = {
  "new-order": {
    bg: "bg-red-50 border-red-500",
    iconBg: "bg-red-500",
    titleColor: "text-red-900",
    messageColor: "text-red-700",
    Icon: Bell,
  },
  "order-updated": {
    bg: "bg-blue-50 border-blue-500",
    iconBg: "bg-blue-500",
    titleColor: "text-blue-900",
    messageColor: "text-blue-700",
    Icon: Bell,
  },
  "order-completed": {
    bg: "bg-green-50 border-green-500",
    iconBg: "bg-green-500",
    titleColor: "text-green-900",
    messageColor: "text-green-700",
    Icon: CheckCircle2,
  },
  "status-updated": {
    bg: "bg-yellow-50 border-yellow-500",
    iconBg: "bg-yellow-500",
    titleColor: "text-yellow-900",
    messageColor: "text-yellow-700",
    Icon: Bell,
  },
  "order-removed": {
    bg: "bg-gray-50 border-gray-500",
    iconBg: "bg-gray-600",
    titleColor: "text-gray-900",
    messageColor: "text-gray-700",
    Icon: Bell,
  },
};

export function NotificationCenter() {
  const notifications = useNotificationStore((s) => s.notifications);
  const remove = useNotificationStore((s) => s.removeNotification);

  return (
    <div className="fixed top-4 right-4 z-100 space-y-2 max-w-sm">
      <AnimatePresence>
        {notifications.map((n) => {
          const style =
            notificationStyles[n.type] ?? notificationStyles["new-order"];
          const IconComponent = style.Icon;

          return (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 100, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                onClick={() => remove(n.id)}
                className={`p-4 cursor-pointer shadow-lg border-2 ${style.bg}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full ${style.iconBg}`}>
                    <IconComponent className="h-5 w-5 text-white" />
                  </div>

                  <div className="flex-1">
                    <div className={style.titleColor}>{n.title}</div>
                    <div className={`text-sm ${style.messageColor}`}>
                      {n.message}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
