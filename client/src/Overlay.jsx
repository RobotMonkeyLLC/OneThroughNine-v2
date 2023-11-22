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

const Difficulty = () => (
    <div className="difficulty-container">
        <p className='text-header'>Difficulty</p>
        <div className="difficulty-buttons">
            {
                ['Easy', 'Medium', 'Hard'].map((difficulty) => {
                    return (
                        <button className="difficulty-button" >{difficulty}</button>
                    )
                })
            }
            
        </div>
    </div>
)

function Overlay() {
  // Add necessary logic and JSX elements for the overlay

  return (
    <div className="overlay">
      <Title />
      <Rules />
      <Difficulty />
      <Leaderboard />
      {/* Add more elements as needed */}
    </div>
  );
}

export default Overlay;
