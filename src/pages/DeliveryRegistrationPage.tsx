import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import DeliveryRegistrationForm from '../components/delivery/DeliveryRegistrationForm';
import { useAuth } from '../components/auth/AuthProvider';
import { supabase } from '../lib/supabase';

export default function DeliveryRegistrationPage() {
  const { user } = useAuth();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (formData: any) => {
    try {
      if (!user) throw new Error('User not authenticated');

      // Upload documents
      const uploadFile = async (file: File, path: string) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${path}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('delivery-documents')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('delivery-documents')
          .getPublicUrl(filePath);

        return publicUrl;
      };

      const [licenseUrl, vehiclePhotoUrl] = await Promise.all([
        uploadFile(formData.documents.license, 'licenses'),
        uploadFile(formData.documents.vehiclePhoto, 'vehicle-photos')
      ]);

      // Create delivery partner record
      const { error: insertError } = await supabase
        .from('delivery_partners')
        .insert({
          user_id: user.id,
          cpf: formData.cpf,
          vehicle_type: formData.vehicleType,
          license_plate: formData.licensePlate,
          documents: {
            license: licenseUrl,
            vehiclePhoto: vehiclePhotoUrl
          },
          status: 'PENDING'
        });

      if (insertError) throw insertError;

      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      throw error;
    }
  };

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

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h1 className="text-2xl font-bold text-neutral-800 mb-2">
            Cadastro de Entregadores
          </h1>
          <p className="text-neutral-600 mb-8">
            Faça parte da nossa equipe de entregadores e ajude a conectar pets e famílias felizes
          </p>

          <DeliveryRegistrationForm onSubmit={handleSubmit} submitted={submitted} />
        </div>

        {/* Quick Links */}
        <div className="mt-8 flex justify-center gap-8 text-neutral-600">
          <Link
            to="/help"
            className="hover:text-[#36c6c6] transition-colors"
          >
            Ajuda
          </Link>
          <Link
            to="/privacy"
            className="hover:text-[#36c6c6] transition-colors"
          >
            Política de Privacidade
          </Link>
          <Link
            to="/terms"
            className="hover:text-[#36c6c6] transition-colors"
          >
            Termos de Uso
          </Link>
        </div>
      </div>
    </div>
  );
}