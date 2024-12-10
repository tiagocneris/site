import React from 'react';

export default function UsageSection() {
  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. Uso da Plataforma</h2>
      <p>O Usuário deve utilizar a Plataforma de forma ética, legal e de acordo com os objetivos estabelecidos.</p>
      <p className="mt-4 mb-2">É proibido:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Publicar conteúdo ofensivo, ilícito ou que viole direitos de terceiros.</li>
        <li>Utilizar a Plataforma para práticas fraudulentas ou ilegais.</li>
        <li>Comercializar animais, exceto sob regulamentação específica e com permissão.</li>
      </ul>
    </section>
  );
}