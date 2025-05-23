
import React from 'react';
import { Task } from '../../types';
import TaskCard from '../cards/TaskCard';

interface KanbanColumnProps {
  title: string;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, tasks, onTaskClick }) => {
  return (
    <div className="bg-gray-800/50 rounded-lg p-3 md:p-4 flex-shrink-0 w-full md:w-80 lg:w-96 min-h-[300px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-white text-lg">{title}</h3>
        <span className="bg-gray-700 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full">
          {tasks.length}
        </span>
      </div>
      <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-250px)] pr-1">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <TaskCard key={task.id} task={task} onClick={() => onTaskClick(task)} />
          ))
        ) : (
          <p className="text-gray-500 text-sm text-center py-4">No hay tareas aquí.</p>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
