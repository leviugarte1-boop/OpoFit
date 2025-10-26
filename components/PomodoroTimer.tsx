
import React, { useState, useEffect, useRef } from 'react';
import { ICONS } from '../constants';

const PomodoroTimer: React.FC = () => {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isBreak, setIsBreak] = useState(false);

    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        if (isActive) {
            intervalRef.current = window.setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                } else if (minutes > 0) {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                } else {
                    // Timer finished
                    setIsActive(false);
                    if (isBreak) {
                        resetTimer(false); // End break
                    } else {
                        startBreak(); // Start break
                    }
                    new Audio('https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3').play();
                }
            }, 1000);
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isActive, seconds, minutes, isBreak]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = (isWork: boolean) => {
        setIsActive(false);
        setIsBreak(!isWork);
        setMinutes(isWork ? 25 : 5);
        setSeconds(0);
    };
    
    const startBreak = () => {
        setIsBreak(true);
        setIsActive(true);
        setMinutes(5);
        setSeconds(0);
    }

    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    return (
        <div className={`w-full p-4 rounded-xl shadow-md text-white flex flex-col justify-center items-center transition-colors duration-500 ${isBreak ? 'bg-sky-500' : 'bg-teal-600'}`}>
            <h3 className="text-lg font-bold">{isBreak ? 'Descanso' : 'Concentración'}</h3>
            <p className="text-4xl font-mono my-2">{formattedTime}</p>
            <div className="flex space-x-3">
                <button onClick={toggleTimer} className="p-2 bg-white/30 rounded-full hover:bg-white/50 transition">
                    {isActive ? ICONS.pause : ICONS.play}
                </button>
                <button onClick={() => resetTimer(true)} className="p-2 bg-white/30 rounded-full hover:bg-white/50 transition">
                    {ICONS.reset}
                </button>
            </div>
        </div>
    );
};

export default PomodoroTimer;
