import React from 'react';

export default function DataSharingSection() {
  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. Compartilhamento de Dados</h2>
      
      <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">3.1. Com Terceiros Parceiros</h3>
      <ul className="list-disc pl-6 mb-4">
        <li>Provedores de serviços, como processadores de pagamento e serviços de entrega;</li>
        <li>Parceiros comerciais necessários para a realização de atividades ou promoções.</li>
      </ul>

      <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">3.2. Por Motivos Legais</h3>
      <ul className="list-disc pl-6 mb-4">
        <li>Quando exigido por lei, regulações ou ordem judicial;</li>
        <li>Para proteger nossos direitos, propriedade ou segurança.</li>
      </ul>

      <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">3.3. Com Consentimento do Usuário</h3>
      <p>Compartilharemos suas informações com terceiros apenas com sua autorização expressa, quando necessário.</p>
    </section>
  );
}