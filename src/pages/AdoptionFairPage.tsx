import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, MapPin, Calendar, Search } from 'lucide-react';
import { useAuth } from '../components/auth/AuthProvider';
import { useLocationStore } from '../store/locationStore';
import AdoptionFairList from '../components/adoption/AdoptionFairList';
import AdoptionFairForm from '../components/adoption/AdoptionFairForm';
import AdoptionFairIntro from '../components/adoption/AdoptionFairIntro';
import LocationDisplay from '../components/location/LocationDisplay';
import { supabase } from '../lib/supabase';

export default function AdoptionFairPage() {
  const { user } = useAuth();
  const { currentLocation, searchRadius, setSearchRadius } = useLocationStore();
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const isOng = user?.user_metadata?.role === 'ONG';

  useEffect(() => {
    // Check if user is authenticated and has ONG role
    if (user && !user.user_metadata?.role) {
      supabase.from('users')
        .select('role')
        .eq('id', user.id)
        .single()
        .then(({ data, error }) => {
          if (!error && data) {
            supabase.auth.updateUser({
              data: { role: data.role }
            });
          }
        });
    }
  }, [user]);

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
              src="https://storage.googleapis.com/imagensapp/modelo%20novo-Photoroom%20(1).png" 
              alt="Love&Connection Logo" 
              className="h-[68px] w-auto"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction Section */}
        <AdoptionFairIntro />

        {/* Warning Message */}
        <div className="bg-red-50 border-l-4 border-red-500 p-4 my-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
            <p className="text-sm text-red-700">
              Este aplicativo não é para comercialização de animais. 
              Caso haja violação dessa regra, o usuário será banido da plataforma.
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar feiras de adoção..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>

            {/* Date Filter */}
            <div className="relative">
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>

            {/* Location Display */}
            {currentLocation && (
              <LocationDisplay
                address={currentLocation.address}
                searchRadius={searchRadius}
                onRadiusChange={setSearchRadius}
              />
            )}
          </div>
        </div>

        {/* Add Fair Button for ONGs */}
        {isOng && (
          <div className="mb-8">
            <button
              onClick={() => setShowForm(true)}
              className="bg-[#36c6c6] text-white px-6 py-3 rounded-full hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-colors"
            >
              Cadastrar Nova Feira
            </button>
          </div>
        )}

        {/* Adoption Fairs List */}
        <AdoptionFairList
          searchTerm={searchTerm}
          dateFilter={dateFilter}
          locationFilter={{
            latitude: currentLocation?.latitude,
            longitude: currentLocation?.longitude,
            radius: searchRadius
          }}
        />

        {/* Add Fair Form Modal */}
        {showForm && (
          <AdoptionFairForm onClose={() => setShowForm(false)} />
        )}
      </div>
    </div>
  );
}