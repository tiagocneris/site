import React from 'react';
import { Check, X } from 'lucide-react';

interface PlanFeaturesProps {
  features: {
    name: string;
    included: boolean;
  }[];
}

export default function PlanFeatures({ features }: PlanFeaturesProps) {
  return (
    <ul className="space-y-3">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center gap-3">
          {feature.included ? (
            <Check className="h-5 w-5 text-[#36c6c6]" />
          ) : (
            <X className="h-5 w-5 text-gray-400" />
          )}
          <span className={feature.included ? 'text-neutral-800' : 'text-neutral-600'}>
            {feature.name}
          </span>
        </li>
      ))}
    </ul>
  );
}