import React, { useState } from 'react';
import { Upload, Plus, Minus, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  name: string;
  description: string;
  price: number;
  duration: string;
  location: string;
  features: string[];
}

export default function ServiceForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    price: 0,
    duration: '',
    location: '',
    features: ['']
  });
  const [images, setImages] = useState<string[]>([]);
  const [timeSlots, setTimeSlots] = useState({
    days: ['Segunda à Sexta'],
    hours: ['09:00 - 18:00']
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setImages([...images, ...newImages]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', { formData, images, timeSlots });
  };

  const handlePreview = () => {
    const previewData = {
      type: 'service',
      name: formData.name,
      description: formData.description,
      price: formData.price,
      images: images,
      features: formData.features.filter(f => f),
      location: formData.location,
      availability: timeSlots,
      rating: 0,
      reviews: 0,
      duration: formData.duration
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
            Nome do Serviço
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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-600 mb-2">
              Preço
            </label>
            <input
              type="number"
              value={formData.price || ''}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-600 mb-2">
              Duração
            </label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="Ex: 1 hora"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
              required
            />
          </div>
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-neutral-600 mb-2">
          Localização
        </label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          placeholder="Endereço completo"
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
          required
        />
      </div>

      {/* Images */}
      <div>
        <label className="block text-sm font-medium text-neutral-600 mb-2">
          Imagens do Serviço
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

      {/* Features */}
      <div>
        <label className="block text-sm font-medium text-neutral-600 mb-2">
          Serviços Inclusos
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
                placeholder="Ex: Consulta completa, Vacinação..."
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
              <span>Adicionar Serviço</span>
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
          Visualizar Serviço
        </button>
        <button
          type="submit"
          className="flex-1 bg-[#36c6c6] text-white px-6 py-3 rounded-full hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-colors"
        >
          Cadastrar Serviço
        </button>
      </div>
    </form>
  );
}