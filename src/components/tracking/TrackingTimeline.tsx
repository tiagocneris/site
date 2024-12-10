import React from 'react';
import { Calendar, MapPin, CheckCircle, Truck } from 'lucide-react';

interface TrackingStep {
  status: string;
  date: string;
  location: string;
  description: string;
  completed: boolean;
}

interface TrackingTimelineProps {
  orderNumber: string;
  steps: TrackingStep[];
}

export default function TrackingTimeline({ orderNumber, steps }: TrackingTimelineProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 rounded-full bg-[#B2FFFF]">
          <Truck className="h-6 w-6 text-[#36c6c6]" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Status do Pedido</h2>
          <p className="text-gray-600">Pedido #{orderNumber}</p>
        </div>
      </div>

      <div className="space-y-8">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            {index !== steps.length - 1 && (
              <div
                className={`absolute left-6 top-10 h-full w-0.5 ${
                  step.completed ? 'bg-[#36c6c6]' : 'bg-gray-200'
                }`}
              />
            )}
            <div className="flex gap-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                  step.completed
                    ? 'bg-[#36c6c6] text-white'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {step.completed ? (
                  <CheckCircle className="h-6 w-6" />
                ) : (
                  <div className="w-3 h-3 rounded-full bg-current" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{step.status}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{step.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{step.location}</span>
                  </div>
                </div>
                <p className="text-gray-600 mt-2">{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}