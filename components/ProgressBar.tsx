
import React from 'react';

interface ProgressBarProps {
  progress: number; // 0 to 100
  colorClass?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, colorClass = 'bg-teal-500' }) => {
  return (
    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
      <div
        className={`${colorClass} h-2.5 rounded-full transition-all duration-500`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
