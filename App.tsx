import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, isFirebaseConfigured } from './services/firebase';
import { ICONS } from './constants';
import { User, UserData, Topic, PlannerTask } from './types';
import Dashboard from './components/Dashboard';
import SyllabusTracker from './components/SyllabusTracker';
import Planner from './components/Planner';
import CaseStudies from './components/CaseStudies';
import CurriculumDesigner from './components/CurriculumDesigner';
import Auth from './components/Auth';
import AdminPanel from './components/AdminPanel';
import ConnectionStatus from './components/ConnectionStatus'; // Import the new component
import * as authService from './services/authService';

type View = 'dashboard' | 'syllabus' | 'planner' | 'caseStudies' | 'curriculum' | 'admin';

const FirebaseConfigError: React.FC = () => (
    <div className="flex items-center justify-center min-h-screen bg-amber-50 dark:bg-slate-900 p-4">
        <div className="w-full max-w-2xl bg-white dark:bg-slate-800 p-8 rounded-lg shadow-2xl border-4 border-amber-400">
            <div className="text-center">
                <span className="text-amber-500 text-6xl">⚠️</span>
                <h1 className="text-3xl font-bold text-slate-800 dark:text-white mt-4 mb-2">¡Acción Requerida!</h1>
                <p className="text-xl text-slate-600 dark:text-slate-300">Falta la configuración de Firebase.</p>
            </div>
            <div className="mt-6 text-slate-700 dark:text-slate-400">
                <p className="mb-4">Para que OpoFit funcione, necesitas conectar la aplicación a tu base de datos de Firebase. ¡Solo falta un paso!</p>
                <ol className="list-decimal list-inside space-y-2 mb-6">
                    <li>Abre el explorador de archivos a la izquierda.</li>
                    <li>Busca y haz clic en el archivo: <code className="bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded-md font-mono text-sm">services/firebase.ts</code></li>
                    <li>Dentro de ese archivo, reemplaza el texto <code className="bg-amber-200 dark:bg-amber-800/50 px-2 py-1 rounded-md font-mono text-sm">"TU_NUEVA_API_KEY_SECRETA_AQUI"</code> por tu clave de API web de Firebase.</li>
                </ol>
                <p className="text-sm text-center">Una vez que pegues la clave, la aplicación se recargará y funcionará correctamente.</p>
            </div>
        </div>
    </div>
);


const App: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentView, setCurrentView] = useState<View>('dashboard');
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (!isFirebaseConfigured) {
            setIsLoading(false);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    const userProfile = await authService.getUserProfile(firebaseUser.uid);
                    if (userProfile) {
                        setCurrentUser(userProfile);
                    } else {
                        // This case might happen if a user is in Auth but not in Firestore.
                        await authService.logout();
                        setCurrentUser(null);
                    }
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                    await authService.logout();
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
            try {
                const updatedUser = await authService.updateUserData(currentUser.id, newUserData);
                if (updatedUser) {
                    // Directly update the state with the returned user object to ensure UI consistency
                    setCurrentUser(updatedUser);
                }
            } catch(error) {
                console.error("Failed to update user data:", error);
                // Optionally show an error message to the user
            }
        }
    };
    
    if (!isFirebaseConfigured) {
        return <FirebaseConfigError />;
    }
    
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
        // Ensure data exists before rendering children components
        const tasks = currentUser?.data?.tasks ?? [];
        const topics = currentUser?.data?.topics ?? [];

        switch (currentView) {
            case 'dashboard': 
                return <Dashboard 
                    tasks={tasks}
                    topics={topics}
                    toggleTaskCompletion={(taskId) => {
                        const newTasks = tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t);
                        handleUserDataChange({ tasks: newTasks });
                    }} 
                />;
            case 'syllabus': 
                return <SyllabusTracker 
                    topics={topics}
                    onTopicsChange={(newTopics: Topic[]) => handleUserDataChange({ topics: newTopics })}
                />;
            case 'planner': 
                return <Planner 
                    tasks={tasks} 
                    setTasks={(newTasks: PlannerTask[]) => handleUserDataChange({ tasks: newTasks })} 
                />;
            case 'caseStudies': return <CaseStudies />;
            case 'curriculum': return <CurriculumDesigner />;
            case 'admin': return currentUser.isAdmin ? <AdminPanel /> : <p>Access Denied</p>;
            default: return <Dashboard tasks={tasks} topics={topics} toggleTaskCompletion={(taskId) => {}} />;
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
            <ConnectionStatus />
        </div>
    );
};

export default App;