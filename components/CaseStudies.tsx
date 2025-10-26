import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { CASE_STUDIES, ICONS } from '../constants';
import { CaseStudy, Flashcard } from '../types';
import Card from './Card';

const FlashcardComponent: React.FC<{ card: Flashcard }> = ({ card }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    return (
        <div className="[perspective:1000px] w-full h-40 cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
            <div className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
                {/* Front */}
                <div className="absolute w-full h-full [backface-visibility:hidden] bg-sky-100 dark:bg-sky-900/50 rounded-lg p-4 flex items-center justify-center text-center">
                    <p className="font-semibold text-sky-800 dark:text-sky-200">{card.question}</p>
                </div>
                {/* Back */}
                <div className="absolute w-full h-full [backface-visibility:hidden] bg-sky-200 dark:bg-sky-800 rounded-lg p-4 flex items-center justify-center text-center [transform:rotateY(180deg)]">
                    <p className="text-sm text-sky-900 dark:text-sky-100">{card.answer}</p>
                </div>
            </div>
        </div>
    );
};

const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center p-8 text-center">
        <svg className="animate-spin h-10 w-10 text-teal-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="font-semibold text-slate-600 dark:text-slate-300">Generando respuesta...</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">La IA está preparando una solución experta para ti.</p>
    </div>
);

const MarkdownRenderer: React.FC<{ text: string }> = ({ text }) => {
    const html = text
        .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
        .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-6 mb-3 border-b border-slate-200 dark:border-slate-700 pb-2">$1</h2>')
        .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/^- (.*$)/gim, '<li class="ml-6 list-disc">$1</li>')
        .replace(/\n/g, '<br />')
        .replace(/<br \/><li/g, '<li') // Fix for lists
        .replace(/<br \/>(<h[1-3]>)/g, '$1'); // fix for headings

    return <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: html }} />;
}

const downloadAsTextFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};


