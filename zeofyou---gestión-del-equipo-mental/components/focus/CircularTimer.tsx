
import React from 'react';

interface CircularTimerProps {
  duration: number; // total duration in seconds
  remaining: number; // remaining time in seconds
  size?: number; // diameter of the circle
  strokeWidth?: number; // width of the progress stroke
}

const CircularTimer: React.FC<CircularTimerProps> = ({
  duration,
  remaining,
  size = 180,
  strokeWidth = 12,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = ((duration - remaining) / duration) * circumference;

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="text-gray-700"
          fill="transparent"
          stroke="currentColor"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="text-blue-500"
          fill="transparent"
          stroke="currentColor"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-white">{formatTime(remaining)}</span>
      </div>
    </div>
  );
};

export default CircularTimer;
