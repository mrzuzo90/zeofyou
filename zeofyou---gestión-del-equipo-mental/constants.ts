

import { Identity, Task, Notification, TimelineEvent, Metric, Project, KanbanColumnId, User, TaskPriority } from './types';
import { Home, Users, BarChart3, Settings, CheckCircle, AlertTriangle, Clock, Monitor, Utensils, Briefcase, PenTool, Target } from 'lucide-react';

export const APP_NAME = "Zeofyou";

export const ROUTES = {
  DASHBOARD: "/",
  IDENTITIES: "/identidades",
  PROJECTS: "/proyectos",
  FOCUS: "/enfoque",
  PLANNING: "/planificacion",
  INSIGHTS: "/insights",
  PROFILE: "/perfil",
  LOGIN: "/login",
  SIGNUP: "/signup",
};

export const NAV_ITEMS = [
  { path: ROUTES.DASHBOARD, label: "Inicio", icon: Home },
  { path: ROUTES.IDENTITIES, label: "Identidades", icon: Users },
  { path: ROUTES.PROJECTS, label: "Proyectos", icon: Briefcase },
  { path: ROUTES.FOCUS, label: "Enfoque", icon: Monitor },
  { path: ROUTES.PLANNING, label: "Planificar", icon: PenTool },
  { path: ROUTES.INSIGHTS, label: "Insights", icon: BarChart3 },
  { path: ROUTES.PROFILE, label: "Perfil", icon: Settings },
];

export const INITIAL_IDENTITIES: Identity[] = [
  { id: '1', name: 'El Estratega', role: 'Planificador Principal', avatar: 'https://picsum.photos/seed/strategist/64/64', status: 'activo', description: 'Se encarga de la visión a largo plazo y la toma de decisiones estratégicas.', energyLevel: 80 },
  { id: '2', name: 'El Creativo', role: 'Director de Innovación', avatar: 'https://picsum.photos/seed/creative/64/64', status: 'descansando', description: 'Genera ideas originales y soluciones creativas.', energyLevel: 60 },
  { id: '3', name: 'El Organizador', role: 'Gestor de Procesos', avatar: 'https://picsum.photos/seed/organizer/64/64', status: 'activo', description: 'Mantiene todo en orden y asegura que los procesos fluyan eficientemente.', energyLevel: 90 },
  { id: '4', name: 'El Coach', role: 'Bienestar Personal', avatar: 'https://picsum.photos/seed/coach/64/64', status: 'ocupado', description: 'Fomenta el bienestar emocional y la motivación del equipo interno.', energyLevel: 75 },
];

export const INITIAL_TASKS: Task[] = [
  { id: 't1', title: 'Crear nueva página de aterrizaje', category: 'Diseño', assignedTo: 'El Creativo', priority: 'alta', columnId: 'todo', projectId: 'p1' },
  { id: 't2', title: 'Planificar campaña de redes sociales', category: 'Marketing', assignedTo: 'El Estratega', priority: 'media', columnId: 'inProgress', projectId: 'p2' },
  { id: 't3', title: 'Investigar herramientas de IA', category: 'Investigación', assignedTo: 'El Estratega', priority: 'media', columnId: 'todo', projectId: 'p1' },
  { id: 't4', title: 'Revisar wireframes de la app', category: 'Diseño UX', assignedTo: 'El Creativo', priority: 'alta', columnId: 'inProgress', projectId: 'p2' },
  { id: 't5', title: 'Actualizar documentación del API', category: 'Desarrollo', assignedTo: 'El Organizador', priority: 'baja', columnId: 'completed', projectId: 'p1' },
  { id: 't6', title: 'Preparar presentación para cliente', category: 'Comunicación', assignedTo: 'El Estratega', priority: 'alta', columnId: 'todo', projectId: 'p3' },
  { id: 't7', title: 'Diseñar iconos para nueva función', category: 'Diseño UI', assignedTo: 'El Creativo', priority: 'media', columnId: 'todo', projectId: 'p3' },
];

export const KANBAN_COLUMNS_ORDER: KanbanColumnId[] = ['todo', 'inProgress', 'completed'];
export const KANBAN_COLUMN_TITLES: Record<KanbanColumnId, string> = {
  todo: "Por Hacer",
  inProgress: "En Progreso",
  completed: "Completado"
};


export const INITIAL_PROJECTS: Project[] = [
    { id: 'p1', name: 'Rediseño Web Zeofyou', imageUrl: 'https://picsum.photos/seed/project1/400/300', leader: 'El Estratega', description: 'Proyecto de rediseño completo de la plataforma web.' },
    { id: 'p2', name: 'Campaña de Marketing Q3', imageUrl: 'https://picsum.photos/seed/project2/400/300', leader: 'El Creativo', description: 'Lanzamiento de la nueva campaña de marketing para el tercer trimestre.' },
    { id: 'p3', name: 'Desarrollo App Móvil', imageUrl: 'https://picsum.photos/seed/project3/400/300', leader: 'El Organizador', description: 'Creación de la aplicación móvil nativa para iOS y Android.' },
];


