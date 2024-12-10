import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Category {
  id: number;
  name: string;
  icon: LucideIcon;
  count: number;
  color: string;
}

interface CategoryCardProps {
  category: Category;
  isSelected: boolean;
  onClick: () => void;
}

export default function CategoryCard({ category, isSelected, onClick }: CategoryCardProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center p-4 rounded-2xl transition-all duration-200 ${
        isSelected
          ? 'bg-primary-50 border-2 border-primary-500'
          : 'bg-white border-2 border-gray-100 hover:border-primary-200'
      }`}
    >
      <div className={`${category.color} w-12 h-12 rounded-full flex items-center justify-center mb-3`}>
        <category.icon className="h-6 w-6 text-white" />
      </div>
      <span className="text-sm font-medium text-gray-900">{category.name}</span>
      <span className="text-xs text-gray-500 mt-1">{category.count} disponíveis</span>
    </button>
  );
}