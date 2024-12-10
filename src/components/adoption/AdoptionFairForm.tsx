import React, { useState } from 'react';
import { X, Camera, MapPin, Calendar, Clock, AlertTriangle } from 'lucide-react';
import { useAuth } from '../auth/AuthProvider';
import { supabase } from '../../lib/supabase';

interface AdoptionFairFormProps {
  onClose: () => void;
}

export default function AdoptionFairForm({ onClose }: AdoptionFairFormProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
    address: '',
    description: '',
    image: null as File | null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      let imageUrl = '';

      if (formData.image) {
        const fileExt = formData.image.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `adoption-fairs/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('adoption-fairs')
          .upload(filePath, formData.image);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('adoption-fairs')
          .getPublicUrl(filePath);

        imageUrl = publicUrl;
      }

      const { error: insertError } = await supabase
        .from('adoption_fairs')
        .insert({
          ong_id: user.id,
          name: formData.name,
          date: formData.date,
          time: formData.time,
          location: formData.location,
          address: formData.address,
          description: formData.description,
          image_url: imageUrl,
          status: 'PENDING'
        });

      if (insertError) throw insertError;

      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create adoption fair');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
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
            <h2 className="text-2xl font-semibold text-neutral-800">
              Cadastrar Feira de Adoção
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-600 mb-2">
                  Nome da Feira
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-600 mb-2">
                    Data
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
                      required
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-600 mb-2">
                    Horário
                  </label>
                  <div className="relative">
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
                      required
                    />
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-600 mb-2">
                  Local
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
                  placeholder="Ex: Parque Villa-Lobos"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-600 mb-2">
                  Endereço Completo
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
                    placeholder="Rua, número, bairro, cidade - Estado"
                    required
                  />
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-600 mb-2">
                  Descrição
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
                  rows={4}
                  placeholder="Descreva os detalhes da feira, quantidade de animais, requisitos para adoção, etc."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-600 mb-2">
                  Imagem da Feira
                </label>
                <label className="block w-full p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-[#36c6c6] transition-colors cursor-pointer">
                  <div className="flex flex-col items-center">
                    <Camera className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">
                      Clique para fazer upload de uma imagem
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-50 rounded-lg text-red-600">
                <AlertTriangle className="h-5 w-5" />
                <p>{error}</p>
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#36c6c6] text-white px-6 py-3 rounded-full hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-colors disabled:opacity-50"
              >
                {loading ? 'Cadastrando...' : 'Cadastrar Feira'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border border-gray-200 px-6 py-3 rounded-full hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}