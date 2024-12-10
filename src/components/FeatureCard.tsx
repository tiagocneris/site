import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  Icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({ Icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-colors group">
      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors">
        <Icon className="h-6 w-6 text-primary-200" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-primary-100">{title}</h3>
      <p className="text-primary-200">{description}</p>
    </div>
  );
}