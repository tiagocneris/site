import React, { useState } from 'react';
import { Camera, MapPin, Upload, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LocationPicker from './LocationPicker';
import SuccessModal from './SuccessModal';
import { validateCPF, validatePhoneNumber, validateLicensePlate } from '../../utils/validators/deliveryValidator';

interface FormData {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  vehicleType: 'moto' | 'car';
  licensePlate: string;
  address: string;
  documents: {
    license?: File;
    vehiclePhoto?: File;
  };
  location: {
    lat: number;
    lng: number;
  } | null;
  termsAccepted: boolean;
}

interface DeliveryRegistrationFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  submitted: boolean;
}

export default function DeliveryRegistrationForm({ onSubmit, submitted }: DeliveryRegistrationFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    vehicleType: 'moto',
    licensePlate: '',
    address: '',
    documents: {},
    location: null,
    termsAccepted: false
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const validateForm = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.name) newErrors.name = 'Nome é obrigatório';
    if (!validateCPF(formData.cpf)) newErrors.cpf = 'CPF inválido';
    if (!validatePhoneNumber(formData.phone)) newErrors.phone = 'Telefone inválido';
    if (!validateLicensePlate(formData.licensePlate)) newErrors.licensePlate = 'Placa inválida';
    if (!formData.documents.license) newErrors.documents = 'CNH é obrigatória';
    if (!formData.documents.vehiclePhoto) newErrors.documents = 'Foto do veículo é obrigatória';
    if (!formData.location) newErrors.location = 'Localização é obrigatória';
    if (!formData.termsAccepted) newErrors.termsAccepted = 'Você precisa aceitar os termos';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setLoading(true);
      await onSubmit(formData);
    } catch (error) {
      console.error('Error registering delivery partner:', error);
      setErrors(prev => ({
        ...prev,
        submit: 'Erro ao cadastrar. Tente novamente.'
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'license' | 'vehiclePhoto') => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        documents: {
          ...prev.documents,
          [type]: e.target.files![0]
        }
      }));
      setErrors(prev => ({ ...prev, documents: '' }));
    }
  };

  const handleLocationSelect = (location: { lat: number; lng: number; address: string }) => {
    setFormData(prev => ({
      ...prev,
      location: { lat: location.lat, lng: location.lng },
      address: location.address
    }));
    setErrors(prev => ({ ...prev, location: '' }));
  };

  if (submitted) {
    return <SuccessModal onClose={() => navigate('/')} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-600 mb-2">
            Nome Completo
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
            required
          />
          {errors.name && (
            <p className="text-sm text-red-600 mt-1">{errors.name}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-600 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
              required
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-600 mb-2">
              Telefone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
              required
            />
            {errors.phone && (
              <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-600 mb-2">
              CPF
            </label>
            <input
              type="text"
              value={formData.cpf}
              onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
              required
            />
            {errors.cpf && (
              <p className="text-sm text-red-600 mt-1">{errors.cpf}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-600 mb-2">
              Tipo de Veículo
            </label>
            <select
              value={formData.vehicleType}
              onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value as 'moto' | 'car' })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
              required
            >
              <option value="moto">Moto</option>
              <option value="car">Carro (Uber Pet)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-600 mb-2">
            Placa do Veículo
          </label>
          <input
            type="text"
            value={formData.licensePlate}
            onChange={(e) => setFormData({ ...formData, licensePlate: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
            required
          />
          {errors.licensePlate && (
            <p className="text-sm text-red-600 mt-1">{errors.licensePlate}</p>
          )}
        </div>
      </div>

      {/* Document Upload */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-600 mb-2">
            CNH (Carteira Nacional de Habilitação)
          </label>
          <label className="block w-full p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-[#36c6c6] transition-colors cursor-pointer">
            <div className="flex flex-col items-center">
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-500">
                Clique para fazer upload da sua CNH
              </span>
            </div>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => handleFileUpload(e, 'license')}
              className="hidden"
            />
          </label>
          {errors.documents && (
            <p className="text-sm text-red-600 mt-1">{errors.documents}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-600 mb-2">
            Foto do Veículo
          </label>
          <label className="block w-full p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-[#36c6c6] transition-colors cursor-pointer">
            <div className="flex flex-col items-center">
              <Camera className="h-8 w-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-500">
                Clique para fazer upload da foto do seu veículo
              </span>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, 'vehiclePhoto')}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Location */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-600 mb-2">
            Localização
          </label>
          <LocationPicker onLocationSelect={handleLocationSelect} />
          {errors.location && (
            <p className="text-sm text-red-600 mt-1">{errors.location}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-600 mb-2">
            Endereço Completo
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
            required
          />
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="space-y-4">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={formData.termsAccepted}
            onChange={(e) => setFormData(prev => ({ ...prev, termsAccepted: e.target.checked }))}
            className="mt-1 rounded border-gray-300 text-[#36c6c6] focus:ring-[#36c6c6]"
          />
          <span className="text-sm text-neutral-600">
            Li e aceito os{' '}
            <a href="/terms" className="text-[#36c6c6] hover:underline">
              Termos e Condições
            </a>
            {' '}e a{' '}
            <a href="/privacy" className="text-[#36c6c6] hover:underline">
              Política de Privacidade
            </a>
          </span>
        </label>
        {errors.termsAccepted && (
          <p className="text-sm text-red-600">{errors.termsAccepted}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-[#36c6c6] text-white px-6 py-3 rounded-full hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-colors"
        >
          {loading ? 'Enviando...' : 'Cadastrar'}
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex-1 border border-gray-200 px-6 py-3 rounded-full hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
      </div>

      {/* Error Message */}
      {errors.submit && (
        <div className="flex items-center gap-2 p-4 rounded-lg bg-red-50 text-red-600">
          <AlertTriangle className="h-5 w-5" />
          <p>{errors.submit}</p>
        </div>
      )}
    </form>
  );
}