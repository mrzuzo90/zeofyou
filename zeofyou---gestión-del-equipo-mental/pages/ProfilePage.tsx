
import React, { useState } from 'react';
import { useAuth } from '../contexts/AppProviders';
import Avatar from '../components/ui/Avatar';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
// FIX: Import IconName type from ../components/ui/Icon
import Icon, { IconName } from '../components/ui/Icon';

interface DetailItemProps {
  label: string;
  value: string | undefined;
  icon?: IconName;
}
const DetailItem: React.FC<DetailItemProps> = ({ label, value, icon }) => (
  <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
    <dt className="text-sm font-medium text-gray-400 flex items-center">
      {icon && <Icon name={icon} size={18} className="mr-2 text-gray-500" />}
      {label}
    </dt>
    <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">{value || '-'}</dd>
  </div>
);


const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  // For a real app, you'd fetch and update profile details via context/API
  const [editUser, setEditUser] = useState(user); 

  if (!user) {
    return <p>Cargando perfil...</p>; // Or redirect to login
  }
  
  const handleEditToggle = () => setIsEditing(!isEditing);
  const handleSave = () => {
      // Here you would call an updateProfile function from your context/API
      console.log("Guardando perfil:", editUser);
      setIsEditing(false);
      // Potentially update the main user object in AuthContext
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editUser) {
        setEditUser({...editUser, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-800 shadow-xl rounded-lg border border-gray-700 overflow-hidden">
      <div className="px-4 py-5 sm:px-6 bg-gray-700/50 border-b border-gray-700">
        <h3 className="text-lg leading-6 font-medium text-white">Perfil de Usuario</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-400">Información personal y configuración de la cuenta.</p>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <div className="flex flex-col items-center sm:flex-row sm:items-start mb-6">
          <Avatar src={user.avatarUrl} alt={user.name} size="xl" className="mb-4 sm:mb-0 sm:mr-6 ring-2 ring-blue-500" />
          <div className="text-center sm:text-left flex-grow">
            <h2 className="text-2xl font-bold text-white">{user.name}</h2>
            <p className="text-md text-blue-400">{user.email}</p>
            {isEditing ? (
                <Input name="role" value={editUser?.role || ''} onChange={handleChange} placeholder="Rol Principal" className="mt-2"/>
            ) : (
                <p className="text-sm text-gray-300 mt-1">{user.role || 'Rol no especificado'}</p>
            )}
          </div>
          <Button onClick={handleEditToggle} variant={isEditing ? "secondary" : "primary"} className="mt-4 sm:mt-0" leftIcon={<Icon name={isEditing ? "X" : "Edit3"} size={16}/>}>
            {isEditing ? 'Cancelar' : 'Editar Perfil'}
          </Button>
        </div>

        <dl className="divide-y divide-gray-700">
          <DetailItem label="Nombre Completo" value={isEditing ? undefined : user.name} icon="UserCircle" />
          {isEditing && <Input name="name" value={editUser?.name || ''} onChange={handleChange} className="mb-2"/>}
          
          <DetailItem label="Email" value={isEditing ? undefined : user.email} icon="Mail" />
          {isEditing && <Input type="email" name="email" value={editUser?.email || ''} onChange={handleChange} className="mb-2"/>}
          
          <DetailItem label="Departamento" value={isEditing ? undefined : user.department} icon="Briefcase" />
          {isEditing && <Input name="department" value={editUser?.department || ''} onChange={handleChange} className="mb-2"/>}

          <DetailItem label="Ubicación" value={isEditing ? undefined : user.location} icon="MapPin" />
          {isEditing && <Input name="location" value={editUser?.location || ''} onChange={handleChange} className="mb-2"/>}
        </dl>

        {isEditing && (
             <Button onClick={handleSave} variant="primary" fullWidth className="mt-6" leftIcon={<Icon name="Save" size={18}/>}>Guardar Cambios</Button>
        )}

        <div className="mt-8 border-t border-gray-700 pt-6">
            <Button onClick={logout} variant="danger" fullWidth leftIcon={<Icon name="LogOut" size={18}/>}>
                Cerrar Sesión
            </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;