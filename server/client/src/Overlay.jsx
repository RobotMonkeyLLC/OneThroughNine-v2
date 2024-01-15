import React from 'react';
import Leaderboard from './Overlay/Leaderboard.jsx';
import Title from './Overlay/Title';
import Rules from './Overlay/Rules'
import Difficulty from './Overlay/Difficulty.jsx'
import { difficulties } from './Constants/text.js';
import Footer from './Footer.jsx';

// setTiles needs to be merged into setGoal
function Overlay({ onGameStart, setDifficultySelected, goal, setGoal, setTiles}) {
  // Add necessary logic and JSX elements for the overlay
  return (
    <div className="overlay">
      <Title />
      <Rules />
      <Difficulty  
        difficulties={difficulties}
        onStartGame={onGameStart}
        setDifficultySelected={setDifficultySelected}
        goal={goal}
        setGoal={setGoal}
        setTiles={setTiles}
      />
      <Leaderboard />
      <Footer />
    </div>
  );
}

export default Overlay;
