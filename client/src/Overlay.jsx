import React from 'react';
import Leaderboard from './Overlay/Leaderboard.jsx';
import Title from './Overlay/Title';
import Rules from './Overlay/Rules'


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
