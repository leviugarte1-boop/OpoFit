import React from 'react';
import Card from './Card';
import ProgressBar from './ProgressBar';
import PomodoroTimer from './PomodoroTimer';
import { ICONS } from '../constants';
import { PlannerTask } from '../types';

interface DashboardProps {
    tasks: PlannerTask[];
    toggleTaskCompletion: (taskId: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ tasks, toggleTaskCompletion }) => {
    const progressData = {
        temario: 35,
        supuestos: 60,
        programacion: 20,
    };

    const today = new Date().toISOString().split('T')[0];
    const todaysTasks = tasks.filter(task => task.date === today);

    // FIX: Changed JSX.Element to React.ReactElement to fix "Cannot find namespace 'JSX'" error.
    const QuickStat: React.FC<{ icon: React.ReactElement; label: string; value: string; progress: number, color: string }> = ({ icon, label, value, progress, color }) => (
        <Card className="p-4 flex flex-col">
          <div className="flex items-center mb-2">
            <div className={`p-2 rounded-full mr-3 bg-${color}-100 text-${color}-600 dark:bg-${color}-900/50 dark:text-${color}-400`}>
                {icon}
            </div>
            <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
                <p className="font-bold text-lg">{value}</p>
            </div>
          </div>
          <ProgressBar progress={progress} colorClass={`bg-${color}-500`} />
        </Card>
    );

    return (
        <div>
            <h1 className="text-3xl font-bold mb-2 text-slate-800 dark:text-white">Dashboard del Opositor</h1>
            <p className="text-slate-500 dark:text-slate-400 mb-8">Resumen de tu progreso hacia la plaza. ¡Vamos!</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <QuickStat icon={ICONS.syllabus} label="Temario Estudiado" value={`${Math.round(25 * (progressData.temario / 100))}/25 Temas`} progress={progressData.temario} color="teal" />
                <QuickStat icon={ICONS.caseStudies} label="Supuestos Prácticos" value="12/20 Resueltos" progress={progressData.supuestos} color="sky" />
                <QuickStat icon={ICONS.curriculum} label="Programación Didáctica" value={`${progressData.programacion}% Completa`} progress={progressData.programacion} color="amber" />
                <div className="md:col-span-2 lg:col-span-1">
                   <PomodoroTimer />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 p-6">
                    <h2 className="font-bold text-xl mb-4">Plan de Hoy</h2>
                    {todaysTasks.length > 0 ? (
                        <ul className="space-y-3">
                            {todaysTasks.map(task => (
                                <li key={task.id} className="flex items-center p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                                    <input 
                                        type="checkbox" 
                                        className="h-5 w-5 rounded text-teal-500 focus:ring-teal-500 border-slate-300 dark:border-slate-600 dark:bg-slate-900" 
                                        checked={task.completed}
                                        onChange={() => toggleTaskCompletion(task.id)}
                                    />
                                    <span className={`ml-3 font-medium ${task.completed ? 'line-through text-slate-400' : ''}`}>{task.text}</span>
                                    {task.completed && (
                                        <span className="ml-auto text-sm bg-teal-100 text-teal-700 px-2 py-1 rounded-full dark:bg-teal-900/50 dark:text-teal-300">Completado</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-slate-500 dark:text-slate-400 py-4">No hay tareas programadas para hoy. ¡Añade algunas desde el Planificador!</p>
                    )}
                </Card>

                <Card className="p-6">
                    <h2 className="font-bold text-xl mb-4">Legislación Clave (Madrid)</h2>
                    <ul className="space-y-2 text-sm">
                        <li className="hover:text-teal-500"><a href="#" target="_blank" rel="noopener noreferrer">LOMLOE (Ley Orgánica 3/2020)</a></li>
                        <li className="hover:text-teal-500"><a href="#" target="_blank" rel="noopener noreferrer">RD 157/2022 (Enseñanzas Mínimas Primaria)</a></li>
                        <li className="hover:text-teal-500"><a href="#" target="_blank" rel="noopener noreferrer">Decreto 61/2022 (Currículo Primaria CAM)</a></li>
                        <li className="hover:text-teal-500"><a href="#" target="_blank" rel="noopener noreferrer">Orden 130/2023 (Organización y Funcionamiento CAM)</a></li>
                    </ul>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
