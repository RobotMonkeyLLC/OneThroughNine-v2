import React, { useState, useEffect } from 'react';
import './App.css';
import Overlay from './Overlay.jsx';
import GameBoard from './GameBoard.jsx';

function App() {
  const [seconds, setSeconds] = useState(0);
  const [goal, setGoal] = useState(0);
  const [difficultySelected, setDifficultySelected] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [isSolved, setIsSolved] = useState(false);

  // Add more state variables as needed to manage the game

  useEffect(() => {
    // Function to update timer every second
    if(gameStarted) {
      const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);
    return () => clearInterval(interval);}
  }, [gameStarted]);

  useEffect(() => {
    // Function to fetch initial game data or set up game elements
    const fetchData = async () => {
      try {
        // Fetch game data or perform initial setup
        // Example: fetch('/api').then((res) => res.json()).then((data) => setData(data.message));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const formatTime = (totalSeconds) => {
    // Function to format total seconds to HH:MM:SS
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    return formattedTime;
  };

  const handleGameLogic = () => {
    // Function to handle game logic and UI updates
    // Implement your game logic and UI updates here
  };

  const handleGameStart = () => {
    // Set difficulty and enable game board to render
    console.log('game handle started')
    //setDifficultySelected(selectedDifficulty);
    setGameStarted(true);
    // Perform other actions related to the selected difficulty if needed
  };
  
  return (
    <div className="App">
      
    <div id="overlay" className="overlay">
      <Overlay onGameStart={handleGameStart} />
    </div>
    <GameBoard selectedDifficulty={difficultySelected} gameStarted={gameStarted} isSolved={isSolved}/>
      
    <div id="game-over" className="game-over-container hidden">
      {/* Implement game over elements here */}
    </div>
    </div>
  );
}

export default App;
