import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import TermsHeader from '../components/terms/TermsHeader';
import DefinitionsSection from '../components/terms/DefinitionsSection';
import UsageSection from '../components/terms/UsageSection';
import FeaturesSection from '../components/terms/FeaturesSection';
import ContactSection from '../components/terms/ContactSection';

export default function TermsOfUsePage() {
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
        <TermsHeader />

        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="prose max-w-none text-gray-600">
            <p>
              Bem-vindo ao Love&Connection Pet Center! Estes Termos de Uso regem o acesso e uso de nosso aplicativo e site. 
              Ao utilizar nossos serviços, você concorda em cumprir integralmente os termos e condições aqui descritos. 
              Caso não concorde com estes Termos, recomendamos não utilizar nossa plataforma.
            </p>

            <DefinitionsSection />

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. Aceitação dos Termos</h2>
            <p>
              Ao criar uma conta, acessar ou utilizar qualquer funcionalidade da Plataforma, 
              o Usuário declara que leu, compreendeu e concorda com estes Termos de Uso.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. Cadastro e Contas</h2>
            <ul className="list-disc pl-6 mb-4">
              <li>O Usuário deve fornecer informações verdadeiras, completas e atualizadas no momento do cadastro.</li>
              <li>O uso de contas por terceiros é proibido. O Usuário é responsável por proteger seus dados de login e senha.</li>
              <li>Contas de clínicas veterinárias devem incluir o número válido do CRMV.</li>
            </ul>

            <UsageSection />
            <FeaturesSection />

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">6. Direitos e Responsabilidades</h2>
            <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">6.1 Love&Connection Pet Center</h3>
            <p>Reservamo-nos o direito de:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Atualizar ou remover funcionalidades sem aviso prévio.</li>
              <li>Excluir contas que violem estes Termos ou que utilizem a Plataforma de forma indevida.</li>
              <li>Moderar o conteúdo publicado pelos Usuários.</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">6.2 Usuário</h3>
            <p>O Usuário é responsável por:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>As informações fornecidas durante o cadastro e o uso da Plataforma.</li>
              <li>Garantir que qualquer conteúdo postado respeite as leis aplicáveis e direitos de terceiros.</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">7. Políticas de Pagamento e Taxas</h2>
            <ul className="list-disc pl-6 mb-4">
              <li>Serviços oferecidos a vendedores estão sujeitos a taxas de transação, mensalidades e/ou comissões.</li>
              <li>Planos de assinatura oferecem benefícios diferenciados e são regidos por contratos específicos.</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">8. Propriedade Intelectual</h2>
            <ul className="list-disc pl-6 mb-4">
              <li>Todo o conteúdo da Plataforma, incluindo design, logotipos, textos e funcionalidades, é de propriedade do Love&Connection Pet Center e protegido pelas leis de direitos autorais.</li>
              <li>O uso não autorizado de qualquer parte do conteúdo é estritamente proibido.</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">9. Privacidade</h2>
            <p>As informações coletadas são tratadas de acordo com nossa Política de Privacidade. É essencial que o Usuário leia este documento para compreender como seus dados são utilizados.</p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">10. Limitação de Responsabilidade</h2>
            <p>O Love&Connection Pet Center não se responsabiliza por:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Atos ou omissões de usuários, ONGs ou prestadores de serviços cadastrados.</li>
              <li>Perdas ou danos decorrentes do uso da Plataforma, exceto nos casos previstos por lei.</li>
              <li>Problemas técnicos, interrupções ou falhas de conexão.</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">11. Alterações nos Termos</h2>
            <p>Reservamo-nos o direito de modificar estes Termos a qualquer momento. Avisos sobre alterações serão publicados na Plataforma. O uso contínuo após mudanças indica aceitação das novas condições.</p>

            <ContactSection />
          </div>
        </div>
      </div>
    </div>
  );
}