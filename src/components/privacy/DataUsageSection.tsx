import React from 'react';

export default function DataUsageSection() {
  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. Uso das Informações</h2>
      <p>Utilizamos suas informações para:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Prestar os serviços contratados, incluindo agendamentos, vendas de produtos e localização de serviços;</li>
        <li>Personalizar sua experiência no aplicativo;</li>
        <li>Realizar comunicações promocionais (com seu consentimento);</li>
        <li>Garantir a segurança do usuário e prevenir fraudes;</li>
        <li>Cumprir obrigações legais e regulatórias;</li>
        <li>Melhorar nossos serviços com base em feedback e dados de uso.</li>
      </ul>
    </section>
  );
}