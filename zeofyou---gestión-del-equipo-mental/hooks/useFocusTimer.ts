
import { useState, useEffect, useCallback } from 'react';

interface FocusTimerResult {
  timeLeft: number;
  isActive: boolean;
  isPaused: boolean;
  startTimer: (durationMinutes: number) => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  resetTimer: (durationMinutes?: number) => void;
  formattedTime: string;
}

const useFocusTimer = (initialDurationMinutes: number = 25): FocusTimerResult => {
  const [duration, setDuration] = useState(initialDurationMinutes * 60);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isActive && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      // Optionally play a sound or show a notification
      console.log("Focus session ended!");
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isPaused, timeLeft]);

  const startTimer = useCallback((newDurationMinutes: number) => {
    setDuration(newDurationMinutes * 60);
    setTimeLeft(newDurationMinutes * 60);
    setIsActive(true);
    setIsPaused(false);
  }, []);

  const pauseTimer = useCallback(() => {
    if (isActive && !isPaused) {
      setIsPaused(true);
    }
  }, [isActive, isPaused]);

  const resumeTimer = useCallback(() => {
    if (isActive && isPaused) {
      setIsPaused(false);
    }
  }, [isActive, isPaused]);

  const resetTimer = useCallback((newDurationMinutes?: number) => {
    const resetDuration = newDurationMinutes ? newDurationMinutes * 60 : duration;
    setDuration(resetDuration);
    setTimeLeft(resetDuration);
    setIsActive(false);
    setIsPaused(false);
  }, [duration]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return {
    timeLeft,
    isActive,
    isPaused,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    formattedTime: formatTime(timeLeft),
  };
};

export default useFocusTimer;
