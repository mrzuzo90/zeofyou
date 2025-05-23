
import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import usePersistedState from '../hooks/usePersistedState';
import { User, Identity, Task, Project, Notification, TimelineEvent, DailyPlan, EveningReflection, KanbanColumnId } from '../types';
import { INITIAL_IDENTITIES, INITIAL_TASKS, INITIAL_PROJECTS, INITIAL_NOTIFICATIONS, INITIAL_TIMELINE_EVENTS, DEFAULT_USER_PROFILE, KANBAN_COLUMNS_ORDER, KANBAN_COLUMN_TITLES } from '../constants';

// Auth Context
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, pass: string) => Promise<void>; // Simulate async
  signup: (name: string, email: string, pass: string) => Promise<void>; // Simulate async
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = usePersistedState<User | null>('zeofyou_user', null);
  const [isAuthenticated, setIsAuthenticated] = usePersistedState<boolean>('zeofyou_auth', false);

  const login = useCallback(async (email: string, pass: string) => {
    console.log('Attempting login:', email, pass); // Mock login
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    // In a real app, verify credentials here
    if (email === DEFAULT_USER_PROFILE.email && pass === "password") { // Dummy credentials
        setUser(DEFAULT_USER_PROFILE);
        setIsAuthenticated(true);
    } else {
        throw new Error("Credenciales inválidas");
    }
  }, [setUser, setIsAuthenticated]);

  const signup = useCallback(async (name: string, email: string, pass: string) => {
    console.log('Attempting signup:', name, email, pass); // Mock signup
    await new Promise(resolve => setTimeout(resolve, 500));
    const newUser: User = { ...DEFAULT_USER_PROFILE, id: Date.now().toString(), name, email };
    setUser(newUser);
    setIsAuthenticated(true);
  }, [setUser, setIsAuthenticated]);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('zeofyou_user');
    localStorage.removeItem('zeofyou_auth');
  }, [setUser, setIsAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


// Data Context
interface DataContextType {
  identities: Identity[];
  addIdentity: (identity: Omit<Identity, 'id'>) => void;
  updateIdentity: (identity: Identity) => void;
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (task: Task) => void;
  moveTask: (taskId: string, newColumnId: KanbanColumnId) => void;
  projects: Project[];
  notifications: Notification[];
  markNotificationAsRead: (id: string) => void;
  timelineEvents: TimelineEvent[];
  dailyPlan: DailyPlan;
  updateDailyPlan: (plan: DailyPlan) => void;
  eveningReflection: EveningReflection;
  updateEveningReflection: (reflection: EveningReflection) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [identities, setIdentities] = usePersistedState<Identity[]>('zeofyou_identities', INITIAL_IDENTITIES);
  const [tasks, setTasks] = usePersistedState<Task[]>('zeofyou_tasks', INITIAL_TASKS);
  const [projects, setProjects] = usePersistedState<Project[]>('zeofyou_projects', INITIAL_PROJECTS);
  const [notifications, setNotifications] = usePersistedState<Notification[]>('zeofyou_notifications', INITIAL_NOTIFICATIONS);
  const [timelineEvents, setTimelineEvents] = usePersistedState<TimelineEvent[]>('zeofyou_timeline', INITIAL_TIMELINE_EVENTS);
  const [dailyPlan, setDailyPlan] = usePersistedState<DailyPlan>('zeofyou_daily_plan', { thoughts: '', priorities: '' });
  const [eveningReflection, setEveningReflection] = usePersistedState<EveningReflection>('zeofyou_evening_reflection', { daySummary: '', teamReflection: '' });

  const addIdentity = (identity: Omit<Identity, 'id'>) => {
    setIdentities(prev => [...prev, { ...identity, id: Date.now().toString() }]);
  };
  const updateIdentity = (updatedIdentity: Identity) => {
    setIdentities(prev => prev.map(id => id.id === updatedIdentity.id ? updatedIdentity : id));
  };

  const addTask = (task: Omit<Task, 'id'>) => {
    setTasks(prev => [...prev, { ...task, id: Date.now().toString() }]);
  };
  const updateTask = (updatedTask: Task) => {
    setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
  };
  const moveTask = (taskId: string, newColumnId: KanbanColumnId) => {
    setTasks(prevTasks => prevTasks.map(task => 
      task.id === taskId ? { ...task, columnId: newColumnId } : task
    ));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const updateDailyPlan = (plan: DailyPlan) => setDailyPlan(plan);
  const updateEveningReflection = (reflection: EveningReflection) => setEveningReflection(reflection);

  return (
    <DataContext.Provider value={{
      identities, addIdentity, updateIdentity,
      tasks, addTask, updateTask, moveTask,
      projects,
      notifications, markNotificationAsRead,
      timelineEvents,
      dailyPlan, updateDailyPlan,
      eveningReflection, updateEveningReflection
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

// Combined Provider
export const AppProviders: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <DataProvider>
        {children}
      </DataProvider>
    </AuthProvider>
  );
};
