import { useState, useEffect } from "react";
import { Minus, Plus } from "lucide-react";

interface QuantityControlProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  isEditing: boolean;
  onEditingChange: (isEditing: boolean) => void;
}

export function QuantityControl({
  quantity,
  onQuantityChange,
  isEditing,
  onEditingChange,
}: QuantityControlProps) {
  const [inputValue, setInputValue] = useState(quantity.toString());

  useEffect(() => {
    if (!isEditing) {
      setInputValue(quantity.toString());
    }
  }, [quantity, isEditing]);

  const handleInputChange = (value: string) => {
    // Allow empty string or valid numbers
    if (value === "" || /^\d+$/.test(value)) {
      setInputValue(value);
    }
  };

  const handleInputBlur = () => {
    const numValue = parseInt(inputValue, 10);
    if (!isNaN(numValue) && numValue >= 0) {
      onQuantityChange(numValue);
    } else {
      setInputValue(quantity.toString());
    }
    onEditingChange(false);
  };

  const handleIncrement = () => {
    onQuantityChange(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleInputBlur();
    } else if (e.key === "Escape") {
      setInputValue(quantity.toString());
      onEditingChange(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleDecrement}
        disabled={quantity <= 0}
        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <Minus className="w-4 h-4 text-gray-600" />
      </button>

      <input
        type="text"
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={() => onEditingChange(true)}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        className="w-20 px-3 py-2 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
      />

      <button
        onClick={handleIncrement}
        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
      >
        <Plus className="w-4 h-4 text-gray-600" />
      </button>
    </div>
  );
}
