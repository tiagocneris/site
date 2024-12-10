import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Send, MessageCircle, Instagram } from 'lucide-react';
import ChatWidget from '../components/contact/ChatWidget';
import ContactForm from '../components/contact/ContactForm';

export default function ContactPage() {
  const [showChat, setShowChat] = useState(false);

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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Entre em Contato
          </h1>
          <p className="text-lg text-gray-600">
            Estamos aqui para ajudar. Como podemos ser úteis hoje?
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-[#B2FFFF] rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-6 w-6 text-[#36c6c6]" />
            </div>
            <h3 className="text-lg font-semibold text-center mb-2">Email</h3>
            <a 
              href="mailto:loveconnectionbr@gmail.com"
              className="block text-center text-[#36c6c6] hover:text-[#B2FFFF] transition-colors"
            >
              loveconnectionbr@gmail.com
            </a>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-[#B2FFFF] rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-6 w-6 text-[#36c6c6]" />
            </div>
            <h3 className="text-lg font-semibold text-center mb-2">WhatsApp</h3>
            <a 
              href="https://wa.me/5511970388009"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-[#36c6c6] hover:text-[#B2FFFF] transition-colors"
            >
              (11) 97038-8009
            </a>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-[#B2FFFF] rounded-full flex items-center justify-center mx-auto mb-4">
              <Instagram className="h-6 w-6 text-[#36c6c6]" />
            </div>
            <h3 className="text-lg font-semibold text-center mb-2">Instagram</h3>
            <a 
              href="https://instagram.com/loveconnectionbr"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-[#36c6c6] hover:text-[#B2FFFF] transition-colors"
            >
              @loveconnectionbr
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <ContactForm />
        </div>

        {/* Chat Widget */}
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-6 right-6 bg-[#36c6c6] text-white p-4 rounded-full shadow-lg hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-colors"
        >
          <MessageCircle className="h-6 w-6" />
        </button>

        {showChat && <ChatWidget onClose={() => setShowChat(false)} />}
      </div>
    </div>
  );
}