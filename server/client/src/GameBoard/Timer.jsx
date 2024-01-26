import React, { useState, useEffect } from 'react';

const Timer = ({ gameStarted, isSolved }) => {
  const [seconds, setSeconds] = useState(0);
  const [timerText, setTimerText] = useState('00:00');

  useEffect(() => {
    let interval;

    if (gameStarted) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    if (isSolved) {
      clearInterval(interval);
      setSeconds(seconds);
    }

    return () => clearInterval(interval);
  }, [gameStarted, isSolved, seconds]);

  useEffect(() => {
    // Reset timer when game is restarted
    if (!gameStarted) {
      setSeconds(0);
    }

  }, [gameStarted]);

  useEffect(() => {
    // Update timer text when seconds change
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const remainingSeconds = seconds % 60;
    const remainingMinutes = minutes % 60;

    const formattedHours = hours > 0 ? String(hours).padStart(2, '0')+':' : '';
    const formattedMinutes = formattedHours + String(remainingMinutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    

    setTimerText(`${formattedMinutes}:${formattedSeconds}`);
  }, [seconds]);

  return <div className='timer-container thirds'><p id='timer' className='timer'>{timerText}</p></div>;
};

export default Timer;
