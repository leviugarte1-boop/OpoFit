import { User, UserStatus, UserData } from '../types';
import { SYLLABUS_TOPICS } from '../constants';

const DB_KEY = 'opoFitDB';
const SESSION_KEY = 'opoFitSession';

const getInitialUserData = (): UserData => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    return {
        topics: SYLLABUS_TOPICS.map(t => ({...t})), // Deep copy
        tasks: [
            { id: 't1', text: 'Repaso Tema 3: Capacidades Físicas Básicas', date: formatDate(today), completed: true },
            { id: 't2', text: 'Resolver Supuesto Práctico de Inclusión', date: formatDate(today), completed: false },
            { id: 't3', text: 'Avanzar en la Introducción de la Programación', date: formatDate(tomorrow), completed: false },
        ]
    };
};

export const initializeDB = () => {
    if (!localStorage.getItem(DB_KEY)) {
        const adminUser: User = {
            id: `user-${Date.now()}`,
            fullName: 'Admin OpoFit',
            email: 'admin@opofit.com',
            phone: '600000000',
            passwordHash: 'admin123',
            status: UserStatus.Approved,
            isAdmin: true,
            data: getInitialUserData(),
        };
        localStorage.setItem(DB_KEY, JSON.stringify([adminUser]));
    }
};

const getAllUsersFromDB = (): User[] => {
    const db = localStorage.getItem(DB_KEY);
    return db ? JSON.parse(db) : [];
};

const saveUsersToDB = (users: User[]) => {
    localStorage.setItem(DB_KEY, JSON.stringify(users));
};

export const register = (userData: { fullName: string; email: string; phone: string; password: string; reason?: string }) => {
    const users = getAllUsersFromDB();
    if (users.some(u => u.email === userData.email)) {
        throw new Error('El correo electrónico ya está registrado.');
    }
    const newUser: User = {
        id: `user-${Date.now()}`,
        fullName: userData.fullName,
        email: userData.email,
        phone: userData.phone,
        passwordHash: userData.password, // In a real app, hash this!
        reason: userData.reason,
        status: UserStatus.Pending,
        isAdmin: false,
        data: getInitialUserData(),
    };
    users.push(newUser);
    saveUsersToDB(users);
    return newUser;
};

export const login = (email: string, password: string): User => {
    const users = getAllUsersFromDB();
    const user = users.find(u => u.email === email);
    
    if (!user || user.passwordHash !== password) {
        throw new Error('Correo electrónico o contraseña incorrectos.');
    }

    if (user.status === UserStatus.Pending) {
        throw new Error('Su solicitud de acceso está pendiente de aprobación por un administrador.');
    }

    if (user.status === UserStatus.Revoked) {
        throw new Error('Su acceso a la plataforma ha sido revocado. Contacte con un administrador.');
    }
    
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
    return user;
};

export const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
};

export const getCurrentUser = (): User | null => {
    const userJson = sessionStorage.getItem(SESSION_KEY);
    return userJson ? JSON.parse(userJson) : null;
};

export const getAllUsers = (): User[] => {
    return getAllUsersFromDB();
};

export const updateUserStatus = (userId: string, newStatus: UserStatus): User | undefined => {
    const users = getAllUsersFromDB();
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        users[userIndex].status = newStatus;
        saveUsersToDB(users);
        return users[userIndex];
    }
    return undefined;
};

export const updateUserData = (userId: string, newUserData: UserData): User | undefined => {
    const users = getAllUsersFromDB();
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        users[userIndex].data = newUserData;
        saveUsersToDB(users);
        // Also update session if it's the current user
        const sessionUser = getCurrentUser();
        if (sessionUser && sessionUser.id === userId) {
            sessionStorage.setItem(SESSION_KEY, JSON.stringify(users[userIndex]));
        }
        return users[userIndex];
    }
    return undefined;
};