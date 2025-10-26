import React, { useState } from 'react';
import { Topic, TopicStatus } from '../types';
import Card from './Card';
import ConceptMapModal from './ConceptMapModal';

const statusConfig = {
    [TopicStatus.NotStarted]: { color: 'bg-slate-200 dark:bg-slate-600', text: 'No Iniciado' },
    [TopicStatus.InProgress]: { color: 'bg-amber-400', text: 'En Progreso' },
    [TopicStatus.FirstReview]: { color: 'bg-sky-400', text: '1ª Vuelta' },
    [TopicStatus.SecondReview]: { color: 'bg-indigo-400', text: '2ª Vuelta' },
    [TopicStatus.Mastered]: { color: 'bg-teal-500', text: 'Dominado' },
};

const statusOrder = [
    TopicStatus.NotStarted,
    TopicStatus.InProgress,
    TopicStatus.FirstReview,
    TopicStatus.SecondReview,
    TopicStatus.Mastered,
];

interface SyllabusTrackerProps {
    topics: Topic[];
    onTopicsChange: (newTopics: Topic[]) => void;
}

const SyllabusTracker: React.FC<SyllabusTrackerProps> = ({ topics, onTopicsChange }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

    const handleTopicStatusClick = (topicId: number) => {
        const newTopics = topics.map(topic => {
            if (topic.id === topicId) {
                const currentIndex = statusOrder.indexOf(topic.status);
                const nextIndex = (currentIndex + 1) % statusOrder.length;
                return { ...topic, status: statusOrder[nextIndex] };
            }
            return topic;
        });
        onTopicsChange(newTopics);
    };
    
    const handleViewMapClick = (topic: Topic) => {
        if (topic.conceptMap) {
            setSelectedTopic(topic);
            setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedTopic(null);
    };
    
    const getProgress = () => {
        if (topics.length === 0) return 0;
        const masteredCount = topics.filter(t => t.status === TopicStatus.Mastered).length;
        return Math.round((masteredCount / topics.length) * 100);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-2 text-slate-800 dark:text-white">Seguimiento del Temario</h1>
            <p className="text-slate-500 dark:text-slate-400 mb-8">Visualiza tu avance en los 25 temas. Haz clic en un tema para cambiar su estado.</p>
            
            <Card className="p-6 mb-8">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg">Progreso General</h3>
                    <span className="font-bold text-teal-500">{getProgress()}% Dominado</span>
                </div>
                 <div className="mt-4 flex space-x-2">
                    {Object.entries(statusConfig).map(([status, config]) => {
                         const count = topics.filter(t => t.status === status as TopicStatus).length;
                         if (count === 0) return null;
                         const percentage = (count/topics.length) * 100;
                         return (
                            <div key={status} className={`${config.color} h-3 rounded-full`} style={{width: `${percentage}%`}} title={`${config.text}: ${count} temas`}></div>
                         );
                    })}
                </div>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {topics.map(topic => (
                    <Card key={topic.id} className="p-4 flex flex-col justify-between">
                         <div
                            className="cursor-pointer flex-grow"
                            onClick={() => handleTopicStatusClick(topic.id)}
                         >
                            <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full mb-3 ${statusConfig[topic.status].color} text-slate-800`}>
                                {statusConfig[topic.status].text}
                            </span>
                            <span className="block text-lg font-bold">Tema {topic.id}</span>
                            <p className="text-sm text-slate-600 dark:text-slate-400 h-12 mt-1">{topic.title.replace(`Tema ${topic.id}: `, '')}</p>
                        </div>
                        
                        {topic.conceptMap ? (
                             <button
                                onClick={() => handleViewMapClick(topic)}
                                className="mt-4 w-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-bold py-2 px-4 rounded-lg text-sm transition-colors"
                            >
                                Ver esquema
                            </button>
                        ) : (
                            <div className="mt-4 text-center text-xs text-slate-400 dark:text-slate-500 py-2 h-[38px] flex items-center justify-center">Esquema no disponible</div>
                        )}
                    </Card>
                ))}
            </div>

            <ConceptMapModal 
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                topicTitle={selectedTopic ? selectedTopic.title : ''}
                mapData={selectedTopic ? selectedTopic.conceptMap : null}
            />
        </div>
    );
};

export default SyllabusTracker;