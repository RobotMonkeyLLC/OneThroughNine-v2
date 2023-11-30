function GameOver() {
    
    return (
        <div id = "game-over" className="game-over-container hidden">
        <div className="game-over-message-container"></div>
        <div className="game-over-stats-container"></div>
        <div className="game-over-controls-container"></div>
        <div id = "post-score" className="hidden"></div>
        </div>  
    )
}

export default GameOver