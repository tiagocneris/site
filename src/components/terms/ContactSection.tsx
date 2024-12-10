import React from 'react';

export default function ContactSection() {
  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">12. Contato</h2>
      <p>Caso tenha dúvidas sobre estes Termos de Uso, entre em contato conosco:</p>
      <ul className="list-none pl-0 mb-4">
        <li>E-mail: suporte@loveconnection.com.br</li>
        <li>Telefone: +55 (11) 970388009</li>
      </ul>
      <p className="mt-4">
        Ao utilizar o Love&Connection Pet Center, você reconhece que leu, compreendeu e concorda com estes Termos de Uso. 
        Agradecemos por fazer parte de nossa comunidade!
      </p>
    </section>
  );
}