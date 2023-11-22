import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [timerText, setTimerText] = useState('00:00');

  useEffect(() => {
    const interval = setInterval(() => {
      // Update seconds
      setSeconds(prevSeconds => prevSeconds + 1);

      // Convert total seconds to MM:SS format
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;

      // Format minutes and seconds with leading zeroes if needed
      const formattedMinutes = String(minutes).padStart(2, '0');
      const formattedSeconds = String(remainingSeconds).padStart(2, '0');

      // Update timer text
      setTimerText(`${formattedMinutes}:${formattedSeconds}`);
    }, 1000);

    // Clean up the interval
    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <p>{timerText}</p>
  );
};

export default Timer;
