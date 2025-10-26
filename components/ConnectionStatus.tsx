import React, { useState, useEffect } from 'react';
import { auth, db, isFirebaseConfigured } from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
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
        // 1. Check Firebase SDK Initialization
        setFirebaseInit(isFirebaseConfigured ? 'ok' : 'error');
        if (!isFirebaseConfigured) {
            setAuthStatus('error');
            setFirestoreStatus('error');
            return;
        }

        // 2. Check Auth State
        const unsubscribeAuth = onAuthStateChanged(auth, user => {
            setAuthStatus(user ? 'ok' : 'pending'); // pending means 'not logged in' which is fine
        }, (error) => {
            console.error("Auth error listener:", error);
            setAuthStatus('error');
        });

        // 3. Check Firestore Connectivity
        const checkFirestore = async () => {
            if (!db) {
                setFirestoreStatus('error');
                return;
            }
            try {
                // Try to read a non-existent document. This just tests connectivity without needing real data.
                const docRef = doc(db, 'health_check', 'ping');
                await getDoc(docRef);
                setFirestoreStatus('ok');
            } catch (error) {
                console.error("Firestore connectivity check failed:", error);
                setFirestoreStatus('error');
            }
        };

        const intervalId = setInterval(checkFirestore, 15000); // Check every 15s
        checkFirestore(); // Initial check

        return () => {
            unsubscribeAuth();
            clearInterval(intervalId);
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
                <StatusIndicator status={authStatus} label="Autenticación" details={authStatus === 'ok' ? 'Conectado' : (authStatus === 'pending' ? 'Esperando' : 'Error')} />
                <StatusIndicator status={firestoreStatus} label="Base de Datos" details={firestoreStatus === 'ok' ? 'Accesible' : (firestoreStatus === 'pending' ? 'Probando...' : 'Error')} />
            </div>
        </div>
    );
};

export default ConnectionStatus;
