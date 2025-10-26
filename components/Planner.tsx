import React, { useState } from 'react';
import { PlannerTask } from '../types';
import Card from './Card';

const DAYS_OF_WEEK = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

interface PlannerProps {
    tasks: PlannerTask[];
    setTasks: (tasks: PlannerTask[]) => void;
}

const Planner: React.FC<PlannerProps> = ({ tasks, setTasks }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date>(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return today;
    });
    const [newTaskText, setNewTaskText] = useState('');
    
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDay = (startOfMonth.getDay() + 6) % 7; // 0 for Monday, 6 for Sunday
    const daysInMonth = endOfMonth.getDate();

    const handleAddTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTaskText.trim() && selectedDate) {
            const newTask: PlannerTask = {
                id: `t${Date.now()}`,
                text: newTaskText,
                date: selectedDate.toISOString().split('T')[0],
                completed: false,
            };
            setTasks([...tasks, newTask]);
            setNewTaskText('');
        }
    };

    const handleDeleteTask = (taskId: string) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const changeMonth = (offset: number) => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
    };
    
    const renderCalendar = () => {
        const calendarDays = [];
        const today = new Date();
        today.setHours(0,0,0,0);

        // Add blank days for the start of the month
        for (let i = 0; i < startDay; i++) {
            calendarDays.push(<div key={`blank-${i}`} className="border-r border-b dark:border-slate-700"></div>);
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            date.setHours(0,0,0,0);
            const dateString = date.toISOString().split('T')[0];
            const tasksForDay = tasks.filter(task => task.date === dateString);

            const isToday = date.getTime() === today.getTime();
            const isSelected = date.getTime() === selectedDate.getTime();

            calendarDays.push(
                <div 
                    key={day} 
                    className={`border-r border-b dark:border-slate-700 p-2 min-h-[100px] cursor-pointer transition-colors duration-200 ${isSelected ? 'bg-teal-100 dark:bg-teal-900/50' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                    onClick={() => setSelectedDate(date)}
                >
                    <div className={`flex justify-center items-center w-6 h-6 rounded-full text-sm font-semibold ${isToday ? 'bg-teal-500 text-white' : ''}`}>
                       {day}
                    </div>
                    {tasksForDay.length > 0 && <div className="w-1.5 h-1.5 bg-sky-500 rounded-full mx-auto mt-1"></div>}
                </div>
            );
        }
        return calendarDays;
    };
    
    const selectedDateString = selectedDate.toISOString().split('T')[0];
    const tasksForSelectedDay = tasks.filter(t => t.date === selectedDateString);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-2 text-slate-800 dark:text-white">Planificador Inteligente</h1>
            <p className="text-slate-500 dark:text-slate-400 mb-8">Organiza tu estudio en el calendario. Haz clic en un día y añade tus tareas.</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card className="p-4">
                        <div className="flex items-center justify-between mb-4 px-2">
                            <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">&lt;</button>
                            <h2 className="text-xl font-bold">
                                {currentDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' }).replace(/^\w/, c => c.toUpperCase())}
                            </h2>
                            <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">&gt;</button>
                        </div>
                        <div className="grid grid-cols-7 border-t border-l dark:border-slate-700">
                            {DAYS_OF_WEEK.map(day => (
                                <div key={day} className="text-center font-bold py-2 border-r border-b dark:border-slate-700 text-sm text-slate-500">{day}</div>
                            ))}
                            {renderCalendar()}
                        </div>
                    </Card>
                </div>

                 <Card className="lg:col-span-1 p-6 h-fit">
                    <h2 className="font-bold text-xl mb-1">Tareas para el día</h2>
                    <p className="font-semibold text-teal-600 dark:text-teal-400 mb-4">{selectedDate.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    
                    <form onSubmit={handleAddTask} className="flex mb-4">
                        <input
                            type="text"
                            value={newTaskText}
                            onChange={(e) => setNewTaskText(e.target.value)}
                            placeholder="Nueva tarea..."
                            className="flex-grow p-2 border rounded-l-md bg-slate-100 dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        <button type="submit" className="bg-teal-500 text-white p-2 rounded-r-md hover:bg-teal-600 font-bold">+</button>
                    </form>

                    {tasksForSelectedDay.length > 0 ? (
                         <ul className="space-y-2">
                            {tasksForSelectedDay.map(task => (
                                <li key={task.id} className="flex items-center justify-between p-2 bg-slate-100 dark:bg-slate-700/50 rounded-md text-sm">
                                    <span>{task.text}</span>
                                    <button onClick={() => handleDeleteTask(task.id)} className="text-red-500 hover:text-red-700 text-xs font-semibold">X</button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-slate-500 dark:text-slate-400 text-sm py-4">No hay tareas para este día.</p>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default Planner;