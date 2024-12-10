import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, Users, Calendar } from 'lucide-react';
import OngRegistrationForm from '../components/ong/OngRegistrationForm';

export default function OngRegistrationPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link
              to="/ongs"
              className="flex items-center gap-2 text-neutral-600 hover:text-[#36c6c6] transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Voltar para ONGs</span>
            </Link>
            <img 
              src="https://storage.googleapis.com/imagensapp/modelo%20novo-Photoroom%20(1).png" 
              alt="Love&Connection Logo" 
              className="h-[68px] w-auto"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Cadastro de ONG
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Junte-se à nossa rede de ONGs e ajude a transformar a vida de mais animais
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-[#B2FFFF] rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-[#36c6c6]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Maior Visibilidade</h3>
              <p className="text-gray-600">
                Alcance mais pessoas interessadas em adoção responsável
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-[#B2FFFF] rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-6 w-6 text-[#36c6c6]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Eventos de Adoção</h3>
              <p className="text-gray-600">
                Organize e divulgue suas feiras de adoção facilmente
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-[#B2FFFF] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-[#36c6c6]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Comunidade</h3>
              <p className="text-gray-600">
                Conecte-se com outros protetores e apoiadores da causa animal
              </p>
            </div>
          </div>
        </div>

        {/* Warning Message */}
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">
                Este aplicativo não permite a comercialização de animais.
                O cadastro é exclusivo para ONGs e instituições sem fins lucrativos.
              </p>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <OngRegistrationForm />
        </div>
      </div>
    </div>
  );
}