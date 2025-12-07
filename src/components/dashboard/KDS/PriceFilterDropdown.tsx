import { useState } from "react";
import { DollarSign } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PriceFilterDropdownProps {
  onPriceChange?: (min: number, max: number) => void;
  minPrice?: number;
  maxPrice?: number;
  defaultMin?: number;
  defaultMax?: number;
}

const PriceFilterDropdown = ({
  onPriceChange,
  minPrice = 0,
  maxPrice = 100,
  defaultMin = 0,
  defaultMax = 100,
}: PriceFilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [priceRange, setPriceRange] = useState({
    min: defaultMin,
    max: defaultMax,
  });

  const handleMinChange = (value: number) => {
    const newMin = Math.min(value, priceRange.max);
    setPriceRange({ ...priceRange, min: newMin });
  };

  const handleMaxChange = (value: number) => {
    const newMax = Math.max(value, priceRange.min);
    setPriceRange({ ...priceRange, max: newMax });
  };

  const handleApply = () => {
    onPriceChange?.(priceRange.min, priceRange.max);
    setIsOpen(false);
  };

  const handleReset = () => {
    setPriceRange({ min: minPrice, max: maxPrice });
    onPriceChange?.(minPrice, maxPrice);
  };

  const isFiltered = priceRange.min !== minPrice || priceRange.max !== maxPrice;

  return (
<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
  <DropdownMenuTrigger asChild>
    <button
      className={`relative p-2.5 border rounded-lg transition-all ${
        isFiltered
          ? "border-[#FF5B35] bg-[#FFF5F2] hover:bg-[#FFEBE5]"
          : "border-gray-300 hover:bg-gray-50"
      }`}
    >
      <svg
        className={`h-4 w-4 ${isFiltered ? "text-[#FF5B35]" : "text-gray-600"}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
        />
      </svg>
      {isFiltered && (
        <span className="absolute -top-1 -right-1 h-2 w-2 bg-[#FF5B35] rounded-full ring-2 ring-white" />
      )}
    </button>
  </DropdownMenuTrigger>

  <DropdownMenuContent align="end" className="w-80 p-0 shadow-lg border border-gray-200">
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="h-5 w-5 rounded-full bg-[#FF5B35]/10 flex items-center justify-center">
          <DollarSign className="h-3 w-3 text-[#FF5B35]" />
        </div>
        <h3 className="font-semibold text-gray-800">Price Range</h3>
      </div>

      {/* Price Display */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1">
          <div className="px-3 py-2.5 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Min</span>
            <p className="text-lg font-bold text-gray-800 mt-0.5">
              ${priceRange.min}
            </p>
          </div>
        </div>
        <div className="mx-3">
          <div className="h-px w-6 bg-gray-300" />
        </div>
        <div className="flex-1">
          <div className="px-3 py-2.5 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Max</span>
            <p className="text-lg font-bold text-gray-800 mt-0.5">
              ${priceRange.max}
            </p>
          </div>
        </div>
      </div>

      {/* Double Range Slider */}
      <div className="relative mb-8 h-5">
        {/* Track Background */}
        <div className="h-1.5 bg-gray-200 rounded-full absolute w-full top-1/2 -translate-y-1/2" />
        
        {/* Active Track */}
        <div
          className="h-1.5 bg-gradient-to-r from-[#FF5B35]/80 to-[#FF5B35] rounded-full absolute top-1/2 -translate-y-1/2"
          style={{
            left: `${(priceRange.min / maxPrice) * 100}%`,
            right: `${100 - (priceRange.max / maxPrice) * 100}%`,
          }}
        />

        {/* Min Slider */}
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={priceRange.min}
          onChange={(e) => handleMinChange(Number(e.target.value))}
          className="absolute w-full top-1/2 -translate-y-1/2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#FF5B35] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:hover:shadow-xl [&::-webkit-slider-thumb]:transition-all [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#FF5B35] [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:hover:scale-110 [&::-moz-range-thumb]:hover:shadow-xl [&::-moz-range-thumb]:transition-all"
          style={{ zIndex: priceRange.min > maxPrice - 10 ? 5 : 3 }}
        />

        {/* Max Slider */}
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={priceRange.max}
          onChange={(e) => handleMaxChange(Number(e.target.value))}
          className="absolute w-full top-1/2 -translate-y-1/2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#FF5B35] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:hover:shadow-xl [&::-webkit-slider-thumb]:transition-all [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#FF5B35] [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:hover:scale-110 [&::-moz-range-thumb]:hover:shadow-xl [&::-moz-range-thumb]:transition-all"
          style={{ zIndex: 4 }}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleReset}
          className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors border border-gray-300 hover:border-gray-400"
        >
          Reset
        </button>
        <button
          onClick={handleApply}
          className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#FF5B35] to-[#FF5B35]/90 hover:from-[#FF5B35]/90 hover:to-[#FF5B35]/80 rounded-lg transition-all shadow-sm hover:shadow-md"
        >
          Apply Filter
        </button>
      </div>
    </div>
  </DropdownMenuContent>
</DropdownMenu>
  );
};

export default PriceFilterDropdown;