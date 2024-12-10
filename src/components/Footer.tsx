import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Youtube, Home, Search, User, ShoppingCart } from 'lucide-react';

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'Youtube' }
];

const navigationLinks = [
  { icon: Home, label: 'Home', to: '/' },
  { icon: Search, label: 'Explorar Serviços', to: '/explore' },
  { icon: User, label: 'Minha Conta', to: '/account' },
  { icon: ShoppingCart, label: 'Carrinho', to: '/cart' }
];

const quickLinks = [
  { name: 'Termos de Uso', href: '/terms' },
  { name: 'Política de Privacidade', href: '/privacy' },
  { name: 'Contato', href: '/contact' },
  { name: 'Blog', href: '/blog' },
  { name: 'Sobre Nós', href: '/about' }
];

export default function Footer() {
  return (
    <footer className="bg-[#36c6c6] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img 
                src="https://storage.googleapis.com/imagensapp/love%20connection%20pet%20center-Photoroom.png" 
                alt="Love Connection Pet Center" 
                className="h-12 w-auto"
              />
            </div>
            <p className="text-sm text-gray-100">
              Conectando amor e cuidado para seu melhor amigo.
            </p>
            <div className="text-sm text-gray-100">
              <p>Rua Caetanopolis, 636</p>
              <p>Jaguaré - SP</p>
              <p>Tel: (11) 97038-8009</p>
              <p>Email: privacidade@loveconnection.com.br</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-gray-100 hover:text-[#B2FFFF] transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navegação</h3>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="flex items-center gap-2 text-gray-100 hover:text-[#B2FFFF] transition-colors duration-200"
                  >
                    <link.icon className="h-4 w-4" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-gray-100 mb-4">
              Receba dicas e novidades para o seu pet
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="w-full px-4 py-2 rounded-full bg-white/10 border border-white/20 focus:outline-none focus:border-[#B2FFFF] text-white placeholder-gray-300"
              />
              <button
                type="submit"
                className="w-full bg-[#B2FFFF] text-[#36c6c6] py-2 px-4 rounded-full hover:bg-white transition-colors duration-200 font-medium"
              >
                Inscrever-se
              </button>
            </form>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-gray-100 hover:text-[#B2FFFF] transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
            <div className="flex flex-col items-center space-y-2">
              <p className="text-sm text-gray-100">
                © {new Date().getFullYear()} Love Connection Pet Center. Todos os direitos reservados.
              </p>
              <p className="text-sm text-gray-100">
                Criado e desenvolvido por Tiago C Designer
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}