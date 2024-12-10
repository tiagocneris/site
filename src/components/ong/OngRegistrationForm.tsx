import React, { useState } from 'react';
import { Camera, MapPin, Link as LinkIcon, AlertTriangle } from 'lucide-react';
import { useOngStore } from '../../store/ongStore';
import { validateCNPJ, validatePhone, validateEmail, validateWebsite } from '../../utils/validators/ongValidator';

interface FormData {
  name: string;
  cnpj: string;
  description: string;
  responsibleName: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  socialMedia: {
    instagram: string;
    facebook: string;
  };
  logo: File | null;
  termsAccepted: boolean;
}

export default function OngRegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    cnpj: '',
    description: '',
    responsibleName: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    socialMedia: {
      instagram: '',
      facebook: ''
    },
    logo: null,
    termsAccepted: false
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const validateForm = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.name) newErrors.name = 'Nome é obrigatório';
    if (!validateCNPJ(formData.cnpj)) newErrors.cnpj = 'CNPJ inválido';
    if (!validateEmail(formData.email)) newErrors.email = 'Email inválido';
    if (!validatePhone(formData.phone)) newErrors.phone = 'Telefone inválido';
    if (!validateWebsite(formData.website)) newErrors.website = 'Website inválido';
    if (!formData.termsAccepted) newErrors.termsAccepted = 'Você precisa aceitar os termos';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      // Here you would typically send the data to your API
      console.log('Form submitted:', formData);
      // Show success message or redirect
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({
        submit: 'Erro ao enviar o formulário. Tente novamente.'
      });
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, logo: e.target.files[0] });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <div>
        <h3 className="text-lg font-semibold text-neutral-800 mb-4">Informações Básicas</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-600 mb-2">
              Nome da ONG
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.name ? 'border-red-500' : 'border-gray-200'
              } focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50`}
              required
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-600 mb-2">
              CNPJ
            </label>
            <input
              type="text"
              value={formData.cnpj}
              onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.cnpj ? 'border-red-500' : 'border-gray-200'
              } focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50`}
              placeholder="00.000.000/0000-00"
              required
            />
            {errors.cnpj && (
              <p className="mt-1 text-sm text-red-600">{errors.cnpj}</p>
            )}
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
              placeholder="Descreva a missão e os objetivos da ONG"
              required
            />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div>
        <h3 className="text-lg font-semibold text-neutral-800 mb-4">Informações de Contato</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-600 mb-2">
              Nome do Responsável
            </label>
            <input
              type="text"
              value={formData.responsibleName}
              onChange={(e) => setFormData({ ...formData, responsibleName: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-600 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.email ? 'border-red-500' : 'border-gray-200'
              } focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50`}
              required
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
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
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.phone ? 'border-red-500' : 'border-gray-200'
              } focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50`}
              placeholder="(00) 00000-0000"
              required
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-600 mb-2">
              Website
            </label>
            <div className="relative">
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                  errors.website ? 'border-red-500' : 'border-gray-200'
                } focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50`}
                placeholder="https://"
              />
              <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            {errors.website && (
              <p className="mt-1 text-sm text-red-600">{errors.website}</p>
            )}
          </div>
        </div>
      </div>

      {/* Address */}
      <div>
        <h3 className="text-lg font-semibold text-neutral-800 mb-4">Endereço</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
            placeholder="Endereço completo"
            required
          />
          <button
            type="button"
            className="p-2 rounded-lg border border-gray-200 hover:border-[#36c6c6] text-gray-600 hover:text-[#36c6c6]"
          >
            <MapPin className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Social Media */}
      <div>
        <h3 className="text-lg font-semibold text-neutral-800 mb-4">Redes Sociais</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-600 mb-2">
              Instagram
            </label>
            <input
              type="text"
              value={formData.socialMedia.instagram}
              onChange={(e) => setFormData({
                ...formData,
                socialMedia: { ...formData.socialMedia, instagram: e.target.value }
              })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
              placeholder="@usuario"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-600 mb-2">
              Facebook
            </label>
            <input
              type="text"
              value={formData.socialMedia.facebook}
              onChange={(e) => setFormData({
                ...formData,
                socialMedia: { ...formData.socialMedia, facebook: e.target.value }
              })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
              placeholder="facebook.com/pagina"
            />
          </div>
        </div>
      </div>

      {/* Logo Upload */}
      <div>
        <h3 className="text-lg font-semibold text-neutral-800 mb-4">Logo da ONG</h3>
        <label className="block w-full p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-[#36c6c6] transition-colors cursor-pointer">
          <div className="flex flex-col items-center">
            <Camera className="h-8 w-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">
              Clique para fazer upload da logo da ONG
            </span>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Terms and Warning */}
      <div className="space-y-4">
        <div className="flex items-start gap-2 p-4 bg-yellow-50 rounded-lg">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <p className="text-sm text-yellow-600">
            Ao cadastrar sua ONG, você concorda com os termos de uso e políticas do Love&Connection.
            O cadastro passará por uma análise antes de ser aprovado.
          </p>
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.termsAccepted}
            onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
            className="rounded border-gray-300 text-[#36c6c6] focus:ring-[#36c6c6]"
          />
          <span className="text-sm text-neutral-600">
            Declaro que sou responsável legal pela ONG e que todas as informações fornecidas são verdadeiras
          </span>
        </label>
        {errors.termsAccepted && (
          <p className="text-sm text-red-600">{errors.termsAccepted}</p>
        )}
      </div>

      {errors.submit && (
        <div className="flex items-center gap-2 p-4 bg-red-50 rounded-lg text-red-600">
          <AlertTriangle className="h-5 w-5" />
          <p>{errors.submit}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-[#36c6c6] text-white px-6 py-3 rounded-full hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-colors"
      >
        Enviar Cadastro
      </button>
    </form>
  );
}