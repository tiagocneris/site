import React from 'react';

export default function DefinitionsSection() {
  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Definições</h2>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>Plataforma:</strong> Refere-se ao aplicativo e ao site do Love&Connection Pet Center.</li>
        <li><strong>Usuário:</strong> Qualquer pessoa que utiliza a Plataforma, seja como cliente, ONG, vendedor, prestador de serviços ou visitante.</li>
        <li><strong>Serviços:</strong> Recursos oferecidos pela Plataforma, incluindo cadastro, compra, venda, agendamento, e interação com ONGs.</li>
        <li><strong>Conteúdo:</strong> Informações, dados, imagens, vídeos, textos e outros materiais fornecidos por usuários ou pela Plataforma.</li>
      </ul>
    </section>
  );
}