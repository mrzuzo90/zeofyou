
import { LucideIcon } from 'lucide-react';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role?: string;
  department?: string;
  location?: string;
}

export interface Identity {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'activo' | 'descansando' | 'ocupado';
  description: string;
  energyLevel?: number; // 0-100
}

export type TaskPriority = 'alta' | 'media' | 'baja';

export interface Task {
  id: string;
  title: string;
  category: string;
  assignedTo: string; // Identity name or ID
  priority: TaskPriority;
  columnId: KanbanColumnId;
  projectId?: string;
}

export type KanbanColumnId = 'todo' | 'inProgress' | 'completed';

export interface KanbanColumnType {
  id: KanbanColumnId;
  title: string;
  tasks: Task[];
}

export interface Project {
  id: string;
  name: string;
  imageUrl: string;
  leader: string; // Identity name or ID
  description?: string;
  status?: string; // e.g., 'activo', 'pausado', 'completado'
}

export interface Notification {
  id: string;
  icon: keyof typeof import('lucide-react');
  title: string;
  description: string;
  read?: boolean;
  timestamp?: Date;
}

export interface TimelineEvent {
  id: string;
  icon: keyof typeof import('lucide-react');
  title: string;
  time: string;
  description?: string;
}

export interface Metric {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface ChartDataPoint {
  name: string; // e.g., day of the week, month
  value: number;
  [key: string]: any; // For additional properties in complex charts
}

export interface FocusSession {
  taskType: string;
  activeIdentity: string; // Identity ID
  durationMinutes: number; // Duration in minutes
  startTime?: Date;
  endTime?: Date;
  completed?: boolean;
}

export interface NavItemType {
  path: string;
  label: string;
  icon: LucideIcon;
}

export interface DailyPlan {
  thoughts: string;
  priorities: string;
}

export interface EveningReflection {
  daySummary: string;
  teamReflection: string;
}
