
import React from 'react';
import { Task, TaskPriority } from '../../types';
import { PRIORITY_CLASSES } from '../../constants';
import Icon from '../ui/Icon';

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  const { title, category, assignedTo, priority } = task;

  const priorityColorClass = PRIORITY_CLASSES[priority] || 'bg-gray-500 text-white';

  return (
    <div 
      className="bg-gray-800 rounded-lg p-4 mb-3 border border-gray-700 cursor-pointer hover:bg-gray-700/50 transition-colors duration-150 shadow-md"
      onClick={onClick}
    >
      <h4 className="text-white font-medium mb-2 text-base leading-tight">{title}</h4>
      <div className="flex justify-between items-center mb-2">
        <span className="text-blue-400 text-xs font-semibold px-2 py-0.5 bg-blue-500/20 rounded">{category}</span>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${priorityColorClass} capitalize`}>
          {priority}
        </span>
      </div>
      <div className="text-gray-400 text-sm mt-2 flex items-center">
        <Icon name="User" size={14} className="mr-1.5 text-gray-500" />
        Asignado a: <span className="text-gray-300 ml-1 font-medium">{assignedTo}</span>
      </div>
    </div>
  );
};

export default TaskCard;
