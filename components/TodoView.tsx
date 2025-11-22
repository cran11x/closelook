
import React, { useState } from 'react';
import { CheckCircle2, Circle, Plus, Star, Sun, Calendar } from 'lucide-react';

interface Task {
    id: string;
    text: string;
    completed: boolean;
    important: boolean;
    category: string;
}

const INITIAL_TASKS: Task[] = [
    { id: '1', text: 'Buy Greenland (Make an offer)', completed: false, important: true, category: 'My Day' },
    { id: '2', text: 'Find the black sharpie', completed: true, important: false, category: 'My Day' },
    { id: '3', text: 'Tweet about the ratings at 3 AM', completed: false, important: true, category: 'Important' },
    { id: '4', text: 'Call Putin about the bear', completed: false, important: false, category: 'Tasks' },
    { id: '5', text: 'Fix hair (Structural Reinforcement)', completed: false, important: true, category: 'My Day' },
    { id: '6', text: 'Ban broccoli from Air Force One', completed: true, important: false, category: 'Tasks' },
    { id: '7', text: 'Block Greta on Twitter', completed: false, important: false, category: 'Tasks' },
    { id: '8', text: 'Buy virtual land in the MAGA Verse', completed: false, important: true, category: 'My Day' },
    { id: '9', text: 'Negotiate soul contract with Satan', completed: false, important: true, category: 'Important' },
    { id: '10', text: 'Write a song better than Taylor Swift', completed: false, important: false, category: 'Tasks' },
    { id: '11', text: 'Appeal Naughty List status', completed: false, important: true, category: 'My Day' },
    { id: '12', text: 'Buy Amazon from Jeff', completed: false, important: false, category: 'Tasks' },
];

const TodoView = () => {
    const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
    const [newTask, setNewTask] = useState('');
    const [activeFilter, setActiveFilter] = useState('My Day');

    const toggleComplete = (id: string) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const toggleImportant = (id: string) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, important: !t.important } : t));
    };

    const addTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTask.trim()) return;
        const task: Task = {
            id: Math.random().toString(36).substr(2, 9),
            text: newTask,
            completed: false,
            important: activeFilter === 'Important',
            category: activeFilter === 'My Day' || activeFilter === 'Important' ? activeFilter : 'Tasks'
        };
        setTasks([task, ...tasks]);
        setNewTask('');
    };

    const filteredTasks = tasks.filter(t => {
        if (activeFilter === 'My Day') return t.category === 'My Day';
        if (activeFilter === 'Important') return t.important;
        if (activeFilter === 'Completed') return t.completed;
        return true;
    });

    const SidebarItem = ({ icon: Icon, label, count, active }: any) => (
        <div 
            onClick={() => setActiveFilter(label)}
            className={`flex items-center justify-between px-4 py-3 cursor-pointer rounded-md transition-colors ${active ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-gray-100 text-gray-700'}`}
        >
            <div className="flex items-center gap-3">
                <Icon className={`h-5 w-5 ${active ? 'text-blue-700' : 'text-gray-500'}`} />
                <span>{label}</span>
            </div>
            {count > 0 && <span className="text-xs">{count}</span>}
        </div>
    );

    return (
        <div className="flex-1 flex bg-white h-full">
            {/* Sidebar */}
            <div className="w-64 bg-[#faf9f8] border-r border-gray-200 pt-6 px-2">
                <SidebarItem icon={Sun} label="My Day" count={tasks.filter(t => t.category === 'My Day' && !t.completed).length} active={activeFilter === 'My Day'} />
                <SidebarItem icon={Star} label="Important" count={tasks.filter(t => t.important && !t.completed).length} active={activeFilter === 'Important'} />
                <SidebarItem icon={Calendar} label="Planned" count={0} active={activeFilter === 'Planned'} />
                <SidebarItem icon={CheckCircle2} label="Completed" count={tasks.filter(t => t.completed).length} active={activeFilter === 'Completed'} />
                <div className="h-px bg-gray-200 my-2 mx-4"></div>
                <SidebarItem icon={Circle} label="Tasks" count={tasks.filter(t => !t.completed).length} active={activeFilter === 'Tasks'} />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col bg-cover bg-center relative" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=2068&auto=format&fit=crop")' }}>
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
                
                <div className="relative z-10 p-8 flex-1 flex flex-col max-w-3xl w-full mx-auto">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-white mb-1">{activeFilter}</h1>
                        <p className="text-white/80 text-sm">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                    </div>

                    {/* Add Task Input */}
                    <form onSubmit={addTask} className="mb-6">
                        <div className="bg-white rounded-md shadow-lg flex items-center px-4 py-3 opacity-95 focus-within:opacity-100 transition-opacity">
                            <Plus className="h-6 w-6 text-blue-600 mr-3" />
                            <input 
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                                className="flex-1 outline-none text-gray-800 placeholder-gray-500"
                                placeholder="Add a task"
                            />
                        </div>
                    </form>

                    {/* Task List */}
                    <div className="space-y-1 overflow-y-auto custom-scrollbar pb-20">
                        {filteredTasks.length === 0 && (
                            <div className="text-center text-white/60 mt-10">No tasks here. Enjoy your golf game.</div>
                        )}
                        {filteredTasks.map(task => (
                            <div key={task.id} className="bg-white/95 backdrop-blur hover:bg-white rounded-md p-3 flex items-center gap-3 shadow-sm group transition-all">
                                <button onClick={() => toggleComplete(task.id)} className="text-gray-400 hover:text-blue-600">
                                    {task.completed ? <CheckCircle2 className="h-5 w-5 text-blue-600" /> : <Circle className="h-5 w-5" />}
                                </button>
                                <span className={`flex-1 text-sm font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                                    {task.text}
                                </span>
                                <button onClick={() => toggleImportant(task.id)} className="text-gray-300 hover:text-blue-600 focus:outline-none">
                                    <Star className={`h-5 w-5 ${task.important ? 'fill-blue-600 text-blue-600' : ''}`} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodoView;
