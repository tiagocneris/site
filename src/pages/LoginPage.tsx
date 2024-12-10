import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import LoginForm from '../components/auth/LoginForm';
import { useAuth } from '../components/auth/AuthProvider';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const from = location.state?.from?.pathname || '/';

  if (user) {
    navigate(from, { replace: true });
    return null;
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="mb-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-neutral-600 hover:text-[#36c6c6] transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Voltar para Home</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-neutral-800">Entrar</h1>
            <p className="text-neutral-600 mt-2">
              Bem-vindo(a) de volta ao Love&Connection
            </p>
          </div>

          <LoginForm />

          <div className="mt-6 text-center">
            <p className="text-neutral-600">
              Ainda não tem uma conta?{' '}
              <Link
                to="/signup"
                className="text-[#36c6c6] hover:text-[#B2FFFF] font-medium"
              >
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}