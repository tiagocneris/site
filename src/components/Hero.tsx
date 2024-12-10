import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShieldCheck, Star, TrendingUp } from 'lucide-react';

const features = [
  {
    Icon: Heart,
    title: 'Cuidado Personalizado',
    description: 'Serviços adaptados às necessidades únicas do seu pet, com todo amor que ele merece.'
  },
  {
    Icon: ShieldCheck,
    title: 'Profissionais Verificados',
    description: 'Prestadores de serviço confiáveis e experientes, selecionados com cuidado.'
  },
  {
    Icon: Star,
    title: 'Produtos Premium',
    description: 'As melhores marcas e produtos selecionados para o bem-estar do seu companheiro.'
  }
];

export default function Hero() {
  return (
    <div className="relative min-h-[90vh]">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://storage.googleapis.com/imagensapp/a-photo-of-a-light-caramel-colored-dog-lying-down--eYVVsIz6T2GsEzCxrMVn-A-Dq4otsn4RUuS0BJQBTAzbg.jpeg")',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/90 to-primary-900/90 mix-blend-multiply" />
      </div>

      <div className="relative z-10 pt-32 pb-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Love Connection <span className="text-primary-200">Pet Center</span><br />
              O melhor para seu pet
            </h1>
            <p className="text-xl text-primary-100 mb-12 max-w-2xl mx-auto">
              Descubra serviços, produtos e comunidades para cuidar de quem você ama.
              Uma nova forma de conectar amor e cuidado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/explore"
                className="bg-accent-500 text-white px-8 py-4 rounded-full hover:bg-accent-600 transition-all duration-300 text-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Explorar Serviços
              </Link>
              <Link
                to="/investor"
                className="bg-[#36c6c6] text-white px-8 py-4 rounded-full hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-all duration-300 text-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <TrendingUp className="h-5 w-5" />
                Seja um Investidor
              </Link>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-colors group">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors">
                  <feature.Icon className="h-6 w-6 text-primary-200" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-primary-100">{feature.title}</h3>
                <p className="text-primary-200">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}