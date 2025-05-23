
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import MetricCard from '../components/cards/MetricCard';
import { ENERGY_LEVELS_DATA, ROLE_BALANCE_DATA, OPTIMIZATION_TIPS } from '../constants';
import Icon from '../components/ui/Icon';
import { IconName } from '../components/ui/Icon';


interface OptimizationTipProps {
  icon: IconName;
  title: string;
  children: React.ReactNode;
}

const OptimizationTip: React.FC<OptimizationTipProps> = ({ icon, title, children }) => (
  <div className="bg-gray-700 p-4 rounded-lg flex items-start">
    <Icon name={icon} size={24} className="text-blue-400 mr-4 mt-1 flex-shrink-0" />
    <div>
      <h4 className="font-semibold text-white mb-1">{title}</h4>
      <p className="text-sm text-gray-300">{children}</p>
    </div>
  </div>
);


const InsightsPage: React.FC = () => {
  // Example data - replace with dynamic data from context if available
  const productivityMetric = { title: "Productividad General", value: "85%", change: "+5%", trend: 'up' as 'up' | 'down' | 'neutral' };
  const focusMetric = { title: "Horas de Enfoque", value: "18.5h", change: "+1.2h", trend: 'up' as 'up' | 'down' | 'neutral' };

  return (
    <div className="space-y-8">
      {/* Métricas de Productividad */}
      <section>
        <h2 className="text-2xl font-semibold text-white mb-4">Productividad y Enfoque</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <MetricCard {...productivityMetric} />
          <MetricCard {...focusMetric} />
        </div>
      </section>

      {/* Patrones de Energía */}
      <section>
        <h2 className="text-2xl font-semibold text-white mb-4">Patrones de Energía (Semanal)</h2>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ENERGY_LEVELS_DATA} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" tick={{ fill: '#9ca3af' }} stroke="#4b5563" />
              <YAxis tick={{ fill: '#9ca3af' }} stroke="#4b5563" domain={[0, 100]} unit="%"/>
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '0.5rem' }}
                labelStyle={{ color: '#ffffff', fontWeight: 'bold' }}
                itemStyle={{ color: '#34d399' }}
              />
              <Legend wrapperStyle={{ color: '#9ca3af' }} />
              <Line type="monotone" dataKey="value" name="Nivel de Energía" stroke="#34d399" strokeWidth={2} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 mt-4 text-center">
          <p className="text-gray-400">Nivel de Energía Promedio (Últimos 7 Días): <span className="text-green-400 font-bold text-lg">78%</span> (+10% vs. semana anterior)</p>
        </div>
      </section>

      {/* Balance de Identidades */}
      <section>
        <h2 className="text-2xl font-semibold text-white mb-4">Balance de Participación de Identidades</h2>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ROLE_BALANCE_DATA} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis type="number" tick={{ fill: '#9ca3af' }} stroke="#4b5563" domain={[0, 100]} unit="%"/>
              <YAxis type="category" dataKey="name" tick={{ fill: '#9ca3af' }} stroke="#4b5563" width={80}/>
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '0.5rem' }}
                labelStyle={{ color: '#ffffff', fontWeight: 'bold' }}
                 formatter={(value: number) => [`${value}%`, "Participación"]}
              />
              <Legend wrapperStyle={{ color: '#9ca3af' }} />
              <Bar dataKey="value" name="Participación" fill="#3b82f6" barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
         <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {ROLE_BALANCE_DATA.map(role => (
                <div key={role.name} className="text-center">
                    <p className="text-sm text-gray-400">{role.name}</p>
                    <p className="text-lg font-semibold text-blue-400">{role.value}%</p>
                    <div className="w-full bg-gray-700 rounded-full h-2.5 mt-1">
                        <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${role.value}%` }}></div>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* Recomendaciones de Optimización */}
      <section>
        <h2 className="text-2xl font-semibold text-white mb-4">Recomendaciones de Optimización</h2>
        <div className="space-y-4">
          {OPTIMIZATION_TIPS.map(tip => (
            <OptimizationTip key={tip.id} icon={tip.icon} title={tip.title}>
              {tip.description}
            </OptimizationTip>
          ))}
        </div>
      </section>
    </div>
  );
};

export default InsightsPage;
