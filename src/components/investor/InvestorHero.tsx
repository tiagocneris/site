import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function InvestorHero() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#36c6c6] text-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Transforme o mercado pet conosco!
        </h1>
        <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
          Invista em uma plataforma inovadora e faça parte de um projeto que conecta 
          amor, tecnologia e impacto social.
        </p>
        <button
          onClick={scrollToContact}
          className="bg-white text-[#36c6c6] px-8 py-4 rounded-full hover:bg-[#B2FFFF] transition-colors inline-flex items-center gap-2 font-medium"
        >
          Saiba Mais
          <ChevronDown className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}