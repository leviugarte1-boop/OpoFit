import React, { useState, useEffect } from 'react';
import { auth, db, isFirebaseConfigured } from '../services/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const StatusIndicator: React.FC<{ status: 'ok' | 'pending' | 'error'; label: string; details?: string }> = ({ status, label, details }) => {
    const colorClasses = {
        ok: 'bg-teal-500',
        pending: 'bg-amber-500 animate-pulse',
        error: 'bg-red-500',
    };
    return (
        <div className="flex items-center text-xs">
            <div className={`w-2 h-2 rounded-full mr-2 ${colorClasses[status]}`}></div>
            <span className="font-semibold">{label}:</span>
            <span className="ml-1">{details}</span>
        </div>
    );
};

const ConnectionStatus: React.FC = () => {
    const [firebaseInit, setFirebaseInit] = useState<'ok' | 'error'>('error');
    const [authStatus, setAuthStatus] = useState<'pending' | 'ok' | 'error'>('pending');
    const [firestoreStatus, setFirestoreStatus] = useState<'pending' | 'ok' | 'error'>('pending');
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        setFirebaseInit(isFirebaseConfigured ? 'ok' : 'error');
        if (!isFirebaseConfigured) {
            setAuthStatus('error');
            setFirestoreStatus('error');
            return;
        }

        let firestoreIntervalId: number | undefined;

        const checkFirestore = async (user: FirebaseUser) => {
            if (!db) {
                setFirestoreStatus('error');
                return;
            }
            try {
                // This is a more reliable check. We try to get the user's own profile data.
                // This test will pass if the connection is ok AND security rules are correct.
                const docRef = doc(db, 'users', user.uid);
                await getDoc(docRef);
                setFirestoreStatus('ok');
            } catch (error) {
                console.error("Firestore connectivity check failed:", error);
                setFirestoreStatus('error');
            }
        };

        const unsubscribeAuth = onAuthStateChanged(auth, user => {
            if (user) {
                setAuthStatus('ok');
                checkFirestore(user); // Initial check on login
                if (firestoreIntervalId) clearInterval(firestoreIntervalId);
                firestoreIntervalId = window.setInterval(() => checkFirestore(user), 20000); // Check every 20s
            } else {
                setAuthStatus('pending');
                setFirestoreStatus('pending'); // Not an error, just waiting for login
                if (firestoreIntervalId) {
                    clearInterval(firestoreIntervalId);
                }
            }
        }, (error) => {
            console.error("Auth error listener:", error);
            setAuthStatus('error');
            setFirestoreStatus('error');
            if (firestoreIntervalId) clearInterval(firestoreIntervalId);
        });

        return () => {
            unsubscribeAuth();
            if (firestoreIntervalId) {
                clearInterval(firestoreIntervalId);
            }
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 right-4 bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border dark:border-slate-700 text-slate-700 dark:text-slate-300 z-50">
            <div className="flex justify-between items-center mb-2 border-b dark:border-slate-600 pb-1">
                <h4 className="font-bold text-sm">Diagnóstico de Conexión</h4>
                <button onClick={() => setIsVisible(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs">✖</button>
            </div>
            <div className="space-y-1">
                <StatusIndicator status={firebaseInit} label="SDK Firebase" details={firebaseInit === 'ok' ? 'Inicializado' : 'Error de Config'} />
                <StatusIndicator status={authStatus} label="Autenticación" details={authStatus === 'ok' ? 'Conectado' : 'Desconectado'} />
                <StatusIndicator status={firestoreStatus} label="Base de Datos" details={firestoreStatus === 'ok' ? 'Accesible' : (firestoreStatus === 'pending' ? 'Esperando auth...' : 'Error')} />
            </div>
        </div>
    );
};

export default ConnectionStatus;