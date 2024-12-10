import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Users, Target, BarChart, Send } from 'lucide-react';
import InvestorHero from '../components/investor/InvestorHero';
import InvestorBenefits from '../components/investor/InvestorBenefits';
import InvestorOfferings from '../components/investor/InvestorOfferings';
import ExpansionRoadmap from '../components/investor/ExpansionRoadmap';
import InvestorForm from '../components/investor/InvestorForm';

export default function InvestorPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);

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

      <InvestorHero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <InvestorBenefits />
        <InvestorOfferings />
        <ExpansionRoadmap />

        {/* Statistics Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Números que Impressionam</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Users, value: '50k+', label: 'Usuários Ativos' },
              { icon: Target, value: '200+', label: 'Parceiros' },
              { icon: BarChart, value: '300%', label: 'Crescimento Anual' },
              { icon: TrendingUp, value: 'R$2M+', label: 'GMV Mensal' }
            ].map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="w-12 h-12 bg-[#B2FFFF] rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-6 w-6 text-[#36c6c6]" />
                </div>
                <p className="text-2xl font-bold text-[#36c6c6] mb-2">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact" className="max-w-2xl mx-auto">
          <InvestorForm onSubmitSuccess={() => setFormSubmitted(true)} />
        </section>
      </div>
    </div>
  );
}