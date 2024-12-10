import React from 'react';
import { CheckCircle } from 'lucide-react';

const roadmapSteps = [
  {
    year: '2024',
    quarter: 'Q2',
    title: 'Expansão Regional',
    description: 'Consolidação em São Paulo e expansão para Rio de Janeiro.',
    completed: true
  },
  {
    year: '2024',
    quarter: 'Q4',
    title: 'Novas Funcionalidades',
    description: 'Lançamento do marketplace e sistema de delivery próprio.',
    completed: false
  },
  {
    year: '2025',
    quarter: 'Q2',
    title: 'Expansão Nacional',
    description: 'Presença nas principais capitais do Brasil.',
    completed: false
  },
  {
    year: '2025',
    quarter: 'Q4',
    title: 'Internacionalização',
    description: 'Início das operações em países da América Latina.',
    completed: false
  }
];

export default function ExpansionRoadmap() {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
        Áreas de Expansão Planejada
      </h2>
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200" />
        <div className="space-y-12">
          {roadmapSteps.map((step, index) => (
            <div key={index} className="relative">
              <div className={`absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full ${
                step.completed ? 'bg-[#36c6c6]' : 'bg-gray-200'
              }`}>
                {step.completed && (
                  <CheckCircle className="h-4 w-4 text-white" />
                )}
              </div>
              <div className={`ml-[calc(50%+2rem)] pl-8 ${
                index % 2 === 0 ? 'md:ml-0 md:pl-0 md:pr-8 md:text-right' : ''
              }`}>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="text-sm font-medium text-[#36c6c6] mb-2">
                    {step.year} - {step.quarter}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}