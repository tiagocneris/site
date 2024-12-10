import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Plus, Minus, Info } from 'lucide-react';
import ProductForm from '../components/merchant/ProductForm';
import ServiceForm from '../components/merchant/ServiceForm';

export default function ProductRegistrationPage() {
  const navigate = useNavigate();
  const [type, setType] = useState<'product' | 'service'>('product');

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-neutral-600 hover:text-[#36c6c6] transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Voltar</span>
            </button>
            <img 
              src="https://storage.googleapis.com/imagensapp/modelo%20novo-Photoroom%20(1).png" 
              alt="Love&Connection Logo" 
              className="h-[68px] w-auto"
            />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-neutral-800">
              Cadastrar {type === 'product' ? 'Produto' : 'Serviço'}
            </h1>
            <p className="text-neutral-600 mt-2">
              Preencha os detalhes para adicionar um novo {type === 'product' ? 'produto' : 'serviço'} à plataforma
            </p>
          </div>

          {/* Type Selection */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setType('product')}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                type === 'product'
                  ? 'bg-[#36c6c6] text-white'
                  : 'bg-gray-100 text-neutral-600 hover:bg-[#B2FFFF] hover:text-[#36c6c6]'
              }`}
            >
              Produto
            </button>
            <button
              onClick={() => setType('service')}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                type === 'service'
                  ? 'bg-[#36c6c6] text-white'
                  : 'bg-gray-100 text-neutral-600 hover:bg-[#B2FFFF] hover:text-[#36c6c6]'
              }`}
            >
              Serviço
            </button>
          </div>

          {/* Form */}
          {type === 'product' ? <ProductForm /> : <ServiceForm />}
        </div>
      </div>
    </div>
  );
}