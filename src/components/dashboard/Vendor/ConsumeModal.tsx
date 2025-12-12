import { useState, useEffect } from "react";
import { Ingredient } from "@/types";
import { X } from "lucide-react";

interface ConsumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  ingredient: Ingredient | null;
  onConfirm: (quantity: number, reason: string) => void;
}

export function ConsumeModal({
  isOpen,
  onClose,
  ingredient,
  onConfirm,
}: ConsumeModalProps) {
  const [quantity, setQuantity] = useState<string>("");
  const [reason, setReason] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      setQuantity("");
      setReason("");
    }
  }, [isOpen]);

  const handleConfirm = () => {
    const qty = parseFloat(quantity);
    if (!isNaN(qty) && qty > 0 && reason.trim()) {
      onConfirm(qty, reason);
      onClose();
    }
  };

  if (!isOpen || !ingredient) return null;

  const newStock = ingredient.stockQuantity - (parseFloat(quantity) || 0);
  const isExceedingStock = newStock < 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-20 transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <div>
              <h2 className="text-gray-900">Consume Ingredient</h2>
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
          <div className="px-6 py-4 space-y-4">
            {/* Current Stock Info */}
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Current Stock:</span>
                <span className="text-gray-900">
                  {ingredient.stockQuantity} {ingredient.unit}
                </span>
              </div>
            </div>

            {/* Quantity Input */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Consume Quantity ({ingredient.unit}){" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="0.00"
                autoFocus
              />
            </div>

            {/* Reason */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Reason <span className="text-red-500">*</span>
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="e.g., Manual usage, Spoilage, Testing..."
              />
            </div>

            {/* Preview */}
            {quantity && parseFloat(quantity) > 0 && (
              <div
                className={`p-3 border rounded-lg ${
                  isExceedingStock
                    ? "bg-red-50 border-red-200"
                    : "bg-orange-50 border-orange-200"
                }`}
              >
                <div className="flex items-center justify-between text-sm">
                  <span
                    className={
                      isExceedingStock ? "text-red-700" : "text-orange-700"
                    }
                  >
                    New stock will be:
                  </span>
                  <span
                    className={
                      isExceedingStock ? "text-red-900" : "text-orange-900"
                    }
                  >
                    {Math.max(0, newStock).toFixed(2)} {ingredient.unit}
                  </span>
                </div>
                {isExceedingStock && (
                  <p className="text-xs text-red-600 mt-1">
                    Warning: Consuming more than available stock
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={
                !quantity || parseFloat(quantity) <= 0 || !reason.trim()
              }
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Confirm Consume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
