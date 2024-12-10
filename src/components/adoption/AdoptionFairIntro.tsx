import React from 'react';
import { Heart, Users, Calendar } from 'lucide-react';

export default function AdoptionFairIntro() {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Feira de Adoção</h1>
      <p className="text-lg text-gray-600 mb-12">
        Conectamos ONGs e futuros tutores em um ambiente seguro e responsável. 
        Encontre seu novo melhor amigo em nossas feiras de adoção.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-colors group">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors">
            <Heart className="h-6 w-6 text-[#36c6c6]" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-neutral-800">Adoção Responsável</h3>
          <p className="text-neutral-600">
            Todos os animais são avaliados e acompanhados por veterinários
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-colors group">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors">
            <Users className="h-6 w-6 text-[#36c6c6]" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-neutral-800">ONGs Parceiras</h3>
          <p className="text-neutral-600">
            Trabalhamos com ONGs verificadas e comprometidas com o bem-estar animal
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-colors group">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors">
            <Calendar className="h-6 w-6 text-[#36c6c6]" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-neutral-800">Eventos Regulares</h3>
          <p className="text-neutral-600">
            Feiras de adoção organizadas regularmente em diferentes localidades
          </p>
        </div>
      </div>
    </div>
  );
}