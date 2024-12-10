import React from 'react';

export default function InformationSection() {
  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Informações Coletadas</h2>

      <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">1.1. Informações Pessoais Fornecidas pelo Usuário</h3>
      <p>Coletamos as seguintes informações quando você se cadastra, utiliza nossos serviços ou interage conosco:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Nome completo;</li>
        <li>Endereço de e-mail;</li>
        <li>Número de telefone;</li>
        <li>Endereço residencial e/ou comercial;</li>
        <li>Dados de localização (quando autorizados pelo usuário);</li>
        <li>CRMV (para clínicas veterinárias e profissionais da área);</li>
        <li>Informções de pagamento (processadas por provedores terceiros seguros).</li>
      </ul>

      <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">1.2. Informações Coletadas Automaticamente</h3>
      <p>Podemos coletar automaticamente informações como:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Endereço IP;</li>
        <li>Tipo de dispositivo e navegador;</li>
        <li>Páginas visitadas em nosso site ou aplicativo;</li>
        <li>Dados de uso, como interações com recursos do aplicativo.</li>
      </ul>

      <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">1.3. Informações de Terceiros</h3>
      <p>Podemos receber dados de parceiros comerciais, como informações necessárias para a conclusão de transações financeiras ou integrações com plataformas de redes sociais.</p>
    </section>
  );
}