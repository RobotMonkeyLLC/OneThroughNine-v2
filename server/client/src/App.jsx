import React, { useState, useEffect } from 'react';
import './App.css';
import './animation.css';
import Overlay from './Overlay.jsx';
import GameBoard from './GameBoard.jsx';
import GameOver from './GameOver.jsx';
import Footer from './Footer.jsx';

function App() {
  const [seconds, setSeconds] = useState(0);
  const [goal, setGoal] = useState(0);
  const [tiles, setTiles] = useState([1,2,3,4,5]);
  const [difficultySelected, setDifficultySelected] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [isSolved, setIsSolved] = useState(false);

  
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

  const handleGameStart = () => {
    // Set difficulty and enable game board to render
    //console.log('game handle started')
    //setDifficultySelected(selectedDifficulty);
    setGameStarted(!gameStarted);
    //console.log('game handle started')
    // Perform other actions related to the selected difficulty if needed
  };
  
  const handleGameReStart = () => {
    //console.log('game handle restarted')
    setGameStarted(false);
    setTimeout(() => setGameStarted(true), 10);
  };
  //console.log('loading app')
  return (
    <div className="App">
      
        <Overlay 
          onGameStart={handleGameStart}
          setDifficultySelected={setDifficultySelected}
          goal={goal}
          setGoal={setGoal}
          setTiles={setTiles}
        />
      
      <GameBoard 
        goal={goal}
        tiles={tiles}
        gameStarted={gameStarted}
        isSolved={isSolved}
        setIsSolved={setIsSolved}
        handleGameReStart={handleGameReStart}   
        />
        
      <GameOver isSolved={isSolved} difficultySelected={difficultySelected}/>
      <Footer />
    </div>
  );
}
document.addEventListener("DOMContentLoaded", function() {
  localStorage.setItem('undoStack', JSON.stringify([]));
});
export default App;
