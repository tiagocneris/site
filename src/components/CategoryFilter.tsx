import React from 'react';

interface Category {
  id: number;
  name: string;
  count: number;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: number | null;
  onSelectCategory: (id: number | null) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory
}: CategoryFilterProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Categorias</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id === selectedCategory ? null : category.id)}
            className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${
              category.id === selectedCategory
                ? 'bg-primary-50 text-primary-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <span>{category.name}</span>
            <span className="text-sm text-gray-500">{category.count}</span>
          </button>
        ))}
      </div>
    </div>
  );
}