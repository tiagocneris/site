import React, { useState } from 'react';
import { Upload, Plus, Minus, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  name: string;
  brand: string;
  description: string;
  category: string;
  price: number;
  duration?: string;
  location?: string;
  features: string[];
}

export default function ProductForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    brand: '',
    description: '',
    category: '',
    price: 0,
    features: ['']
  });
  const [images, setImages] = useState<string[]>([]);
  const [variants, setVariants] = useState([
    { id: 1, size: '', price: 0 }
  ]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setImages([...images, ...newImages]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', { formData, images, variants });
  };

  const handlePreview = () => {
    const previewData = {
      type: 'product',
      name: formData.name,
      brand: formData.brand,
      description: formData.description,
      price: variants[0].price,
      images: images,
      features: formData.features.filter(f => f),
      variants,
      rating: 0,
      reviews: 0
    };
    localStorage.setItem('previewItem', JSON.stringify(previewData));
    navigate('/preview');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-600 mb-2">
            Nome do Produto
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-600 mb-2">
            Marca
          </label>
          <input
            type="text"
            value={formData.brand}
            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-600 mb-2">
            Descrição
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
            required
          />
        </div>
      </div>

      {/* Images */}
      <div>
        <label className="block text-sm font-medium text-neutral-600 mb-2">
          Imagens do Produto
        </label>
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
              <img
                src={image}
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setImages(images.filter((_, i) => i !== index))}
                className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white hover:bg-red-600"
              >
                <Minus className="h-4 w-4" />
              </button>
            </div>
          ))}
          {images.length < 5 && (
            <label className="aspect-square rounded-lg border-2 border-dashed border-gray-200 hover:border-[#36c6c6] transition-colors flex flex-col items-center justify-center cursor-pointer">
              <Upload className="h-6 w-6 text-gray-400" />
              <span className="text-sm text-gray-500 mt-2">Adicionar Foto</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>

      {/* Variants */}
      <div>
        <label className="block text-sm font-medium text-neutral-600 mb-2">
          Variantes
        </label>
        <div className="space-y-4">
          {variants.map((variant, index) => (
            <div key={variant.id} className="flex gap-4">
              <input
                type="text"
                placeholder="Tamanho/Variante"
                value={variant.size}
                onChange={(e) => {
                  const newVariants = [...variants];
                  newVariants[index].size = e.target.value;
                  setVariants(newVariants);
                }}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
              />
              <input
                type="number"
                placeholder="Preço"
                value={variant.price || ''}
                onChange={(e) => {
                  const newVariants = [...variants];
                  newVariants[index].price = Number(e.target.value);
                  setVariants(newVariants);
                }}
                className="w-32 px-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
              />
              {variants.length > 1 && (
                <button
                  type="button"
                  onClick={() => setVariants(variants.filter((_, i) => i !== index))}
                  className="p-2 text-red-500 hover:text-red-600"
                >
                  <Minus className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
          {variants.length < 5 && (
            <button
              type="button"
              onClick={() => setVariants([...variants, { id: Date.now(), size: '', price: 0 }])}
              className="flex items-center gap-2 text-[#36c6c6] hover:text-[#B2FFFF]"
            >
              <Plus className="h-5 w-5" />
              <span>Adicionar Variante</span>
            </button>
          )}
        </div>
      </div>

      {/* Features */}
      <div>
        <label className="block text-sm font-medium text-neutral-600 mb-2">
          Características
        </label>
        <div className="space-y-4">
          {formData.features.map((feature, index) => (
            <div key={index} className="flex gap-4">
              <input
                type="text"
                value={feature}
                onChange={(e) => {
                  const newFeatures = [...formData.features];
                  newFeatures[index] = e.target.value;
                  setFormData({ ...formData, features: newFeatures });
                }}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
                placeholder="Ex: Material premium, Tamanho ajustável..."
              />
              {formData.features.length > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    const newFeatures = formData.features.filter((_, i) => i !== index);
                    setFormData({ ...formData, features: newFeatures });
                  }}
                  className="p-2 text-red-500 hover:text-red-600"
                >
                  <Minus className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
          {formData.features.length < 10 && (
            <button
              type="button"
              onClick={() => setFormData({
                ...formData,
                features: [...formData.features, '']
              })}
              className="flex items-center gap-2 text-[#36c6c6] hover:text-[#B2FFFF]"
            >
              <Plus className="h-5 w-5" />
              <span>Adicionar Característica</span>
            </button>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-6 flex gap-4">
        <button
          type="button"
          onClick={handlePreview}
          className="flex-1 border-2 border-[#36c6c6] text-[#36c6c6] px-6 py-3 rounded-full hover:bg-[#B2FFFF] transition-colors"
        >
          Visualizar Produto
        </button>
        <button
          type="submit"
          className="flex-1 bg-[#36c6c6] text-white px-6 py-3 rounded-full hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-colors"
        >
          Cadastrar Produto
        </button>
      </div>
    </form>
  );
}