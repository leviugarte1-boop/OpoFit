import React from 'react';
import { ConceptMapNode } from '../types';

interface ConceptMapNodeProps {
  node: ConceptMapNode;
}

const ConceptMapNodeComponent: React.FC<ConceptMapNodeProps> = ({ node }) => {
  return (
    <li className="relative pl-8">
        <div className="absolute top-0 -left-2 w-5 h-full border-l-2 border-b-2 border-slate-300 dark:border-slate-600 rounded-bl-lg"></div>
        <div className="absolute -left-2 top-4 w-5 h-px bg-slate-300 dark:border-slate-600"></div>
        <div className="relative mb-2">
            <span className="bg-slate-200 dark:bg-slate-700 px-3 py-1 rounded-md text-sm font-semibold">{node.title}</span>
            {node.children && node.children.length > 0 && (
                <ul className="pt-4 pl-4">
                    {node.children.map((child, index) => (
                        <ConceptMapNodeComponent key={index} node={child} />
                    ))}
                </ul>
            )}
        </div>
    </li>
  );
};


interface ConceptMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  topicTitle: string;
  mapData: ConceptMapNode | null;
}

const ConceptMapModal: React.FC<ConceptMapModalProps> = ({ isOpen, onClose, topicTitle, mapData }) => {
  if (!isOpen || !mapData) return null;

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
        onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 transform transition-all duration-300 scale-95 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-3 mb-5">
            <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Esquema Conceptual</h2>
                <p className="text-teal-600 dark:text-teal-400 font-semibold">{topicTitle}</p>
            </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div>
            <div className="font-bold text-lg bg-teal-500 text-white px-4 py-2 rounded-lg inline-block mb-4">{mapData.title}</div>
            {mapData.children && mapData.children.length > 0 && (
                <ul className="pl-4">
                    {mapData.children.map((child, index) => (
                        <ConceptMapNodeComponent key={index} node={child} />
                    ))}
                </ul>
            )}
        </div>
      </div>
       <style>{`
        @keyframes scale-in {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ConceptMapModal;
