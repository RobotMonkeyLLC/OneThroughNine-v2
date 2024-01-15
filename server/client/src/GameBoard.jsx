import React from 'react';
import Timer from './GameBoard/Timer.jsx';
import Message from './GameBoard/Message.jsx';
import {getDifficulty} from './GameBoard/getChoice.jsx';
import Goal from './GameBoard/Goal.jsx';
import Stack from './GameBoard/Stack.jsx';
import BoardTile from './GameBoard/BoardTile.jsx';
/* import Operators from './GameBoard/Operators.jsx'; */
import Controls from './GameBoard/Controls.jsx';

function GameBoard ({ goal, tiles, gameStarted, isSolved, setIsSolved, handleGameReStart }) {
    //setDifficultySelected(selectedDifficulty ? choice : [])
    //console.log(tiles, 'choice in GameBoard');
    /* const restart = () => {
        onGameRestart()
    } */
    //const goal = getDifficulty(selectedDifficulty);
    //setTiles(getDifficulty(goal))
    return (
        <div id = "game-board" className="game-container">
            <div className='game-header'>
                <div className="title-container thirds">
                    <h1>OneThruNine</h1>
                </div>
                <Goal goal={goal}/>
                <Timer gameStarted={gameStarted}/>
            </div>
            
            <Message />
            <Stack keys={gameStarted ? tiles : []} isSolved={isSolved} setIsSolved={setIsSolved}/>
            <BoardTile  isSolved={isSolved} setIsSolved={setIsSolved}/>
            {/* <Operators isSolved={isSolved} setIsSolved={setIsSolved}/> */}
            <Controls isSolved={isSolved} setIsSolved={setIsSolved}/>
        </div>
    )
    
}

export default GameBoard;