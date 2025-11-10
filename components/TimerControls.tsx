
import React from 'react';
import { TimerStatus } from '../types';

interface TimerControlsProps {
  status: TimerStatus;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  isStartDisabled: boolean;
}

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => {
  return (
    <button
      className={`px-8 py-3 text-lg font-semibold rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const TimerControls: React.FC<TimerControlsProps> = ({ status, onStart, onPause, onReset, isStartDisabled }) => {
  return (
    <div className="flex items-center space-x-4">
      {status === TimerStatus.IDLE && (
        <Button onClick={onStart} className="bg-cyan-500 text-white hover:bg-cyan-600 focus:ring-cyan-400" disabled={isStartDisabled}>
          Start
        </Button>
      )}
      {status === TimerStatus.RUNNING && (
        <>
          <Button onClick={onPause} className="bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-400">
            Pause
          </Button>
          <Button onClick={onReset} className="bg-gray-700 text-gray-300 hover:bg-gray-600 focus:ring-gray-500">
            Reset
          </Button>
        </>
      )}
      {status === TimerStatus.PAUSED && (
        <>
          <Button onClick={onStart} className="bg-green-500 text-white hover:bg-green-600 focus:ring-green-400">
            Resume
          </Button>
          <Button onClick={onReset} className="bg-gray-700 text-gray-300 hover:bg-gray-600 focus:ring-gray-500">
            Reset
          </Button>
        </>
      )}
      {(status === TimerStatus.FINISHED) && (
        <Button onClick={onReset} className="bg-cyan-500 text-white hover:bg-cyan-600 focus:ring-cyan-400">
          Reset
        </Button>
      )}
    </div>
  );
};

export default TimerControls;
