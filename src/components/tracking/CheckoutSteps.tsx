import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  id: string;
  title: string;
}

interface CheckoutStepsProps {
  steps: Step[];
  currentStep: string;
}

export default function CheckoutSteps({ steps, currentStep }: CheckoutStepsProps) {
  const getStepStatus = (stepId: string) => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    const stepIndex = steps.findIndex(step => step.id === stepId);
    
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="flex justify-center">
      <nav aria-label="Progress" className="w-full max-w-2xl">
        <ol className="flex items-center">
          {steps.map((step, index) => {
            const status = getStepStatus(step.id);
            return (
              <li
                key={step.id}
                className={`relative ${
                  index !== steps.length - 1 ? 'flex-1' : ''
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`relative flex h-8 w-8 items-center justify-center rounded-full ${
                      status === 'completed'
                        ? 'bg-[#36c6c6]'
                        : status === 'current'
                        ? 'border-2 border-[#36c6c6] bg-white'
                        : 'border-2 border-gray-300 bg-white'
                    }`}
                  >
                    {status === 'completed' ? (
                      <Check className="h-5 w-5 text-white" />
                    ) : (
                      <span
                        className={`text-sm font-medium ${
                          status === 'current' ? 'text-[#36c6c6]' : 'text-gray-500'
                        }`}
                      >
                        {index + 1}
                      </span>
                    )}
                  </div>
                  {index !== steps.length - 1 && (
                    <div
                      className={`h-0.5 w-full ${
                        status === 'completed' ? 'bg-[#36c6c6]' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>
                <span
                  className="absolute -bottom-6 w-full text-center text-sm font-medium"
                  style={{ left: '50%', transform: 'translateX(-50%)' }}
                >
                  {step.title}
                </span>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}