
import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants';
import Icon from '../components/ui/Icon';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-150px)] flex flex-col items-center justify-center text-center p-4">
      <Icon name="Frown" size={64} className="text-blue-500 mb-4" />
      <h1 className="text-4xl font-bold text-white mb-2">Error 404</h1>
      <p className="text-xl text-gray-300 mb-6">¡Ups! Parece que esta página se perdió en el multiverso.</p>
      <p className="text-gray-400 mb-8">
        No te preocupes, puedes volver a un lugar seguro.
      </p>
      <Button 
        onClick={() => window.history.back()} 
        variant="secondary" 
        className="mr-4"
        leftIcon={<Icon name="ArrowLeft" size={18}/>}
      >
        Volver Atrás
      </Button>
      <Link to={ROUTES.DASHBOARD}>
        <Button variant="primary" leftIcon={<Icon name="Home" size={18}/>}>
            Ir al Inicio
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
