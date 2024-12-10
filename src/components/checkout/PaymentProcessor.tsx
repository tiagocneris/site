import React, { useState } from 'react';
import { paymentService } from '../../services/api';

interface PaymentProcessorProps {
  amount: number;
  onSuccess: (paymentId: string) => void;
  onError: (error: string) => void;
}

export default function PaymentProcessor({
  amount,
  onSuccess,
  onError
}: PaymentProcessorProps) {
  const [processing, setProcessing] = useState(false);

  const processPayment = async (paymentData: any) => {
    setProcessing(true);
    try {
      const result = await paymentService.processPayment({
        ...paymentData,
        amount
      });
      onSuccess(result.paymentId);
    } catch (error) {
      onError('Erro ao processar pagamento');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Payment form components will be added here */}
      {processing && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#36c6c6] mx-auto"></div>
          <p className="mt-2 text-neutral-600">Processando pagamento...</p>
        </div>
      )}
    </div>
  );
}