
import React from 'react';
import { useData } from '../contexts/AppProviders';
import TextArea from '../components/ui/TextArea';
import Button from '../components/ui/Button';
import { DAILY_BRIEFING_ITEMS } from '../constants';
import TimelineItem from '../components/shared/TimelineItem'; // Reusing for TimeSlot
import Icon from '../components/ui/Icon';

const PlanningPage: React.FC = () => {
  const { dailyPlan, updateDailyPlan, eveningReflection, updateEveningReflection } = useData();

  const handleDailyPlanChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateDailyPlan({ ...dailyPlan, [e.target.name]: e.target.value });
  };

  const handleEveningReflectionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateEveningReflection({ ...eveningReflection, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-10">
      {/* Briefing Diario */}
      <section className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
          <Icon name="Sunrise" size={28} className="mr-3 text-blue-400"/>
          Briefing Diario
        </h2>
        <div className="space-y-3">
          {DAILY_BRIEFING_ITEMS.map(item => (
            <TimelineItem key={item.id} {...item} />
          ))}
        </div>
      </section>

      {/* Planificación */}
      <section className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
          <Icon name="ClipboardList" size={28} className="mr-3 text-blue-400"/>
          Planificación del Día
        </h2>
        <div className="space-y-4">
          <TextArea
            label="¿Qué tienes en mente hoy? (Ideas, tareas sueltas, recordatorios)"
            name="thoughts"
            value={dailyPlan.thoughts}
            onChange={handleDailyPlanChange}
            placeholder="Anota tus pensamientos iniciales para el día..."
            rows={3}
          />
          <TextArea
            label="¿Cuáles son tus 3-5 prioridades principales para hoy?"
            name="priorities"
            value={dailyPlan.priorities}
            onChange={handleDailyPlanChange}
            placeholder="Define tus objetivos clave..."
            rows={3}
          />
          <Button variant="primary" onClick={() => alert('Plan guardado (simulado)')} leftIcon={<Icon name="Save" size={18}/>}>
            Guardar Plan del Día
          </Button>
        </div>
      </section>

      {/* Revisión Vespertina */}
      <section className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
            <Icon name="Sunset" size={28} className="mr-3 text-blue-400"/>
            Revisión Vespertina y Reflexiones
        </h2>
        <div className="space-y-4">
          <TextArea
            label="¿Cómo fue tu día? (Logros, desafíos, aprendizajes)"
            name="daySummary"
            value={eveningReflection.daySummary}
            onChange={handleEveningReflectionChange}
            placeholder="Reflexiona sobre los eventos y tu progreso..."
            rows={3}
          />
          <TextArea
            label="Reflexiona sobre el rol e interacciones de tu equipo interno."
            name="teamReflection"
            value={eveningReflection.teamReflection}
            onChange={handleEveningReflectionChange}
            placeholder="¿Qué identidades destacaron? ¿Hubo algún conflicto o sinergia especial?"
            rows={3}
          />
          <Button variant="secondary" onClick={() => alert('Reflexión guardada (simulada)')} leftIcon={<Icon name="Save" size={18}/>}>
            Guardar Reflexión
          </Button>
        </div>
      </section>
    </div>
  );
};

export default PlanningPage;
