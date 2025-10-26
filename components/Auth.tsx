import React, { useState } from 'react';
import Card from './Card';
import { User, UserStatus } from '../types';
import * as authService from '../services/authService';

interface AuthProps {
    onLoginSuccess: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLoginSuccess }) => {
    const [isLoginView, setIsLoginView] = useState(true);
    
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

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setMessage(null);
        try {
            const user = authService.login(loginEmail, loginPassword);
            onLoginSuccess(user);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        }
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setMessage(null);
        if (!regAgreed) {
            setError('Debe aceptar la Política de Privacidad y las Condiciones de Servicio.');
            return;
        }
        try {
            authService.register({
                fullName: regFullName,
                email: regEmail,
                phone: regPhone,
                password: regPassword,
                reason: regReason,
            });
            setMessage('¡Solicitud enviada! Una vez aprobada su solicitud, recibirá un correo electrónico de confirmación para acceder a su Cuenta.');
            setIsLoginView(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        }
    };

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
                                <button type="submit" className="w-full bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-600 transition-colors">Acceder</button>
                            </form>
                            <p className="text-center text-sm mt-6">
                                ¿No tienes cuenta?{' '}
                                <button onClick={() => { setIsLoginView(false); setError(null); setMessage(null); }} className="font-semibold text-teal-600 hover:underline">
                                    Solicita tu acceso aquí
                                </button>
                            </p>
                        </div>
                    ) : (
                        <div>
                            <h2 className="text-2xl font-bold text-center mb-1">Solicitud de Acceso</h2>
                            <p className="text-center text-xs text-slate-500 dark:text-slate-400 mb-4">Su registro está sujeto a revisión y aprobación.</p>
                            <form onSubmit={handleRegister} className="space-y-3">
                                <input type="text" placeholder="Nombre y Apellidos" value={regFullName} onChange={e => setRegFullName(e.target.value)} required className="w-full p-2 border rounded-md bg-slate-100 dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                                <input type="email" placeholder="Correo Electrónico" value={regEmail} onChange={e => setRegEmail(e.target.value)} required className="w-full p-2 border rounded-md bg-slate-100 dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                                <input type="tel" placeholder="Teléfono Móvil" value={regPhone} onChange={e => setRegPhone(e.target.value)} required className="w-full p-2 border rounded-md bg-slate-100 dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                                <input type="password" placeholder="Contraseña deseada" value={regPassword} onChange={e => setRegPassword(e.target.value)} required className="w-full p-2 border rounded-md bg-slate-100 dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                                <textarea placeholder="Motivo o interés en obtener acceso (Opcional)" value={regReason} onChange={e => setRegReason(e.target.value)} className="w-full p-2 border rounded-md bg-slate-100 dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500 h-20 text-sm"></textarea>
                                
                                <div className="text-xs text-slate-500 dark:text-slate-400 p-2 bg-slate-100 dark:bg-slate-700/50 rounded-md">
                                    Al pulsar "Enviar Solicitud", usted acepta que su solicitud puede ser rechazada, que la administración se reserva el derecho de revocar su acceso y que acepta la Política de Privacidad y las Condiciones de Servicio.
                                </div>

                                <div className="flex items-center">
                                    <input type="checkbox" id="agree" checked={regAgreed} onChange={e => setRegAgreed(e.target.checked)} className="h-4 w-4 rounded text-teal-500 focus:ring-teal-500 border-slate-300 dark:border-slate-600" />
                                    <label htmlFor="agree" className="ml-2 block text-sm text-slate-700 dark:text-slate-300">Acepto la Política de Privacidad y las Condiciones de Servicio.</label>
                                </div>
                                <button type="submit" className="w-full bg-sky-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-600 transition-colors">Enviar Solicitud</button>
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