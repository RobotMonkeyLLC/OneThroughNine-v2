import React from 'react';
import Timer from './GameBoard/Timer.jsx';
import Message from './GameBoard/Message.jsx';
import Goal, {getDifficulty} from './GameBoard/getChoice.jsx';
import Stack from './GameBoard/Stack.jsx';
import BoardTile from './GameBoard/BoardTile.jsx';
import Operators from './GameBoard/Operators.jsx';
import Controls from './GameBoard/Controls.jsx';

function GameBoard ({ goal, tiles, gameStarted, isSolved, handleGameReStart, setTiles }) {
    //setDifficultySelected(selectedDifficulty ? choice : [])
    //console.log(tiles, 'choice in GameBoard');
    /* const restart = () => {
        onGameRestart()
    } */
    //const goal = getDifficulty(selectedDifficulty);
    //setTiles(getDifficulty(goal))
    return (
        <div id = "game-board" className="game-container">
            
            <div className="title-container">
                <h1>OneThruNine</h1>
            </div>
            <Goal goal={goal.target}/>
            <Timer gameStarted={gameStarted}/>
            <Message />
            <Stack keys={gameStarted ? goal.tiles : []} isSolved={isSolved}/>
            <BoardTile />
            <Operators isSolved={isSolved}/>
            <Controls handleGameReStart={handleGameReStart}/>
        </div>
    )
    
}

export default GameBoard;