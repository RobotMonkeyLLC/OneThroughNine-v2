import React from 'react';
import Timer from './GameBoard/Timer.jsx';
import Message from './GameBoard/Message.jsx';
import { Goal, choice } from './GameBoard/getChoice.jsx';
import Stack from './GameBoard/Stack.jsx';

const GameBoard = ({ selectedDifficulty, gameStarted, isSolved }) => {
    console.log(choice, gameStarted,' GameBoard made');
    return (
        <div id = "game-board" className="game-container">
            
            <div className="title-container">
                <h1>OneThruNine</h1>
            </div>
            <Goal />
            {gameStarted && <Timer gameStarted={gameStarted}/>}
            <Message />
            <Stack keys={choice} isSolved={isSolved}/>
            <div className="board-tile-container"></div>
            <div className="operboard-container"></div>
            <div className="controls-container"></div>

        </div>
    )
    
}

export default GameBoard;