export const INITIAL_NOTIFICATIONS: Notification[] = [
  { id: 'n1', icon: 'AlertTriangle', title: 'Urgente: Acción Requerida', description: 'Fecha límite del Proyecto X aproximándose.', timestamp: new Date(Date.now() - 1000 * 60 * 30) },
  { id: 'n2', icon: 'Users', title: 'Bienvenida a Bordo', description: 'Nuevo miembro del equipo "El Mediador" se unió.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) },
  { id: 'n3', icon: 'CheckCircle', title: 'Tarea Completada', description: 'La tarea "Investigar mercado" ha sido marcada como completada.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5) },
];

export const INITIAL_TIMELINE_EVENTS: TimelineEvent[] = [
  { id: 'tl1', icon: 'Clock', title: 'Standup Matutino', time: '9:00 AM' },
  { id: 'tl2', icon: 'Monitor', title: 'Revisión de Proyecto Alfa', time: '11:00 AM' },
  { id: 'tl3', icon: 'Utensils', title: 'Almuerzo del Equipo', time: '1:00 PM' },
  { id: 'tl4', icon: 'Briefcase', title: 'Sesión de Enfoque: Planificación Q4', time: '2:30 PM' },
];

export const INITIAL_KEY_METRICS: Metric[] = [
    { title: "Energía del Equipo", value: "85%", change: "+5%", trend: 'up' },
    { title: "Moral del Equipo", value: "92%", change: "+3%", trend: 'up' },
    { title: "Enfoque del Equipo", value: "78%", change: "-2%", trend: 'down' },
    { title: "Tareas Completadas", value: "12", change: "+2", trend: 'up' },
];

export const TASK_TYPES: string[] = ["Desarrollo", "Diseño", "Investigación", "Planificación", "Comunicación", "Personal"];
export const FOCUS_DURATIONS: number[] = [15, 25, 45, 60]; // in minutes

export const ENERGY_LEVELS_DATA = [
  { name: 'Lun', value: 60 }, { name: 'Mar', value: 75 }, { name: 'Mié', value: 70 },
  { name: 'Jue', value: 85 }, { name: 'Vie', value: 80 }, { name: 'Sáb', value: 90 },
  { name: 'Dom', value: 78 },
];

export const ROLE_BALANCE_DATA = [
  { name: 'Estratega', value: 35 },
  { name: 'Creativo', value: 25 },
  { name: 'Organizador', value: 20 },
  { name: 'Coach', value: 20 },
];

export const OPTIMIZATION_TIPS = [
  { id: 'tip1', icon: 'Target' as keyof typeof import('lucide-react'), title: 'Alineación de Roles', description: 'Ajusta las asignaciones de tareas para mejor alineación con niveles de energía individuales.' },
  { id: 'tip2', icon: 'Clock' as keyof typeof import('lucide-react'), title: 'Programación Basada en Energía', description: 'Programa reuniones de equipo y tareas demandantes durante períodos de máxima energía.' },
  { id: 'tip3', icon: 'Users' as keyof typeof import('lucide-react'), title: 'Rotación de Liderazgo', description: 'Considera rotar el liderazgo de tareas entre identidades para fomentar el desarrollo de habilidades.' },
];

// FIX: Added User import from ./types
export const DEFAULT_USER_PROFILE: User = {
  id: 'user1',
  name: 'Sophia Carter',
  email: 'sophia.carter@zeofyou.com',
  avatarUrl: 'https://picsum.photos/seed/sophia/128/128',
  role: 'Líder de Equipo Interno',
  department: 'Bienestar y Productividad',
  location: 'San Francisco, CA (Remoto)'
};

export const DAILY_BRIEFING_ITEMS: TimelineEvent[] = [
  { id: 'db1', icon: 'Users', title: 'Standup Matutino', time: '9:00 AM' },
  { id: 'db2', icon: 'Briefcase', title: 'Inicio de Proyecto "Zenith"', time: '10:00 AM' },
  { id: 'db3', icon: 'PenTool', title: 'Revisión de Diseño "Portal"', time: '11:30 AM' },
  { id: 'db4', icon: 'Monitor', title: 'Bloque de Trabajo Enfocado', time: '2:00 PM' },
];

// FIX: Added TaskPriority import from ./types
export const PRIORITY_CLASSES: Record<TaskPriority, string> = {
  alta: 'bg-red-500 text-white',
  media: 'bg-yellow-500 text-gray-900',
  baja: 'bg-green-500 text-white',
};

export const STATUS_CLASSES: Record<Identity['status'], string> = {
  activo: 'bg-green-500',
  descansando: 'bg-blue-500',
  ocupado: 'bg-yellow-500',
};