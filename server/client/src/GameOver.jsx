import PostScore from './GameOver/PostScore.jsx'

function GameOver({difficultySelected}) {
    
    return (
        <div id = "game-over" className="game-over-container hidden">
            <div className="game-over-message-container"></div>
            <div className="game-over-stats-container"></div>
            <div className="game-over-controls-container"></div>
            <PostScore difficultySelected={difficultySelected}/>
        </div>  
    )
}

export default GameOver