import React, { useState } from 'react';
import Card from './Card';
import { User } from '../types';
import * as authService from '../services/authService';

interface AuthProps {
    onLoginSuccess: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLoginSuccess }) => {
    const [isLoginView, setIsLoginView] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    
    // Login state
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    // Register state
    const [regFullName, setRegFullName] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPhone, setRegPhone] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [regReason, setRegReason] = useState('');
    const [regAgreed, setRegAgreed] = useState(false);

    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setMessage(null);
        setIsLoading(true);
        try {
            const user = await authService.login(loginEmail, loginPassword);
            onLoginSuccess(user);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setMessage(null);
        if (!regAgreed) {
            setError('Debe aceptar la Política de Privacidad y las Condiciones de Servicio.');
            return;
        }
        setIsLoading(true);
        try {
            const newUser = await authService.register({
                fullName: regFullName,
                email: regEmail,
                phone: regPhone,
                password: regPassword,
                reason: regReason,
            });
            // On successful registration, log the user in immediately.
            onLoginSuccess(newUser);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setIsLoading(false);
        }
    };
    
    const ActionButton: React.FC<{ children: React.ReactNode, type?: "button" | "submit" | "reset", className?: string }> = ({ children, type = "submit", className }) => (
        <button 
            type={type} 
            disabled={isLoading}
            className={`w-full font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center ${className} disabled:bg-slate-400 disabled:cursor-not-allowed`}
        >
            {isLoading && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
            {isLoading ? 'Procesando...' : children}
        </button>
    );

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900 p-4">
            <div className="w-full max-w-md">
                <div className="flex items-center justify-center mb-6">
                    <span className="text-teal-500 text-5xl mr-3">⚡</span>
                    <h1 className="text-4xl font-bold text-slate-800 dark:text-white">OpoFit</h1>
                </div>
                
                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4 text-sm" role="alert">{error}</div>}
                {message && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-4 text-sm" role="alert">{message}</div>}

                <Card className="p-8">
                    {isLoginView ? (
                        <div>
                            <h2 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>
                            <form onSubmit={handleLogin} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Correo Electrónico</label>
                                    <input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} required className="w-full p-2 border rounded-md bg-slate-100 dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Contraseña</label>
                                    <input type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} required className="w-full p-2 border rounded-md bg-slate-100 dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                                </div>
                                <ActionButton className="bg-teal-500 text-white hover:bg-teal-600">Acceder</ActionButton>
                            </form>
                            <p className="text-center text-sm mt-6">
                                ¿No tienes cuenta?{' '}
                                <button onClick={() => { setIsLoginView(false); setError(null); setMessage(null); }} className="font-semibold text-teal-600 hover:underline">
                                    Crea una cuenta aquí
                                </button>
                            </p>
                        </div>
                    ) : (
                        <div>
                            <h2 className="text-2xl font-bold text-center mb-4">Crear una Cuenta</h2>
                            <form onSubmit={handleRegister} className="space-y-3">
                                <input type="text" placeholder="Nombre y Apellidos" value={regFullName} onChange={e => setRegFullName(e.target.value)} required className="w-full p-2 border rounded-md bg-slate-100 dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                                <input type="email" placeholder="Correo Electrónico" value={regEmail} onChange={e => setRegEmail(e.target.value)} required className="w-full p-2 border rounded-md bg-slate-100 dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                                <input type="tel" placeholder="Teléfono Móvil" value={regPhone} onChange={e => setRegPhone(e.target.value)} required className="w-full p-2 border rounded-md bg-slate-100 dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                                <input type="password" placeholder="Contraseña deseada" value={regPassword} onChange={e => setRegPassword(e.target.value)} required className="w-full p-2 border rounded-md bg-slate-100 dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                                <textarea placeholder="Motivo o interés en obtener acceso (Opcional)" value={regReason} onChange={e => setRegReason(e.target.value)} className="w-full p-2 border rounded-md bg-slate-100 dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500 h-20 text-sm"></textarea>
                                
                                <div className="text-xs text-slate-500 dark:text-slate-400 p-2 bg-slate-100 dark:bg-slate-700/50 rounded-md">
                                    Al pulsar "Crear Cuenta", usted acepta que la administración se reserva el derecho de revocar su acceso y que acepta la Política de Privacidad y las Condiciones de Servicio.
                                </div>

                                <div className="flex items-center">
                                    <input type="checkbox" id="agree" checked={regAgreed} onChange={e => setRegAgreed(e.target.checked)} className="h-4 w-4 rounded text-teal-500 focus:ring-teal-500 border-slate-300 dark:border-slate-600" />
                                    <label htmlFor="agree" className="ml-2 block text-sm text-slate-700 dark:text-slate-300">Acepto la Política de Privacidad y las Condiciones de Servicio.</label>
                                </div>
                                <ActionButton className="bg-sky-500 text-white hover:bg-sky-600">Crear Cuenta</ActionButton>
                            </form>
                            <p className="text-center text-sm mt-6">
                                ¿Ya tienes una cuenta?{' '}
                                <button onClick={() => { setIsLoginView(true); setError(null); setMessage(null); }} className="font-semibold text-teal-600 hover:underline">
                                    Inicia sesión
                                </button>
                            </p>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default Auth;