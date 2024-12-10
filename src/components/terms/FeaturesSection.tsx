import React from 'react';

export default function FeaturesSection() {
  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">5. Funcionalidades Específicas</h2>
      
      <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">5.1 Página de ONGs</h3>
      <p>O botão "Não Abandone, DOE!" direciona para ONGs associadas que realizam adoção de pets.</p>

      <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">5.2 Denúncias</h3>
      <p>A Plataforma permite o envio de denúncias sobre atividades ilícitas de ONGs, mediante formulário específico com perguntas e envio de provas.</p>

      <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">5.3 Geolocalização</h3>
      <p>A funcionalidade de geolocalização permite rastrear entregadores em tempo real, sujeito à autorização do Usuário.</p>
    </section>
  );
}