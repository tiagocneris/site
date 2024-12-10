import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface InvestorFormProps {
  onSubmitSuccess: () => void;
}

export default function InvestorForm({ onSubmitSuccess }: InvestorFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Store in Supabase
      const { error: submitError } = await supabase
        .from('investor_contacts')
        .insert([formData]);

      if (submitError) throw submitError;

      // Send email notification
      const { error: emailError } = await supabase
        .functions.invoke('send-investor-email', {
          body: {
            to: 'tiagoneris13@gmail.com',
            subject: 'Nova Proposta de Investidor - Love&Connection',
            investorData: {
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              message: formData.message
            }
          }
        });

      if (emailError) throw emailError;

      onSubmitSuccess();
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setError('Erro ao enviar formulário. Por favor, tente novamente.');
      console.error('Form submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
        Interessado em Investir?
      </h2>
      <p className="text-gray-600 mb-8 text-center">
        Preencha o formulário abaixo e nossa equipe entrará em contato.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome Completo
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Telefone
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mensagem
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
            required
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#36c6c6] text-white px-6 py-3 rounded-full hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            'Enviando...'
          ) : (
            <>
              <Send className="h-5 w-5" />
              <span>Enviar Mensagem</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}