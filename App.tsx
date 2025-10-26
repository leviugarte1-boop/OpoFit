import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase';
import { ICONS } from './constants';
import { User, UserData } from './types';
import Dashboard from './components/Dashboard';
import SyllabusTracker from './components/SyllabusTracker';
import Planner from './components/Planner';
import CaseStudies from './components/CaseStudies';
import CurriculumDesigner from './components/CurriculumDesigner';
import PhysicalTests from './components/PhysicalTests';
import Auth from './components/Auth';
import AdminPanel from './components/AdminPanel';
import * as authService from './services/authService';

type View = 'dashboard' | 'syllabus' | 'planner' | 'caseStudies' | 'curriculum' | 'physicalTests' | 'admin';

const App: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentView, setCurrentView] = useState<View>('dashboard');
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const userProfile = await authService.getUserProfile(firebaseUser.uid);
                if (userProfile) {
                    setCurrentUser(userProfile);
                } else {
                    // This case might happen if a user is in Auth but not in Firestore.
                    // For now, we log them out.
                    authService.logout();
                    setCurrentUser(null);
                }
            } else {
                setCurrentUser(null);
            }
            setIsLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const handleLoginSuccess = (user: User) => {
        setCurrentUser(user);
        setCurrentView('dashboard');
    };

    const handleLogout = async () => {
        await authService.logout();
        setCurrentUser(null);
        setCurrentView('dashboard');
    };

    const handleUserDataChange = async (newUserData: Partial<UserData>) => {
        if (currentUser) {
            const updatedUser = await authService.updateUserData(currentUser.id, newUserData);
            if (updatedUser) {
                setCurrentUser(updatedUser);
            }
        }
    };
    
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900">
                <div className="text-teal-500 text-xl font-semibold">Cargando OpoFit...</div>
            </div>
        );
    }


    if (!currentUser) {
        return <Auth onLoginSuccess={handleLoginSuccess} />;
    }

    const renderView = () => {
        const { tasks, topics } = currentUser.data;

        switch (currentView) {
            case 'dashboard': 
                return <Dashboard 
                    tasks={tasks} 
                    toggleTaskCompletion={(taskId) => {
                        const newTasks = tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t);
                        handleUserDataChange({ tasks: newTasks });
                    }} 
                />;
            case 'syllabus': 
                return <SyllabusTracker 
                    topics={topics}
                    onTopicsChange={(newTopics) => handleUserDataChange({ topics: newTopics })}
                />;
            case 'planner': 
                return <Planner 
                    tasks={tasks} 
                    setTasks={(newTasks) => handleUserDataChange({ tasks: newTasks })} 
                />;
            case 'caseStudies': return <CaseStudies />;
            case 'curriculum': return <CurriculumDesigner />;
            case 'physicalTests': return <PhysicalTests />;
            case 'admin': return currentUser.isAdmin ? <AdminPanel /> : <p>Access Denied</p>;
            default: return <Dashboard tasks={tasks} toggleTaskCompletion={(taskId) => {}} />;
        }
    };
    
    const NavLink: React.FC<{ view: View; label: string; icon: React.ReactElement; adminOnly?: boolean }> = ({ view, label, icon, adminOnly = false }) => {
        if (adminOnly && !currentUser.isAdmin) {
            return null;
        }
        return (
            <li className="mb-2">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentView(view);
                    setSidebarOpen(false);
                  }}
                  className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                    currentView === view
                      ? 'bg-teal-600 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                    {icon}
                    <span className="ml-4 font-semibold">{label}</span>
                </a>
            </li>
        );
    };

    return (
        <div className="flex h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
            <div className="md:hidden flex justify-between items-center w-full p-4 bg-slate-800 text-white fixed top-0 left-0 z-20 shadow-md">
                <h1 className="text-xl font-bold">OpoFit</h1>
                <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-white focus:outline-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                </button>
            </div>

            <nav className={`fixed md:relative top-0 left-0 h-full bg-slate-800 text-white w-64 p-5 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out z-30 flex flex-col shadow-2xl`}>
                <div className="flex items-center mb-10">
                    <span className="text-teal-400 text-3xl mr-2">⚡</span>
                    <h1 className="text-2xl font-bold text-white">OpoFit</h1>
                </div>
                <ul className="flex-grow">
                    <NavLink view="dashboard" label="Dashboard" icon={ICONS.dashboard} />
                    <NavLink view="syllabus" label="Temario" icon={ICONS.syllabus} />
                    <NavLink view="planner" label="Planificador" icon={ICONS.planner} />
                    <NavLink view="caseStudies" label="Supuestos Prácticos" icon={ICONS.caseStudies} />
                    <NavLink view="curriculum" label="Programación" icon={ICONS.curriculum} />
                    <NavLink view="physicalTests" label="Pruebas Físicas" icon={ICONS.physicalTests} />
                    <NavLink view="admin" label="Admin" icon={ICONS.admin} adminOnly={true} />
                </ul>
                <div className="mt-auto">
                    <div className="text-center mb-4">
                        <p className="text-sm text-slate-400">Bienvenido/a,</p>
                        <p className="font-semibold text-white truncate">{currentUser.fullName}</p>
                    </div>
                     <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center p-3 rounded-lg transition-colors duration-200 text-red-300 hover:bg-red-800/50 hover:text-white"
                    >
                        {ICONS.logout}
                        <span className="ml-4 font-semibold">Cerrar Sesión</span>
                    </button>
                </div>
            </nav>
            
            <main className="flex-1 p-4 md:p-8 lg:p-10 overflow-y-auto mt-16 md:mt-0">
                {renderView()}
            </main>
        </div>
    );
};

export default App;