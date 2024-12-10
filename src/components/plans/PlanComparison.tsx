import React from 'react';
import { Check, X } from 'lucide-react';

const features = [
  {
    name: 'Exibição em Buscas',
    basic: true,
    intermediate: true,
    premium: true
  },
  {
    name: 'Perfil Personalizado',
    basic: true,
    intermediate: true,
    premium: true
  },
  {
    name: 'Produtos Destacados',
    basic: false,
    intermediate: true,
    premium: true
  },
  {
    name: 'Dashboard de Análise',
    basic: false,
    intermediate: true,
    premium: true
  },
  {
    name: 'Suporte Prioritário',
    basic: false,
    intermediate: true,
    premium: true
  },
  {
    name: 'Relatórios Avançados',
    basic: false,
    intermediate: false,
    premium: true
  },
  {
    name: 'API de Integração',
    basic: false,
    intermediate: false,
    premium: true
  }
];

export default function PlanComparison() {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
        Comparação de Recursos
      </h2>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-t border-gray-200">
              <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">
                Recurso
              </th>
              <th className="py-4 px-6 text-center text-sm font-medium text-gray-500">
                Básico
              </th>
              <th className="py-4 px-6 text-center text-sm font-medium text-gray-500">
                Intermediário
              </th>
              <th className="py-4 px-6 text-center text-sm font-medium text-gray-500">
                Premium
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {features.map((feature) => (
              <tr key={feature.name}>
                <td className="py-4 px-6 text-sm text-gray-900">{feature.name}</td>
                <td className="py-4 px-6 text-center">
                  {feature.basic ? (
                    <Check className="h-5 w-5 text-[#36c6c6] mx-auto" />
                  ) : (
                    <X className="h-5 w-5 text-gray-300 mx-auto" />
                  )}
                </td>
                <td className="py-4 px-6 text-center">
                  {feature.intermediate ? (
                    <Check className="h-5 w-5 text-[#36c6c6] mx-auto" />
                  ) : (
                    <X className="h-5 w-5 text-gray-300 mx-auto" />
                  )}
                </td>
                <td className="py-4 px-6 text-center">
                  {feature.premium ? (
                    <Check className="h-5 w-5 text-[#36c6c6] mx-auto" />
                  ) : (
                    <X className="h-5 w-5 text-gray-300 mx-auto" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}