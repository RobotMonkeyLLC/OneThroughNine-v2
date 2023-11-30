import PostScore from './GameOver/PostScore.jsx'

function GameOver() {
    
    return (
        <div id = "game-over" className="game-over-container hidden">
            <div className="game-over-message-container"></div>
            <div className="game-over-stats-container"></div>
            <div className="game-over-controls-container"></div>
            <PostScore />
        </div>  
    )
}

export default GameOver