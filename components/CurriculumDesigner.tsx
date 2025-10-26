import React from 'react';
import Card from './Card';

const CurriculumDesigner: React.FC = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-2 text-slate-800 dark:text-white">Asistente de Programación Didáctica</h1>
            <p className="text-slate-500 dark:text-slate-400 mb-8">Herramientas para alinear tu Programación y Unidades de Programación Didáctica con la LOMLOE.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="md:col-span-2 lg:col-span-3 p-6 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-900/50">
                    <h2 className="font-bold text-xl text-amber-800 dark:text-amber-200 mb-2">Requisitos Formales (Comunidad de Madrid)</h2>
                    <ul className="list-disc list-inside space-y-1 text-amber-700 dark:text-amber-300">
                        <li>Extensión máxima: <strong>60 páginas</strong> (sin incluir portada, contraportada, índice ni anexos).</li>
                        <li>Formato: <strong>A4</strong> a una sola cara.</li>
                        <li>Fuente: <strong>Arial 12 puntos</strong>.</li>
                        <li>Interlineado: <strong>Doble</strong>.</li>
                        <li>Márgenes: <strong>2,5 cm</strong> (superior, inferior, izquierdo, derecho).</li>
                    </ul>
                </Card>

                <Card className="p-6">
                    <h2 className="font-bold text-xl mb-4">1. Competencias Específicas</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Asegúrate de concretar las competencias específicas del área de Educación Física para el ciclo/curso correspondiente.</p>
                    <textarea 
                        className="w-full h-32 p-2 border rounded-md bg-slate-100 dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                        placeholder="Ej: CE1. Adoptar un estilo de vida activo y saludable, practicando regularmente actividades físicas..."
                    ></textarea>
                </Card>

                <Card className="p-6">
                    <h2 className="font-bold text-xl mb-4">2. Criterios de Evaluación</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Asocia cada competencia específica con sus criterios de evaluación. Deben ser observables y medibles.</p>
                     <textarea 
                        className="w-full h-32 p-2 border rounded-md bg-slate-100 dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                        placeholder="Ej: 1.1. Integrar la actividad física en la vida diaria, mostrando una mejora en su condición física..."
                    ></textarea>
                </Card>

                <Card className="p-6">
                    <h2 className="font-bold text-xl mb-4">3. Situaciones de Aprendizaje</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Define actividades y situaciones de aprendizaje contextualizadas que movilicen saberes y desarrollen competencias.</p>
                     <textarea 
                        className="w-full h-32 p-2 border rounded-md bg-slate-100 dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                        placeholder="Ej: Proyecto 'Mini-Olimpiadas Escolares'. Los alumnos investigan, diseñan y participan en un evento deportivo..."
                    ></textarea>
                </Card>
            </div>
        </div>
    );
};

export default CurriculumDesigner;