
import React, { useState } from 'react';
import { useData } from '../contexts/AppProviders';
import IdentityCard from '../components/cards/IdentityCard';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import TextArea from '../components/ui/TextArea';
import SelectField from '../components/ui/SelectField';
import { Identity } from '../types';
import Icon from '../components/ui/Icon';

const IdentitiesPage: React.FC = () => {
  const { identities, addIdentity } = useData();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newIdentity, setNewIdentity] = useState<Omit<Identity, 'id' | 'avatar'>>({
    name: '',
    role: '',
    status: 'activo',
    description: '',
    energyLevel: 75,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewIdentity(prev => ({ ...prev, [name]: value }));
  };

  const handleAddIdentity = (e: React.FormEvent) => {
    e.preventDefault();
    if (newIdentity.name && newIdentity.role && newIdentity.description) {
      const avatarSeed = newIdentity.name.toLowerCase().replace(/\s+/g, '-');
      addIdentity({ ...newIdentity, avatar: `https://picsum.photos/seed/${avatarSeed}/64/64` });
      setNewIdentity({ name: '', role: '', status: 'activo', description: '', energyLevel: 75 });
      setShowAddForm(false);
    }
  };

  return (
    <div className="space-y-8">
      <section className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h2 className="text-2xl font-semibold text-white mb-3">¿Qué son las Identidades Internas?</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          En Zeofyou, tus "identidades internas" son las diferentes facetas de tu personalidad o los roles que asumes para gestionar tu vida y trabajo. Piensa en ellas como los miembros de tu equipo mental personal: El Estratega, El Creativo, El Organizador, El Coach, etc. Cada identidad tiene fortalezas, debilidades y contribuye de manera única a tus objetivos generales.
        </p>
        <p className="text-gray-300 leading-relaxed">
          Gestionar estas identidades te permite aprovechar sus talentos específicos, equilibrar sus energías y fomentar una colaboración interna más efectiva para mejorar tu bienestar y productividad.
        </p>
      </section>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Mis Identidades</h2>
        <Button onClick={() => setShowAddForm(!showAddForm)} leftIcon={<Icon name={showAddForm ? "X" : "Plus"} size={18}/>}>
          {showAddForm ? 'Cancelar' : 'Crear Nueva Identidad'}
        </Button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddIdentity} className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8 space-y-4">
          <h3 className="text-xl font-semibold text-white mb-4">Añadir Nueva Identidad</h3>
          <Input label="Nombre de la Identidad" name="name" value={newIdentity.name} onChange={handleInputChange} placeholder="Ej: El Innovador" required />
          <Input label="Rol Principal" name="role" value={newIdentity.role} onChange={handleInputChange} placeholder="Ej: Generador de Ideas" required />
          <TextArea label="Descripción" name="description" value={newIdentity.description} onChange={handleInputChange} placeholder="Describe sus funciones y características" required />
          <SelectField label="Estado Inicial" name="status" value={newIdentity.status} onChange={handleInputChange} options={[{value: 'activo', label: 'Activo'}, {value: 'descansando', label: 'Descansando'}, {value: 'ocupado', label: 'Ocupado'}]} />
          <div>
            <label htmlFor="energyLevel" className="block text-sm font-medium text-gray-300 mb-1">Nivel de Energía (0-100)</label>
            <Input type="number" id="energyLevel" name="energyLevel" value={newIdentity.energyLevel} onChange={handleInputChange} min="0" max="100" className="w-full" />
          </div>
          <Button type="submit" variant="primary" fullWidth>Guardar Identidad</Button>
        </form>
      )}

      <section>
        {identities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {identities.map(identity => (
              <IdentityCard key={identity.id} {...identity} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500 bg-gray-800 rounded-lg border border-gray-700">
            <Icon name="Users" size={48} className="mx-auto mb-2" />
            <p>No has definido ninguna identidad aún.</p>
            <p>¡Crea tu primera identidad para empezar!</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default IdentitiesPage;
