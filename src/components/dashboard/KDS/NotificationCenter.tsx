import { AnimatePresence, motion } from "framer-motion";
import { Bell, CheckCircle2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { Card } from "../../ui/card";

interface Notification {
  id: string;
  type: "new-order" | "order-ready";
  message: string;
  orderNumber: number;
}

interface Props {
  notifications: Notification[];
  onDismiss: (id: string) => void;
}

export function NotificationCenter({ notifications, onDismiss }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Play sound when new notification arrives
    if (notifications.length > 0) {
      // Create a simple beep sound using Web Audio API
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value =
        notifications[0].type === "new-order" ? 800 : 600;
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.5
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    }
  }, [notifications]);

  useEffect(() => {
    // Auto-dismiss notifications after 5 seconds
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        onDismiss(notifications[0].id);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notifications, onDismiss]);

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              className={`p-4 cursor-pointer shadow-lg ${
                notification.type === "new-order"
                  ? "bg-red-50 border-red-500 border-2"
                  : "bg-green-50 border-green-500 border-2"
              }`}
              onClick={() => onDismiss(notification.id)}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`p-2 rounded-full ${
                    notification.type === "new-order"
                      ? "bg-red-500"
                      : "bg-green-500"
                  }`}
                >
                  {notification.type === "new-order" ? (
                    <Bell className="h-5 w-5 text-white" />
                  ) : (
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <div
                    className={`${
                      notification.type === "new-order"
                        ? "text-red-900"
                        : "text-green-900"
                    }`}
                  >
                    {notification.type === "new-order"
                      ? "New Order"
                      : "Order Ready"}
                  </div>
                  <div
                    className={`text-sm ${
                      notification.type === "new-order"
                        ? "text-red-700"
                        : "text-green-700"
                    }`}
                  >
                    {notification.message}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
