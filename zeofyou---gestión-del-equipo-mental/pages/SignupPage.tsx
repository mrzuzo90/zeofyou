
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AppProviders';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { ROUTES, APP_NAME } from '../constants';
import Icon from '../components/ui/Icon';

const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      await signup(name, email, password);
      navigate(ROUTES.DASHBOARD);
    } catch (err: any) {
      setError(err.message || 'Error al registrarse. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4">
      <div className="max-w-md w-full bg-gray-800 shadow-xl rounded-lg p-8 border border-gray-700">
        <div className="text-center mb-8">
          <Icon name="UserPlus" size={48} className="mx-auto text-blue-500 mb-3" />
          <h1 className="text-3xl font-bold text-white">Crea tu cuenta en {APP_NAME}</h1>
          <p className="text-gray-400 mt-1">Comienza a coordinar tu equipo interno.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Nombre Completo"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu Nombre Completo"
            required
            icon={<Icon name="UserCircle" size={18} className="text-gray-500"/>}
          />
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
            placeholder="Mínimo 8 caracteres"
            required
            icon={<Icon name="Lock" size={18} className="text-gray-500"/>}
          />
          <Input
            label="Confirmar Contraseña"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repite tu contraseña"
            required
            icon={<Icon name="Key" size={18} className="text-gray-500"/>}
          />
          
          {error && <p className="text-sm text-red-400 text-center">{error}</p>}
          
          <Button type="submit" variant="primary" fullWidth size="lg" disabled={isLoading} leftIcon={isLoading ? <Icon name="LoaderCircle" size={20} className="animate-spin"/> : <Icon name="CheckCircle" size={20}/>}>
            {isLoading ? 'Registrando...' : 'Registrarse'}
          </Button>
        </form>
        
        <p className="text-sm text-gray-400 text-center mt-8">
          ¿Ya tienes una cuenta?{' '}
          <Link to={ROUTES.LOGIN} className="font-medium text-blue-400 hover:text-blue-300">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
