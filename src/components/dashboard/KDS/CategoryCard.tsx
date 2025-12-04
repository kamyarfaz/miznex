import { Category } from "@/types/restaurant";
import { getCategoryIcon } from "@/utils/GetCategoryIcon";

interface CategoryCardProps {
  selectedCategory: string;
}

const CategoryCard = ({ selectedCategory }: CategoryCardProps) => {
  return (
    <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-white border border-blue-200 flex items-center justify-center">
            <span className="text-lg">{getCategoryIcon(selectedCategory)}</span>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 capitalize">
              {selectedCategory.replace(/_/g, " ")}
            </h3>
            <p className="text-sm text-gray-600">MOCK items</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CategoryCard;
