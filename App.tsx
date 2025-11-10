
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TimerStatus, Time } from './types';
import TimerDisplay from './components/TimerDisplay';
import TimeInput from './components/TimeInput';
import TimerControls from './components/TimerControls';

const App: React.FC = () => {
  const [time, setTime] = useState<Time>({ hours: '00', minutes: '05', seconds: '00' });
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);
  const [totalSeconds, setTotalSeconds] = useState<number>(0);
  const [status, setStatus] = useState<TimerStatus>(TimerStatus.IDLE);
  const intervalRef = useRef<number | null>(null);
  const alarmAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    alarmAudioRef.current = new Audio('https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg');
    alarmAudioRef.current.loop = true;
  }, []);

  const clearTimerInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);
  
  useEffect(() => {
    if (status === TimerStatus.RUNNING) {
      intervalRef.current = window.setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearTimerInterval();
            setStatus(TimerStatus.FINISHED);
            alarmAudioRef.current?.play();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearTimerInterval();
    }
    
    return () => clearTimerInterval();
  }, [status, clearTimerInterval]);

  const handleTimeChange = (unit: keyof Time) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 0) {
      value = 0;
    }
    if (unit !== 'hours' && value > 59) {
      value = 59;
    }
    setTime(prev => ({ ...prev, [unit]: value.toString().padStart(2, '0') }));
  };

  const handleStart = () => {
    if (status === TimerStatus.IDLE) {
      const h = parseInt(time.hours, 10) || 0;
      const m = parseInt(time.minutes, 10) || 0;
      const s = parseInt(time.seconds, 10) || 0;
      const total = h * 3600 + m * 60 + s;
      setTotalSeconds(total);
      setRemainingSeconds(total);
    }
    setStatus(TimerStatus.RUNNING);
  };

  const handlePause = () => {
    setStatus(TimerStatus.PAUSED);
  };

  const handleReset = () => {
    setStatus(TimerStatus.IDLE);
    setRemainingSeconds(0);
    setTotalSeconds(0);
    alarmAudioRef.current?.pause();
    if(alarmAudioRef.current) alarmAudioRef.current.currentTime = 0;
  };

  const isIdle = status === TimerStatus.IDLE;
  const isRunningOrPaused = status === TimerStatus.RUNNING || status === TimerStatus.PAUSED;
  const hasTimeSet = (parseInt(time.hours) || 0) + (parseInt(time.minutes) || 0) + (parseInt(time.seconds) || 0) > 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-8 sm:space-y-12">
      <header>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-200 tracking-wide">Zenith Timer</h1>
      </header>

      <main className="flex flex-col items-center justify-center space-y-8">
        {isIdle && (
          <div className="flex items-center space-x-4 sm:space-x-6">
            <TimeInput label="Hours" value={time.hours} onChange={handleTimeChange('hours')} disabled={!isIdle} />
            <span className="text-4xl text-gray-600 pb-8">:</span>
            <TimeInput label="Minutes" value={time.minutes} onChange={handleTimeChange('minutes')} disabled={!isIdle} />
            <span className="text-4xl text-gray-600 pb-8">:</span>
            <TimeInput label="Seconds" value={time.seconds} onChange={handleTimeChange('seconds')} disabled={!isIdle} />
          </div>
        )}

        {(isRunningOrPaused || status === TimerStatus.FINISHED) && (
          <TimerDisplay remainingSeconds={remainingSeconds} totalSeconds={totalSeconds} />
        )}

        <TimerControls
          status={status}
          onStart={handleStart}
          onPause={handlePause}
          onReset={handleReset}
          isStartDisabled={!hasTimeSet}
        />
      </main>
      
      <footer className="absolute bottom-4 text-center text-gray-600 text-sm">
        <p>Crafted for focus and productivity.</p>
      </footer>
    </div>
  );
};

export default App;
