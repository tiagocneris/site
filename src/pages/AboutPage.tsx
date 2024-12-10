import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Target, Users, Zap } from 'lucide-react';
import AboutHeader from '../components/about/AboutHeader';
import MissionVision from '../components/about/MissionVision';
import Values from '../components/about/Values';
import Offerings from '../components/about/Offerings';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="flex items-center gap-2 text-neutral-600 hover:text-[#36c6c6] transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Voltar para Home</span>
            </Link>
            <img 
              src="https://storage.googleapis.com/imagensapp/love%20connection%20pet%20center-Photoroom.png" 
              alt="Love&Connection Logo" 
              className="h-[68px] w-auto"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AboutHeader />

        <div className="mb-12">
          <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center">
            O Love&Connection Pet Center nasceu da paixão por animais e do desejo de criar um ambiente 
            digital que conecte pessoas, serviços e organizações dedicadas ao bem-estar dos pets. 
            Nossa missão é facilitar a vida dos donos de animais e fortalecer a rede de apoio entre 
            pet shops, clínicas veterinárias, ONGs de adoção e outros prestadores de serviços.
          </p>
        </div>

        <MissionVision />
        <Values />
        <Offerings />

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Por Que Escolher o Love&Connection Pet Center?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Target,
                title: 'Plataforma Integrada',
                description: 'Tudo o que você precisa em um único lugar.'
              },
              {
                icon: MapPin,
                title: 'Geolocalização Prática',
                description: 'Encontre serviços e promoções próximas a você.'
              },
              {
                icon: Users,
                title: 'Comunidade Ativa',
                description: 'Faça parte de um movimento que valoriza a vida animal.'
              },
              {
                icon: Zap,
                title: 'Impacto Social',
                description: 'Ao usar nossa plataforma, você apoia iniciativas de resgate, adoção e conscientização.'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-[#B2FFFF] rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-[#36c6c6]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center">
          <p className="text-lg text-gray-600">
            Junte-se a nós no Love&Connection Pet Center e transforme a maneira como você cuida e 
            interage com o mundo dos pets.
          </p>
        </div>
      </div>
    </div>
  );
}