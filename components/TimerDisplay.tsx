
import React from 'react';

interface TimerDisplayProps {
  remainingSeconds: number;
  totalSeconds: number;
}

const formatTime = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s]
    .map((v) => v.toString().padStart(2, '0'))
    .join(':');
};

const TimerDisplay: React.FC<TimerDisplayProps> = ({ remainingSeconds, totalSeconds }) => {
  const radius = 120;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  
  const progress = totalSeconds > 0 ? remainingSeconds / totalSeconds : 0;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="relative flex items-center justify-center w-72 h-72 sm:w-80 sm:h-80">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="transform -rotate-90"
      >
        <circle
          stroke="#374151"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="currentColor"
          className="text-cyan-400 transition-all duration-300 ease-linear"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <div className="absolute">
        <span className="text-5xl sm:text-6xl font-mono tracking-tighter">
          {formatTime(remainingSeconds)}
        </span>
      </div>
    </div>
  );
};

export default TimerDisplay;
