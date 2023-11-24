import React from 'react';
import Leaderboard from './Leaderboard';

const Title = () => (
    <div className="main-title-container">
        <h1>OneThruNine</h1>
    </div>
);

const Rules = () => (
    <div className="rules-container">
        <div className="rules">
            <p className='text-header'>Directions</p>
            <p>
                Use all of the digits provided to arrive at the random number generated.
            </p>
        </div>        
    </div>
)


const Difficulty = ({difficulties, onStartGame}) => (
    <div className="difficulty-container">
        <p className='text-header'>Difficulty</p>
        <div className="difficulty-buttons">
            {
                difficulties.map((difficulty, index) =>  (
                        <button className="difficulty-button" onClick={() => {
                            document.querySelector('.overlay').style.display = 'none'
                            onStartGame(true)
                            }
                        } key={index}>{difficulty}</button>
                    )
                )
            }
            
        </div>
    </div>
)

function Overlay({ onGameStart }) {
  // Add necessary logic and JSX elements for the overlay
  
  
  return (
    <div className="overlay">
      <Title />
      <Rules />
      <Difficulty  difficulties={['Easy', 'Medium', 'Hard']} onStartGame={onGameStart}/>
      <Leaderboard />
      {/* Add more elements as needed */}
    </div>
  );
}

export default Overlay;
