
import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';
import { PHYSICAL_TESTS_MADRID } from '../constants';
import { ICONS } from '../constants';

const Stopwatch: React.FC = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        if (isRunning) {
            const startTime = Date.now() - time;
            timerRef.current = window.setInterval(() => {
                setTime(Date.now() - startTime);
            }, 10);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isRunning]);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const milliseconds = Math.floor((time % 1000) / 10);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;
    };
    
    return (
        <div className="text-center p-4 bg-slate-100 dark:bg-slate-700 rounded-b-xl">
            <div className="font-mono text-4xl mb-4">{formatTime(time)}</div>
            <div className="flex justify-center space-x-4">
                <button
                    onClick={() => setIsRunning(!isRunning)}
                    className={`px-4 py-2 rounded-lg font-bold text-white ${isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-teal-500 hover:bg-teal-600'}`}
                >
                    {isRunning ? 'Parar' : 'Iniciar'}
                </button>
                <button
                    onClick={() => { setIsRunning(false); setTime(0); }}
                    className="px-4 py-2 rounded-lg font-bold bg-slate-500 hover:bg-slate-600 text-white"
                >
                    Reset
                </button>
            </div>
        </div>
    )
}

const PhysicalTests: React.FC = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-2 text-slate-800 dark:text-white">Pruebas Físicas (Madrid)</h1>
            <p className="text-slate-500 dark:text-slate-400 mb-8">Simula y cronometra las pruebas físicas específicas de la oposición en la Comunidad de Madrid.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PHYSICAL_TESTS_MADRID.map(test => (
                    <Card key={test.id} className="flex flex-col">
                        <div className="p-6 flex-grow">
                            <h2 className="text-xl font-bold mb-2">{test.name}</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">{test.description}</p>
                        </div>
                        <Stopwatch />
                    </Card>
                ))}
            </div>

             <Card className="mt-8 p-6">
                <h2 className="font-bold text-xl mb-4">Contenido de Salud y Motor</h2>
                <ul className="list-disc list-inside space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    <li><strong>Capacidades Físicas Básicas:</strong> Guías de entrenamiento para Fuerza, Velocidad, Resistencia y Flexibilidad.</li>
                    <li><strong>Desarrollo Neuromotor:</strong> Evolución en la edad escolar y su implicación en las clases de EF.</li>
                    <li><strong>Patologías del Aparato Motor:</strong> Intervención educativa ante obesidad, torpeza motriz y otras condiciones.</li>
                </ul>
            </Card>
        </div>
    );
};

export default PhysicalTests;