const CaseStudies: React.FC = () => {
    const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(CASE_STUDIES[0]);
    const [activeTab, setActiveTab] = useState<'draft' | 'ai' | 'flashcards'>('draft');
    
    const [aiSolution, setAiSolution] = useState<string | null>(null);
    const [isLoadingAI, setIsLoadingAI] = useState(false);
    const [aiError, setAiError] = useState<string | null>(null);

    const [userDraft, setUserDraft] = useState('');

    const handleSelectStudy = (study: CaseStudy) => {
        setSelectedStudy(study);
        setAiSolution(null);
        setAiError(null);
        setUserDraft('');
        setActiveTab('draft');
    };

    const handleGenerateSolution = async (draftToEvaluate?: string) => {
        if (!selectedStudy) return;

        setIsLoadingAI(true);
        setAiSolution(null);
        setAiError(null);
        setActiveTab('ai');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            let prompt = '';
            if (draftToEvaluate && draftToEvaluate.trim().length > 0) {
                // Prompt for evaluating a user's draft
                prompt = `
Eres un preparador experto y un miembro evaluador de un tribunal de oposiciones de Educación Física para maestros en la Comunidad de Madrid, España. Tu tarea es analizar, evaluar y mejorar el borrador de un supuesto práctico que te ha proporcionado un opositor.

**Rúbrica de Evaluación Estricta a seguir:**
- **Introducción:** ¿Es clara, contextualizada y está bien vinculada a la legislación vigente (LOMLOE, RD 157/2022, Decreto 61/2022 CAM)?
- **Desarrollo Metodológico:** ¿La secuencia de actividades es lógica, innovadora y adaptada al contexto? ¿Es práctica y realista?
- **Justificación Teórica y Normativa:** ¿Se cita explícitamente y de forma correcta la legislación y autores relevantes?
- **Evaluación:** ¿Se proponen criterios, procedimientos e instrumentos de evaluación competenciales y claros?
- **Conclusión:** ¿El cierre es coherente, potente y resalta la idoneidad de la propuesta?

**Supuesto Práctico:**
Título: "${selectedStudy.title}"
Descripción: "${selectedStudy.description}"

**Borrador del Opositor a Evaluar:**
"""
${draftToEvaluate}
"""

**Tu Tarea (en 3 partes):**

1.  **## Análisis y Feedback del Borrador:**
    Proporciona un feedback constructivo y detallado, sección por sección, basado en la rúbrica.
    - **Puntos Fuertes:** Enumera los aspectos positivos del borrador.
    - **Áreas de Mejora:** Señala de forma específica qué falta, qué se puede mejorar o qué es incorrecto, ofreciendo sugerencias claras.

2.  **## Propuesta de Solución Mejorada:**
    A partir del borrador del opositor y tu análisis experto, reescribe y presenta una versión completa, mejorada y pulida del supuesto práctico. Esta versión debe ser un modelo de excelencia, listo para impresionar a un tribunal. Mantén las buenas ideas del opositor si las hay, pero elévalas a un nivel superior.

3.  **## Resumen de Cambios Clave:**
    Finaliza con una breve lista de los 3-4 cambios más importantes que has realizado y por qué han mejorado significativamente la calidad de la respuesta.

Utiliza un lenguaje técnico-pedagógico preciso y formatea toda tu respuesta usando Markdown.
`;
            } else {
                // Prompt for generating a solution from scratch
                prompt = `
Eres un preparador experto en oposiciones de Educación Física para maestros en la Comunidad de Madrid, España. Tu tarea es resolver el siguiente supuesto práctico de manera excepcional, siguiendo la estructura y criterios de la rúbrica oficial.

**Rúbrica de Evaluación a seguir:**
- **Introducción:** Clara, contextualizada y vinculada a la legislación vigente.
- **Desarrollo Metodológico:** Secuencia de actividades lógicas, innovadoras y adaptadas.
- **Justificación Teórica y Normativa:** Cita explícita y correcta de la legislación (LOMLOE, RD 157/2022, Decreto 61/2022 CAM) y autores relevantes si procede.
- **Evaluación:** Criterios, procedimientos e instrumentos de evaluación competenciales.
- **Conclusión:** Cierre coherente y que resalte la idoneidad de la propuesta.

**Supuesto Práctico a Resolver:**
Título: "${selectedStudy.title}"
Descripción: "${selectedStudy.description}"

Genera una respuesta detallada, bien estructurada y lista para impresionar a un tribunal de oposición. Utiliza un lenguaje técnico-pedagógico preciso. Formatea la respuesta usando Markdown con encabezados de nivel 2 (##) para cada una de las 5 secciones de la rúbrica.
`;
            }
            
            const response = await ai.models.generateContent({ model: 'gemini-2.5-pro', contents: prompt });
            setAiSolution(response.text);
        } catch (error) {
            console.error(error);
            setAiError('No se pudo generar la respuesta. Por favor, inténtalo de nuevo.');
        } finally {
            setIsLoadingAI(false);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-2 text-slate-800 dark:text-white">Supuestos Prácticos</h1>
            <p className="text-slate-500 dark:text-slate-400 mb-8">Practica con simulacros, pide a la IA que resuelva un supuesto o evalúe tu borrador, y repasa con flashcards.</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1 flex flex-col gap-4 max-h-[80vh] overflow-y-auto pr-2">
                    {CASE_STUDIES.map(study => (
                        <Card
                            key={study.id}
                            className={`p-4 cursor-pointer border-2 transition-all ${selectedStudy?.id === study.id ? 'border-teal-500 shadow-teal-500/20' : 'border-transparent'}`}
                            onClick={() => handleSelectStudy(study)}
                        >
                            <h3 className="font-bold text-lg">{study.title}</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {study.topics.map(topic => (
                                    <span key={topic} className="text-xs bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-full">{topic}</span>
                                ))}
                            </div>
                        </Card>
                    ))}
                </div>
                <div className="lg:col-span-2">
                    <Card className="p-6 h-full min-h-[500px]">
                        {selectedStudy ? (
                            <div>
                                <h2 className="text-2xl font-bold mb-2">{selectedStudy.title}</h2>
                                <p className="mb-6 text-slate-600 dark:text-slate-400">{selectedStudy.description}</p>
                                
                                <div className="border-b border-slate-200 dark:border-slate-700 mb-4">
                                    <nav className="-mb-px flex space-x-6">
                                        <button onClick={() => setActiveTab('draft')} className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'draft' ? 'border-teal-500 text-teal-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:border-slate-600'}`}>Mi Borrador</button>
                                        <button onClick={() => setActiveTab('ai')} className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'ai' ? 'border-teal-500 text-teal-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:border-slate-600'}`}>Resolución con IA</button>
                                        <button onClick={() => setActiveTab('flashcards')} className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'flashcards' ? 'border-teal-500 text-teal-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:border-slate-600'}`}>Flashcards Clave</button>
                                    </nav>
                                </div>

                                <div>
                                    {activeTab === 'draft' && (
                                        <div>
                                            <h3 className="text-lg font-semibold mb-2">Escribe aquí tu solución</h3>
                                            <textarea 
                                                className="w-full h-80 p-3 border rounded-md bg-slate-50 dark:bg-slate-900/50 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                                                placeholder="Comienza a estructurar tu respuesta: introducción, desarrollo, justificación..."
                                                value={userDraft}
                                                onChange={(e) => setUserDraft(e.target.value)}
                                            ></textarea>
                                            <button 
                                                onClick={() => handleGenerateSolution(userDraft)}
                                                disabled={!userDraft.trim()}
                                                className="mt-4 w-full bg-sky-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-sky-600 transition duration-300 disabled:bg-slate-400 disabled:cursor-not-allowed dark:disabled:bg-slate-600">
                                                Evaluar Borrador con IA
                                            </button>
                                        </div>
                                    )}
                                    {activeTab === 'ai' && (
                                        <div>
                                            {!aiSolution && !isLoadingAI && (
                                                <div className="text-center p-8">
                                                    <h3 className="text-lg font-semibold mb-2">¿Necesitas una solución modelo?</h3>
                                                    <p className="text-slate-500 dark:text-slate-400 mb-4">Genera una solución completa y estructurada utilizando IA para guiar tu estudio.</p>
                                                    <button onClick={() => handleGenerateSolution()} className="bg-teal-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-teal-600 transition duration-300">
                                                        Resolver con IA desde Cero
                                                    </button>
                                                </div>
                                            )}
                                            {isLoadingAI && <LoadingSpinner />}
                                            {aiError && <p className="text-red-500 text-center">{aiError}</p>}
                                            {aiSolution && (
                                                <div>
                                                     <div className="flex justify-between items-center mb-4">
                                                        <h3 className="text-lg font-semibold">Propuesta de la IA</h3>
                                                        <button 
                                                            onClick={() => downloadAsTextFile(aiSolution, `Solucion_${selectedStudy.title.replace(/ /g, "_")}.txt`)}
                                                            className="flex items-center gap-2 text-sm bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 px-3 py-1 rounded-md"
                                                            title="Descargar solución"
                                                        >
                                                            {ICONS.download}
                                                            Descargar
                                                        </button>
                                                    </div>
                                                    <MarkdownRenderer text={aiSolution} />
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    {activeTab === 'flashcards' && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {selectedStudy.flashcards && selectedStudy.flashcards.length > 0 ? (
                                                selectedStudy.flashcards.map(card => <FlashcardComponent key={card.id} card={card} />)
                                            ) : (
                                                <p className="col-span-full text-center text-slate-500 dark:text-slate-400">No hay flashcards para este supuesto.</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full text-center">
                                <p className="text-slate-500 dark:text-slate-400">Selecciona un supuesto práctico de la lista para comenzar.</p>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CaseStudies;