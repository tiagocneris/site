import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PrivacyHeader from '../components/privacy/PrivacyHeader';
import InformationSection from '../components/privacy/InformationSection';
import DataUsageSection from '../components/privacy/DataUsageSection';
import DataSharingSection from '../components/privacy/DataSharingSection';
import ContactSection from '../components/privacy/ContactSection';

export default function PrivacyPolicyPage() {
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
              src="https://storage.googleapis.com/imagensapp/love%20connection%20pet%20center-Photoroom.png" 
              alt="Love&Connection Logo" 
              className="h-[68px] w-auto"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PrivacyHeader />

        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="prose max-w-none text-gray-600">
            <p>A Love&Connection Pet Center valoriza sua privacidade e está comprometida em proteger os dados pessoais que você compartilha conosco. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações. Ao utilizar nossos serviços, você concorda com os termos descritos abaixo.</p>
            
            <InformationSection />
            <DataUsageSection />
            <DataSharingSection />
            
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. Proteção de Dados</h2>
            <p>Adotamos medidas técnicas e organizacionais para proteger suas informações contra acesso não autorizado, perda, destruição ou alteração. Algumas das práticas incluem:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Criptografia de dados sensíveis;</li>
              <li>Controle de acesso baseado em permissões;</li>
              <li>Monitoramento contínuo de vulnerabilidades.</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">5. Seus Direitos</h2>
            <p>Você tem os seguintes direitos em relação aos seus dados pessoais:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Acessar, corrigir ou excluir seus dados pessoais armazenados;</li>
              <li>Revogar seu consentimento para o processamento de dados (quando aplicável);</li>
              <li>Solicitar a transferência de suas informações para outro provedor;</li>
              <li>Registrar uma reclamação junto às autoridades competentes de proteção de dados.</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">6. Cookies e Tecnologias Semelhantes</h2>
            <p>Utilizamos cookies para:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Melhorar a funcionalidade do site e do aplicativo;</li>
              <li>Análise de desempenho e comportamento de usuários;</li>
              <li>Personalização de conteúdo e publicidade.</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">7. Retenção de Dados</h2>
            <p>Mantemos suas informações pelo tempo necessário para cumprir os propósitos descritos nesta política, a menos que um período de retenção mais longo seja exigido ou permitido por lei.</p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">8. Alterações nesta Política</h2>
            <p>Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre alterações significativas por meio de nosso site, aplicativo ou por e-mail. Recomendamos que revise esta política regularmente.</p>

            <ContactSection />
          </div>
        </div>
      </div>
    </div>
  );
}