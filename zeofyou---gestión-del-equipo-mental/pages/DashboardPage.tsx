
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import MetricCard from '../components/cards/MetricCard';
import NotificationItem from '../components/shared/NotificationItem';
import TimelineItem from '../components/shared/TimelineItem';
import { useData } from '../contexts/AppProviders';
import { INITIAL_KEY_METRICS, ENERGY_LEVELS_DATA } from '../constants';
import Icon from '../components/ui/Icon';

const DashboardPage: React.FC = () => {
  const { notifications, timelineEvents, markNotificationAsRead } = useData();

  return (
    <div className="space-y-8">
      {/* Métricas Clave */}
      <section>
        <h2 className="text-2xl font-semibold text-white mb-4">Métricas Clave</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {INITIAL_KEY_METRICS.map((metric) => (
            <MetricCard key={metric.title} {...metric} />
          ))}
        </div>
      </section>

      {/* Grid for Charts, Notifications, Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Niveles de Energía & Timeline (Col 1 & 2) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Niveles de Energía */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Niveles de Energía (Últimos 7 días)</h2>
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
                  <Line type="monotone" dataKey="value" name="Energía" stroke="#34d399" strokeWidth={2} dot={{ r: 4, fill: '#34d399' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Timeline Diario */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Timeline Diario</h2>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              {timelineEvents.length > 0 ? timelineEvents.map(event => (
                <TimelineItem key={event.id} {...event} />
              )) : <p className="text-gray-500">No hay eventos en el timeline.</p>}
            </div>
          </section>
        </div>
        
        {/* Notificaciones (Col 3) */}
        <section className="lg:col-span-1">
          <h2 className="text-2xl font-semibold text-white mb-4">Notificaciones</h2>
          <div className="bg-gray-800 p-2 rounded-lg border border-gray-700 max-h-[calc(100vh-200px)] overflow-y-auto">
            {notifications.length > 0 ? notifications.map(notification => (
              <NotificationItem key={notification.id} notification={notification} onDismiss={markNotificationAsRead} />
            )) : (
              <div className="text-center py-10 text-gray-500">
                <Icon name="BellOff" size={48} className="mx-auto mb-2" />
                <p>No tienes notificaciones nuevas.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
