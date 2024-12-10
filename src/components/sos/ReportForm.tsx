import React, { useState } from 'react';
import { X, Camera, MapPin, AlertTriangle } from 'lucide-react';
import { useAuth } from '../auth/AuthProvider';
import { supabase } from '../../lib/supabase';
import { useLocationStore } from '../../store/locationStore';

interface ReportFormProps {
  onClose: () => void;
}

export default function ReportForm({ onClose }: ReportFormProps) {
  const { user } = useAuth();
  const { currentLocation } = useLocationStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    type: 'abuse' as 'abuse' | 'abandonment' | 'injury' | 'other',
    description: '',
    location: currentLocation ? {
      lat: currentLocation.latitude,
      lng: currentLocation.longitude,
      address: currentLocation.address
    } : null,
    images: [] as File[],
    anonymous: false,
    contact_info: {
      name: '',
      phone: '',
      email: ''
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Upload images
      const imageUrls = await Promise.all(
        formData.images.map(async (file) => {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Math.random()}.${fileExt}`;
          const filePath = `reports/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('report-images')
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('report-images')
            .getPublicUrl(filePath);

          return publicUrl;
        })
      );

      // Create report
      const { error: insertError } = await supabase
        .from('reports')
        .insert({
          type: formData.type,
          description: formData.description,
          location: formData.location,
          images: imageUrls,
          reporter_id: formData.anonymous ? null : user?.id,
          anonymous: formData.anonymous,
          contact_info: formData.anonymous ? null : formData.contact_info,
          status: 'pending'
        });

      if (insertError) throw insertError;

      onClose();
    } catch (err) {
      console.error('Error submitting report:', err);
      setError('Erro ao enviar denúncia. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newImages]
      }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>

          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-semibold text-neutral-800">Registrar Denúncia</h2>
            
            <div>
              <label className="block text-sm font-medium text-neutral-600 mb-2">
                Tipo de Ocorrência
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  type: e.target.value as typeof formData.type 
                })}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
                required
              >
                <option value="abuse">Maus-tratos</option>
                <option value="abandonment">Animal Abandonado</option>
                <option value="injury">Animal Ferido</option>
                <option value="other">Outros</option>
              </select>
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
                placeholder="Descreva a situação em detalhes..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-600 mb-2">
                Localização
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.location?.address || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    location: { ...formData.location!, address: e.target.value }
                  })}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
                  placeholder="Endereço da ocorrência"
                  required
                />
                <button
                  type="button"
                  onClick={() => {
                    if (currentLocation) {
                      setFormData({
                        ...formData,
                        location: {
                          lat: currentLocation.latitude,
                          lng: currentLocation.longitude,
                          address: currentLocation.address
                        }
                      });
                    }
                  }}
                  className="p-2 rounded-lg border border-gray-200 hover:border-[#36c6c6] text-gray-600 hover:text-[#36c6c6]"
                >
                  <MapPin className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-600 mb-2">
                Evidências
              </label>
              <div className="grid grid-cols-3 gap-4 mb-4">
                {formData.images.map((file, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Evidence ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        images: prev.images.filter((_, i) => i !== index)
                      }))}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <label className="block w-full p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-[#36c6c6] transition-colors cursor-pointer">
                <div className="flex flex-col items-center">
                  <Camera className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">
                    Clique para adicionar fotos ou arraste os arquivos
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  multiple
                  className="hidden"
                />
              </label>
            </div>

            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.anonymous}
                  onChange={(e) => setFormData({ ...formData, anonymous: e.target.checked })}
                  className="rounded border-gray-300 text-[#36c6c6] focus:ring-[#36c6c6]"
                />
                <span className="text-sm text-neutral-600">
                  Fazer denúncia anônima
                </span>
              </label>
            </div>

            {!formData.anonymous && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-600 mb-2">
                    Nome (opcional)
                  </label>
                  <input
                    type="text"
                    value={formData.contact_info.name}
                    onChange={(e) => setFormData({
                      ...formData,
                      contact_info: { ...formData.contact_info, name: e.target.value }
                    })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-600 mb-2">
                    Telefone (opcional)
                  </label>
                  <input
                    type="tel"
                    value={formData.contact_info.phone}
                    onChange={(e) => setFormData({
                      ...formData,
                      contact_info: { ...formData.contact_info, phone: e.target.value }
                    })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-600 mb-2">
                    Email (opcional)
                  </label>
                  <input
                    type="email"
                    value={formData.contact_info.email}
                    onChange={(e) => setFormData({
                      ...formData,
                      contact_info: { ...formData.contact_info, email: e.target.value }
                    })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-50 rounded-lg text-red-600">
                <AlertTriangle className="h-5 w-5" />
                <p>{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#36c6c6] text-white px-6 py-3 rounded-full hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Enviando...' : 'Enviar Denúncia'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}