import React from 'react';
import Timer from './GameBoard/Timer.jsx';
import Message from './GameBoard/Message.jsx';
import { Goal, choice } from './GameBoard/getChoice.jsx';
import Stack from './GameBoard/Stack.jsx';
import BoardTile from './GameBoard/BoardTile.jsx';
import Operators from './GameBoard/Operators.jsx';
import Controls from './GameBoard/Controls.jsx';

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
            <BoardTile />
            <Operators />
            <Controls />
        </div>
    )
    
}

export default GameBoard;