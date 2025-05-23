
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AppProviders';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { ROUTES, APP_NAME } from '../constants';
import Icon from '../components/ui/Icon';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await login(email, password);
      navigate(ROUTES.DASHBOARD);
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4">
      <div className="max-w-md w-full bg-gray-800 shadow-xl rounded-lg p-8 border border-gray-700">
        <div className="text-center mb-8">
          <Icon name="BrainCircuit" size={48} className="mx-auto text-blue-500 mb-3" />
          <h1 className="text-3xl font-bold text-white">Bienvenido a {APP_NAME}</h1>
          <p className="text-gray-400 mt-1">Gestiona tu equipo mental interno.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
            icon={<Icon name="Mail" size={18} className="text-gray-500"/>}
          />
          <Input
            label="Contraseña"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            icon={<Icon name="Lock" size={18} className="text-gray-500"/>}
          />
          
          {error && <p className="text-sm text-red-400 text-center">{error}</p>}
          
          <Button type="submit" variant="primary" fullWidth size="lg" disabled={isLoading} leftIcon={isLoading ? <Icon name="LoaderCircle" size={20} className="animate-spin"/> : <Icon name="LogIn" size={20}/>}>
            {isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
          </Button>
        </form>
        
        <p className="text-sm text-gray-400 text-center mt-8">
          ¿No tienes una cuenta?{' '}
          <Link to={ROUTES.SIGNUP} className="font-medium text-blue-400 hover:text-blue-300">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
