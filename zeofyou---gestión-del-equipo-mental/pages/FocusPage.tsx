
import React, { useState } from 'react';
import { useData } from '../contexts/AppProviders';
import useFocusTimer from '../hooks/useFocusTimer';
import CircularTimer from '../components/focus/CircularTimer';
import SelectField from '../components/ui/SelectField';
import Button from '../components/ui/Button';
import { TASK_TYPES, FOCUS_DURATIONS } from '../constants';
import Icon from '../components/ui/Icon';

const FocusPage: React.FC = () => {
  const { identities } = useData();
  const [taskType, setTaskType] = useState<string>(TASK_TYPES[0]);
  const [activeIdentity, setActiveIdentity] = useState<string>(identities[0]?.id || '');
  const [selectedDuration, setSelectedDuration] = useState<number>(FOCUS_DURATIONS[1]); // Default 25 min

  const { timeLeft, isActive, isPaused, startTimer, pauseTimer, resumeTimer, resetTimer, formattedTime } = useFocusTimer(selectedDuration);

  const handleStartSession = () => {
    if (!isActive) {
      startTimer(selectedDuration);
    }
  };
  
  const handleEndSession = () => {
    resetTimer(selectedDuration);
  };

  const identityOptions = identities.map(id => ({ value: id.id, label: id.name }));
  const durationOptions = FOCUS_DURATIONS.map(d => ({ value: d, label: `${d} minutos` }));

  const currentIdentityName = identities.find(id => id.id === activeIdentity)?.name || 'Identidad';

  if (isActive) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center">
        <h2 className="text-3xl font-semibold text-white mb-2">Sesión de Enfoque Activa</h2>
        <p className="text-gray-400 mb-8">Tarea: <span className="font-medium text-gray-300">{taskType}</span> | Identidad: <span className="font-medium text-gray-300">{currentIdentityName}</span></p>
        
        <CircularTimer duration={selectedDuration * 60} remaining={timeLeft} />

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {!isPaused ? (
            <Button onClick={pauseTimer} variant="secondary" size="lg" leftIcon={<Icon name="Pause" size={20}/>}>Pausar</Button>
          ) : (
            <Button onClick={resumeTimer} variant="primary" size="lg" leftIcon={<Icon name="Play" size={20}/>}>Reanudar</Button>
          )}
          <Button onClick={handleEndSession} variant="danger" size="lg" leftIcon={<Icon name="Square" size={20}/>}>Finalizar Sesión</Button>
          <Button onClick={() => { pauseTimer(); alert("Tomando un descanso de 5 minutos (simulado).");}} variant="ghost" size="lg" leftIcon={<Icon name="Coffee" size={20}/>}>Tomar Descanso</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto bg-gray-800 p-6 sm:p-8 rounded-lg border border-gray-700 shadow-xl">
      <h2 className="text-3xl font-semibold text-white mb-6 text-center">Configurar Sesión de Enfoque</h2>
      <div className="space-y-6">
        <SelectField
          label="Tipo de Tarea"
          options={TASK_TYPES.map(type => ({ value: type, label: type }))}
          value={taskType}
          onChange={(e) => setTaskType(e.target.value)}
        />
        <SelectField
          label="Identidad Activa"
          options={identityOptions}
          value={activeIdentity}
          onChange={(e) => setActiveIdentity(e.target.value)}
        />
        <SelectField
          label="Duración de la Sesión"
          options={durationOptions}
          value={selectedDuration.toString()}
          onChange={(e) => setSelectedDuration(parseInt(e.target.value))}
        />
        <div className="bg-gray-700 p-4 rounded-lg text-center">
            <p className="text-gray-400 text-sm">Puntuación de Enfoque (Ejemplo)</p>
            <p className="text-green-400 text-3xl font-bold">8.2</p>
        </div>
        <Button onClick={handleStartSession} variant="primary" size="lg" fullWidth leftIcon={<Icon name="Zap" size={20}/>}>
          Iniciar Sesión de Enfoque
        </Button>
      </div>
    </div>
  );
};

export default FocusPage;
