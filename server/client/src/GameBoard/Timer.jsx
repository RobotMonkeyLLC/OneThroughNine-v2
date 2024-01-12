import React, { useState, useEffect } from 'react';

const Timer = ({ gameStarted }) => {
  const [seconds, setSeconds] = useState(0);
  const [timerText, setTimerText] = useState('00:00');

  useEffect(() => {
    let interval;

    if (gameStarted) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [gameStarted]);

  useEffect(() => {
    // Reset timer when game is restarted
    if (!gameStarted) {
      setSeconds(0);
    }
  }, [gameStarted]);

  useEffect(() => {
    // Update timer text when seconds change
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    setTimerText(`${formattedMinutes}:${formattedSeconds}`);
  }, [seconds]);

  return <div className='timer-container'><p id='timer' className='timer'>{timerText}</p></div>;
};

export default Timer;
