import { useState, useEffect } from 'react';
import { MenuItem } from '.';
import { X } from 'lucide-react';

interface BatchEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: MenuItem[];
  onSave: (updates: Record<string, number>) => void;
  onClearSelection: () => void;
}

export function BatchEditModal({
  isOpen,
  onClose,
  items,
  onSave,
  onClearSelection,
}: BatchEditModalProps) {
  const [quantities, setQuantities] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      const initialQuantities: Record<string, string> = {};
      items.forEach(item => {
        initialQuantities[item.id] = item.quantity.toString();
      });
      setQuantities(initialQuantities);
    }
  }, [isOpen, items]);

  const handleQuantityChange = (id: string, value: string) => {
    if (value === '' || /^\d+$/.test(value)) {
      setQuantities(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleSave = () => {
    const updates: Record<string, number> = {};
    Object.entries(quantities).forEach(([id, value]) => {
      const numValue = parseInt(value, 10);
      if (!isNaN(numValue) && numValue >= 0) {
        updates[id] = numValue;
      }
    });
    onSave(updates);
    onClearSelection();
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  if (!isOpen) return null;

  const itemsText = items.length > 1 ? 'selected items' : 'selected item';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-20 transition-opacity"
        onClick={handleCancel}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <div>
              <h2 className="text-gray-900">Batch Edit Quantities</h2>
              <p className="text-sm text-gray-500 mt-1">
                Update quantities for {items.length} {itemsText}
              </p>
            </div>
            <button
              onClick={handleCancel}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <div className="space-y-4">
              {items.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex-1">
                      <div className="text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-500">{item.category}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500">Current: {item.quantity}</span>
                      <input
                        type="text"
                        value={quantities[item.id] || ''}
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                        className="w-24 px-3 py-2 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="New qty"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
