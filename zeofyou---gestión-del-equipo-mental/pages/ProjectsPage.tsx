
import React, { useState, useMemo } from 'react';
import { useData } from '../contexts/AppProviders';
import KanbanColumn from '../components/projects/KanbanColumn';
import { Task, KanbanColumnId, Project } from '../types';
import { KANBAN_COLUMNS_ORDER, KANBAN_COLUMN_TITLES, INITIAL_PROJECTS as staticProjects } from '../constants'; // Using static projects for now
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import Input from '../components/ui/Input';
import SelectField from '../components/ui/SelectField';
import TextArea from '../components/ui/TextArea';

const ProjectsPage: React.FC = () => {
  const { tasks, moveTask, addTask, identities } = useData(); // projects from useData might be empty initially
  const projects = staticProjects; // Forcing static projects for display
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showAddProjectForm, setShowAddProjectForm] = useState(false);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  
  const [newProject, setNewProject] = useState<Omit<Project, 'id' | 'imageUrl'>>({ name: '', leader: '', description: '' });
  const [newTask, setNewTask] = useState<Omit<Task, 'id'>>({ title: '', category: '', assignedTo: identities[0]?.name || '', priority: 'media', columnId: 'todo', projectId: projects[0]?.id });

  const groupedTasks = useMemo(() => {
    const result: Record<KanbanColumnId, Task[]> = {
      todo: [],
      inProgress: [],
      completed: [],
    };
    tasks.forEach(task => {
      if (result[task.columnId]) {
        result[task.columnId].push(task);
      }
    });
    return result;
  }, [tasks]);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    // Could open a modal here to view/edit task details
    console.log("Tarea seleccionada:", task);
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock add project - in real app, update context/backend
    console.log("Nuevo Proyecto:", newProject);
    setShowAddProjectForm(false);
    setNewProject({ name: '', leader: '', description: '' });
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    addTask(newTask);
    setShowAddTaskForm(false);
    setNewTask({ title: '', category: '', assignedTo: identities[0]?.name || '', priority: 'media', columnId: 'todo', projectId: projects[0]?.id });
  };
  
  const identityOptions = identities.map(id => ({ value: id.name, label: id.name }));
  const projectOptions = projects.map(p => ({ value: p.id, label: p.name }));

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-white">Tablero de Proyectos</h2>
        <div className="flex gap-2">
          <Button onClick={() => setShowAddTaskForm(!showAddTaskForm)} leftIcon={<Icon name={showAddTaskForm ? "X" : "ListPlus"} size={18}/>}>
            {showAddTaskForm ? 'Cancelar Tarea' : 'Nueva Tarea'}
          </Button>
          <Button onClick={() => setShowAddProjectForm(!showAddProjectForm)} variant="secondary" leftIcon={<Icon name={showAddProjectForm ? "X" : "PlusSquare"} size={18}/>}>
            {showAddProjectForm ? 'Cancelar Proyecto' : 'Nuevo Proyecto'}
          </Button>
        </div>
      </div>

      {showAddProjectForm && (
        <form onSubmit={handleAddProject} className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8 space-y-4">
          <h3 className="text-xl font-semibold text-white mb-2">Añadir Nuevo Proyecto</h3>
          <Input label="Nombre del Proyecto" value={newProject.name} onChange={e => setNewProject({...newProject, name: e.target.value})} required />
          <SelectField label="Líder del Proyecto" options={identityOptions} value={newProject.leader} onChange={e => setNewProject({...newProject, leader: e.target.value})} required />
          <TextArea label="Descripción" value={newProject.description || ''} onChange={e => setNewProject({...newProject, description: e.target.value})} />
          <Button type="submit" variant="primary" fullWidth>Guardar Proyecto</Button>
        </form>
      )}

      {showAddTaskForm && (
        <form onSubmit={handleAddTask} className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8 space-y-4">
          <h3 className="text-xl font-semibold text-white mb-2">Añadir Nueva Tarea</h3>
          <Input label="Título de la Tarea" value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} required />
          <Input label="Categoría" value={newTask.category} onChange={e => setNewTask({...newTask, category: e.target.value})} />
          <SelectField label="Asignar a" options={identityOptions} value={newTask.assignedTo} onChange={e => setNewTask({...newTask, assignedTo: e.target.value})} required />
          <SelectField label="Prioridad" options={[{value: 'alta', label: 'Alta'}, {value: 'media', label: 'Media'}, {value: 'baja', label: 'Baja'}]} value={newTask.priority} onChange={e => setNewTask({...newTask, priority: e.target.value as Task['priority']})} />
          <SelectField label="Columna" options={KANBAN_COLUMNS_ORDER.map(id => ({ value: id, label: KANBAN_COLUMN_TITLES[id]}))} value={newTask.columnId} onChange={e => setNewTask({...newTask, columnId: e.target.value as KanbanColumnId})} />
          {projectOptions.length > 0 && <SelectField label="Proyecto (Opcional)" options={[{value: '', label: 'Ninguno'}, ...projectOptions]} value={newTask.projectId || ''} onChange={e => setNewTask({...newTask, projectId: e.target.value})} />}
          <Button type="submit" variant="primary" fullWidth>Guardar Tarea</Button>
        </form>
      )}

      <div className="flex flex-col md:flex-row gap-4 md:gap-6 overflow-x-auto pb-4">
        {KANBAN_COLUMNS_ORDER.map(columnId => (
          <KanbanColumn
            key={columnId}
            title={KANBAN_COLUMN_TITLES[columnId]}
            tasks={groupedTasks[columnId]}
            onTaskClick={handleTaskClick}
          />
        ))}
      </div>

      {/* Vista de Resumen de Proyectos (Opcional) */}
      <section className="mt-12">
          <h2 className="text-2xl font-semibold text-white mb-4">Resumen de Proyectos Activos</h2>
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(project => (
                    <div key={project.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-md">
                        <img src={project.imageUrl} alt={project.name} className="w-full h-40 object-cover rounded-md mb-3" />
                        <h3 className="text-lg font-semibold text-white mb-1">{project.name}</h3>
                        <p className="text-sm text-gray-400 mb-1">Líder: {project.leader}</p>
                        <p className="text-sm text-gray-300 mb-3 truncate">{project.description}</p>
                        <div className="flex gap-2">
                            <Button size="sm" variant="primary">Ver Detalles</Button>
                            <Button size="sm" variant="secondary">Editar</Button>
                        </div>
                    </div>
                ))}
            </div>
          ) : (
            <p className="text-gray-500">No hay proyectos activos.</p>
          )}
      </section>
    </div>
  );
};

export default ProjectsPage;
