import React from 'react';
import { Filter } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
}

interface SearchFiltersProps {
  filters: FilterOption[];
  selectedFilters: string[];
  onFilterChange: (filters: string[]) => void;
}

export default function SearchFilters({
  filters,
  selectedFilters,
  onFilterChange
}: SearchFiltersProps) {
  const toggleFilter = (filterId: string) => {
    if (selectedFilters.includes(filterId)) {
      onFilterChange(selectedFilters.filter(id => id !== filterId));
    } else {
      onFilterChange([...selectedFilters, filterId]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 text-neutral-600">
        <Filter className="h-4 w-4" />
        <span className="text-sm font-medium">Filtros</span>
      </div>
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => toggleFilter(filter.id)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            selectedFilters.includes(filter.id)
              ? 'bg-[#36c6c6] text-white'
              : 'bg-gray-100 text-neutral-600 hover:bg-[#B2FFFF] hover:text-[#36c6c6]'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}