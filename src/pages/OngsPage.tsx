import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Search, MapPin, Filter, PawPrint, DollarSign, Users, Building2 } from 'lucide-react';
import OngCard from '../components/OngCard';
import AdoptionCard from '../components/AdoptionCard';
import DonationSection from '../components/DonationSection';

const ongs = [
  {
    id: 1,
    name: "Amigos dos Pets",
    description: "Dedicados ao resgate e reabilitação de animais abandonados",
    image: "https://images.unsplash.com/photo-1551730459-92db2a308d6a?auto=format&fit=crop&q=80",
    location: "São Paulo, SP",
    distance: "3.2 km",
    stats: {
      animalsHelped: 1240,
      adoptions: 890,
      volunteers: 45
    },
    needs: ["Ração", "Medicamentos", "Cobertores"]
  },
  {
    id: 2,
    name: "Lar Animal",
    description: "Abrigo e cuidados veterinários para pets resgatados",
    image: "https://images.unsplash.com/photo-1593871075120-982e042088d8?auto=format&fit=crop&q=80",
    location: "São Paulo, SP",
    distance: "5.1 km",
    stats: {
      animalsHelped: 980,
      adoptions: 670,
      volunteers: 32
    },
    needs: ["Ração", "Produtos de Limpeza", "Brinquedos"]
  },
  {
    id: 3,
    name: "Proteção Animal",
    description: "Resgate, reabilitação e adoção responsável",
    image: "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?auto=format&fit=crop&q=80",
    location: "São Paulo, SP",
    distance: "4.7 km",
    stats: {
      animalsHelped: 1560,
      adoptions: 1120,
      volunteers: 58
    },
    needs: ["Medicamentos", "Cobertores", "Ração Especial"]
  }
];

const adoptablePets = [
  {
    id: 1,
    name: "Luna",
    type: "Cachorro",
    breed: "Vira-lata",
    age: "2 anos",
    gender: "Fêmea",
    size: "Médio",
    image: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&q=80",
    ong: "Amigos dos Pets",
    description: "Luna é uma cachorrinha dócil e brincalhona, ótima com crianças."
  },
  {
    id: 2,
    name: "Thor",
    type: "Cachorro",
    breed: "Pastor Alemão",
    age: "1 ano",
    gender: "Macho",
    size: "Grande",
    image: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&q=80",
    ong: "Lar Animal",
    description: "Thor é um cachorro forte e protetor, ideal para famílias."
  },
  {
    id: 3,
    name: "Nina",
    type: "Gato",
    breed: "Siamês",
    age: "6 meses",
    gender: "Fêmea",
    size: "Pequeno",
    image: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&q=80",
    ong: "Proteção Animal",
    description: "Nina é uma gatinha carinhosa e muito esperta."
  }
];

export default function OngsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('ongs');

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <div className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Faça a Diferença na Vida de um Pet</h1>
            <p className="text-xl text-primary-100 mb-8">
              Conheça ONGs incríveis e ajude a transformar histórias através da adoção responsável
            </p>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => setActiveTab('ongs')}
                className={`px-6 py-3 rounded-full font-medium transition-colors ${
                  activeTab === 'ongs' 
                    ? 'bg-white text-primary-600' 
                    : 'bg-primary-700 text-white hover:bg-primary-800'
                }`}
              >
                Conhecer ONGs
              </button>
              <button 
                onClick={() => setActiveTab('adoption')}
                className={`px-6 py-3 rounded-full font-medium transition-colors ${
                  activeTab === 'adoption' 
                    ? 'bg-white text-primary-600' 
                    : 'bg-primary-700 text-white hover:bg-primary-800'
                }`}
              >
                Adotar um Pet
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ONG Registration CTA */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-[#B2FFFF] rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-white">
                  <Building2 className="h-8 w-8 text-[#36c6c6]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-neutral-800">É uma ONG?</h2>
                  <p className="text-neutral-600 max-w-xl">
                    Cadastre sua ONG e ajude mais animais a encontrarem um lar amoroso
                  </p>
                </div>
              </div>
              <Link
                to="/ong/register"
                className="bg-[#36c6c6] text-white px-8 py-3 rounded-full hover:bg-white hover:text-[#36c6c6] transition-colors whitespace-nowrap font-medium"
              >
                Cadastrar ONG
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder={activeTab === 'ongs' ? "Buscar ONGs..." : "Buscar pets para adoção..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-200 hover:border-primary-500 hover:text-primary-600 transition-colors">
                <MapPin className="h-5 w-5" />
                <span>Localização</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-200 hover:border-primary-500 hover:text-primary-600 transition-colors">
                <Filter className="h-5 w-5" />
                <span>Filtros</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 justify-center p-6 rounded-2xl bg-primary-50">
              <PawPrint className="h-10 w-10 text-primary-500" />
              <div>
                <p className="text-2xl font-bold text-primary-600">3,780+</p>
                <p className="text-gray-600">Pets Resgatados</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center p-6 rounded-2xl bg-accent-50">
              <Heart className="h-10 w-10 text-accent-500" />
              <div>
                <p className="text-2xl font-bold text-accent-600">2,680+</p>
                <p className="text-gray-600">Adoções Realizadas</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center p-6 rounded-2xl bg-secondary-50">
              <Users className="h-10 w-10 text-secondary-500" />
              <div>
                <p className="text-2xl font-bold text-secondary-600">135+</p>
                <p className="text-gray-600">ONGs Parceiras</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === 'ongs' ? (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">ONGs em Destaque</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ongs.map((ong) => (
                <OngCard key={ong.id} ong={ong} />
              ))}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Pets para Adoção</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {adoptablePets.map((pet) => (
                <AdoptionCard key={pet.id} pet={pet} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Donation Section */}
      <DonationSection />
    </div>
  );
}