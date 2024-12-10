import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ProductPreview from '../components/details/ProductPreview';
import ServicePreview from '../components/details/ServicePreview';

interface PreviewItem {
  type: 'product' | 'service';
  name: string;
  description: string;
  price: number;
  images: string[];
  features: string[];
  [key: string]: any;
}

export default function PreviewPage() {
  const navigate = useNavigate();
  const [previewData, setPreviewData] = useState<PreviewItem | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem('previewItem');
    if (storedData) {
      setPreviewData(JSON.parse(storedData));
    }
  }, []);

  if (!previewData) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">
            Nenhum item para visualizar
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="text-[#36c6c6] hover:text-[#B2FFFF] transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

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
            <div className="text-center">
              <h1 className="text-lg font-semibold text-neutral-800">
                Pré-visualização do {previewData.type === 'product' ? 'Produto' : 'Serviço'}
              </h1>
              <p className="text-sm text-neutral-600">
                Veja como seu {previewData.type === 'product' ? 'produto' : 'serviço'} será exibido
              </p>
            </div>
            <div className="w-24" /> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {previewData.type === 'product' ? (
          <ProductPreview product={previewData} />
        ) : (
          <ServicePreview service={previewData} />
        )}
      </div>
    </div>
  );
}