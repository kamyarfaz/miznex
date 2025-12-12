import { Ingredient } from "@/types";
import { X, Clock } from "lucide-react";

interface AuditHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  ingredient: Ingredient | null;
}

export function AuditHistoryModal({
  isOpen,
  onClose,
  ingredient,
}: AuditHistoryModalProps) {
  if (!isOpen || !ingredient) return null;

  const sortedHistory = [...ingredient.auditHistory].sort(
    (a, b) => b.timestamp - a.timestamp
  );

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getActionLabel = (action: string) => {
    const actionLabels: Record<string, string> = {
      created: "Created",
      updated: "Updated",
      restocked: "Restocked",
      consumed: "Consumed",
      assigned: "Assigned",
      unassigned: "Unassigned",
    };
    return actionLabels[action] || action;
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case "created":
        return "bg-blue-100 text-blue-800";
      case "updated":
        return "bg-purple-100 text-purple-800";
      case "restocked":
        return "bg-green-100 text-green-800";
      case "consumed":
        return "bg-orange-100 text-orange-800";
      case "assigned":
        return "bg-indigo-100 text-indigo-800";
      case "unassigned":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-20 transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <div>
              <h2 className="text-gray-900">Audit History</h2>
              <p className="text-sm text-gray-500 mt-1">{ingredient.name}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {sortedHistory.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No audit history available
              </div>
            ) : (
              <div className="space-y-4">
                {sortedHistory.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      <Clock className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs ${getActionColor(
                            entry.action
                          )}`}
                        >
                          {getActionLabel(entry.action)}
                        </span>
                        <span className="text-sm text-gray-500">
                          {formatTimestamp(entry.timestamp)}
                        </span>
                      </div>
                      <p className="text-gray-900 text-sm">{entry.changes}</p>
                      {entry.previousValue !== undefined &&
                        entry.newValue !== undefined && (
                          <div className="flex items-center gap-2 mt-2 text-xs text-gray-600">
                            <span className="px-2 py-0.5 bg-gray-200 rounded">
                              {entry.previousValue}
                            </span>
                            <span>→</span>
                            <span className="px-2 py-0.5 bg-gray-200 rounded">
                              {entry.newValue}
                            </span>
                          </div>
                        )}
                      <p className="text-xs text-gray-500 mt-1">
                        User: {entry.user}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
