import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface AccountMenuProps {
  items: MenuItem[];
  activeSection: string;
  onSelect: (id: string) => void;
}

export default function AccountMenu({ items, activeSection, onSelect }: AccountMenuProps) {
  return (
    <nav className="bg-white rounded-2xl shadow-sm p-2">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item.id)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
            activeSection === item.id
              ? 'bg-primary-50 text-primary-600'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <item.icon className="h-5 w-5" />
          <span className="font-medium">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}