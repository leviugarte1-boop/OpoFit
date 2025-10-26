import React, { useState, useEffect, useCallback } from 'react';
import { User, UserStatus } from '../types';
import * as authService from '../services/authService';
import Card from './Card';

const statusConfig = {
    [UserStatus.Pending]: { text: 'Pendiente', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300' },
    [UserStatus.Approved]: { text: 'Aprobado', color: 'bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300' },
    [UserStatus.Revoked]: { text: 'Revocado', color: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' },
};

const AdminPanel: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadUsers = useCallback(async () => {
        setIsLoading(true);
        try {
            const allUsers = await authService.getAllUsers();
            setUsers(allUsers);
        } catch (error) {
            console.error("Failed to load users:", error);
            // Optionally set an error state to show in the UI
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    const handleStatusChange = async (userId: string, status: UserStatus) => {
        await authService.updateUserStatus(userId, status);
        await loadUsers();
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                 <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Panel de Administración</h1>
                 <button 
                    onClick={loadUsers} 
                    disabled={isLoading}
                    className="px-4 py-2 text-sm font-semibold bg-slate-200 dark:bg-slate-700 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 disabled:opacity-50"
                 >
                    {isLoading ? 'Cargando...' : 'Recargar'}
                 </button>
            </div>
            <p className="text-slate-500 dark:text-slate-400 mb-8">Gestiona las solicitudes de acceso y los usuarios de la plataforma.</p>

            <Card className="p-0 overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-700 dark:text-slate-300">
                        <tr>
                            <th scope="col" className="px-6 py-3">Nombre Completo</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Estado</th>
                            <th scope="col" className="px-6 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={4} className="text-center p-8">Cargando usuarios...</td>
                            </tr>
                        ) : users.map(user => (
                            <tr key={user.id} className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600/50">
                                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white whitespace-nowrap">{user.fullName}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusConfig[user.status].color}`}>
                                        {statusConfig[user.status].text}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex space-x-2">
                                        {user.status === UserStatus.Pending && (
                                            <button onClick={() => handleStatusChange(user.id, UserStatus.Approved)} className="font-medium text-teal-600 dark:text-teal-500 hover:underline text-xs">Aprobar</button>
                                        )}
                                        {user.status === UserStatus.Approved && !user.isAdmin && (
                                            <button onClick={() => handleStatusChange(user.id, UserStatus.Revoked)} className="font-medium text-red-600 dark:text-red-500 hover:underline text-xs">Revocar</button>
                                        )}
                                        {user.status === UserStatus.Revoked && (
                                            <button onClick={() => handleStatusChange(user.id, UserStatus.Approved)} className="font-medium text-sky-600 dark:text-sky-500 hover:underline text-xs">Reactivar</button>
                                        )}
                                        {user.isAdmin && <span className="text-xs font-bold text-slate-400">ADMIN</span>}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
};

export default AdminPanel;