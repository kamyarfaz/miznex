import { useState, useEffect } from 'react';
import { Ingredient, Unit, Supplier } from '@/types';
import { X, Plus, Trash2 } from 'lucide-react';

interface IngredientFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  ingredient: Ingredient | null;
  onSave: (ingredient: Ingredient) => void;
}

const UNITS: Unit[] = ['g', 'kg', 'ml', 'L', 'piece', 'pack'];

const UNIT_LABELS: Record<Unit, string> = {
  'g': 'Grams (g)',
  'kg': 'Kilograms (kg)',
  'ml': 'Milliliters (ml)',
  'L': 'Liters (L)',
  'piece': 'Piece',
  'pack': 'Pack'
};

export function IngredientFormModal({
  isOpen,
  onClose,
  ingredient,
  onSave,
}: IngredientFormModalProps) {
  const [formData, setFormData] = useState<Partial<Ingredient>>({
    name: '',
    sku: '',
    unit: 'kg',
    stockQuantity: 0,
    minThreshold: 0,
    costPerUnit: 0,
    suppliers: [],
    assignedItems: [],
    auditHistory: [],
    isActive: true,
    isSharedAcrossItems: false,
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      if (ingredient) {
        setFormData(ingredient);
      } else {
        setFormData({
          name: '',
          sku: '',
          unit: 'kg',
          stockQuantity: 0,
          minThreshold: 0,
          costPerUnit: 0,
          suppliers: [],
          assignedItems: [],
          auditHistory: [],
          isActive: true,
          isSharedAcrossItems: false,
          notes: '',
        });
      }
      setErrors({});
    }
  }, [isOpen, ingredient]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) {
      newErrors.name = 'Name is required';
    }
    if (formData.stockQuantity === undefined || formData.stockQuantity < 0) {
      newErrors.stockQuantity = 'Stock quantity must be 0 or greater';
    }
    if (formData.minThreshold === undefined || formData.minThreshold < 0) {
      newErrors.minThreshold = 'Minimum threshold must be 0 or greater';
    }
    if (formData.costPerUnit === undefined || formData.costPerUnit < 0) {
      newErrors.costPerUnit = 'Cost per unit must be 0 or greater';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSave(formData as Ingredient);
    }
  };

  const addSupplier = () => {
    setFormData({
      ...formData,
      suppliers: [
        ...(formData.suppliers || []),
        { id: `s-${Date.now()}`, name: '', leadTimeDays: 1, contact: '' },
      ],
    });
  };

  const updateSupplier = (index: number, field: keyof Supplier, value: string | number) => {
    const newSuppliers = [...(formData.suppliers || [])];
    newSuppliers[index] = { ...newSuppliers[index], [field]: value };
    setFormData({ ...formData, suppliers: newSuppliers });
  };

  const removeSupplier = (index: number) => {
    const newSuppliers = formData.suppliers?.filter((_, i) => i !== index);
    setFormData({ ...formData, suppliers: newSuppliers });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-[rgba(0,0,0,0.2)] bg-opacity-20 transition-opacity" onClick={onClose} />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-gray-900">
              {ingredient ? 'Edit Ingredient' : 'Add New Ingredient'}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-gray-900 mb-3">Basic Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Ingredient Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">SKU (Optional)</label>
                  <input
                    type="text"
                    value={formData.sku || ''}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>

            {/* Stock Information */}
            <div>
              <h3 className="text-gray-900 mb-3">Stock Information</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Unit <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value as Unit })}
                    className="w-full px-[1px] py-[8px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {UNITS.map(unit => (
                      <option key={unit} value={unit}>
                        {UNIT_LABELS[unit]}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Stock Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.stockQuantity}
                    onChange={(e) => setFormData({ ...formData, stockQuantity: parseFloat(e.target.value) || 0 })}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.stockQuantity ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.stockQuantity && <p className="text-red-500 text-xs mt-1">{errors.stockQuantity}</p>}
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Minimum Threshold <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.minThreshold}
                    onChange={(e) => setFormData({ ...formData, minThreshold: parseFloat(e.target.value) || 0 })}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.minThreshold ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.minThreshold && <p className="text-red-500 text-xs mt-1">{errors.minThreshold}</p>}
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div>
              <h3 className="text-gray-900 mb-3">Pricing Information</h3>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Cost per Unit ($) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.costPerUnit}
                  onChange={(e) => setFormData({ ...formData, costPerUnit: parseFloat(e.target.value) || 0 })}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    errors.costPerUnit ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.costPerUnit && <p className="text-red-500 text-xs mt-1">{errors.costPerUnit}</p>}
              </div>
            </div>

            {/* Suppliers */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-gray-900">Suppliers</h3>
                <button
                  onClick={addSupplier}
                  className="flex items-center gap-1 px-3 py-1 text-sm text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Supplier
                </button>
              </div>
              <div className="space-y-3">
                {formData.suppliers?.map((supplier, index) => (
                  <div key={supplier.id} className="flex gap-3 items-start p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1 grid grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder="Supplier Name"
                        value={supplier.name}
                        onChange={(e) => updateSupplier(index, 'name', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                      <input
                        type="number"
                        placeholder="Lead Time (days)"
                        value={supplier.leadTimeDays}
                        onChange={(e) => updateSupplier(index, 'leadTimeDays', parseInt(e.target.value) || 0)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                      <input
                        type="text"
                        placeholder="Contact"
                        value={supplier.contact}
                        onChange={(e) => updateSupplier(index, 'contact', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <button
                      onClick={() => removeSupplier(index)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">Notes</label>
              <textarea
                value={formData.notes || ''}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
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
              onClick={handleSubmit}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Save Ingredient
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}