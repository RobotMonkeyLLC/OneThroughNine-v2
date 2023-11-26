import React from 'react';
import Timer from './GameBoard/Timer.jsx';
import Message from './GameBoard/Message.jsx';
import { Goal, choice } from './GameBoard/getChoice.jsx';
import Stack from './GameBoard/Stack.jsx';
import BoardTile from './GameBoard/BoardTile.jsx';
import Operators from './GameBoard/Operators.jsx';
import Controls from './GameBoard/Controls.jsx';

function GameBoard ({ selectedDifficulty, gameStarted, isSolved, setDifficultySelected }) {
    //setDifficultySelected(selectedDifficulty ? choice : [])
    //console.log(tiles, 'choice in GameBoard');
    return (
        <div id = "game-board" className="game-container">
            
            <div className="title-container">
                <h1>OneThruNine</h1>
            </div>
            <Goal />
            <Timer gameStarted={gameStarted}/>
            <Message />
            <Stack keys={gameStarted ? choice : []} isSolved={isSolved}/>
            <BoardTile />
            <Operators />
            <Controls />
        </div>
    )
    
}

export default GameBoard;