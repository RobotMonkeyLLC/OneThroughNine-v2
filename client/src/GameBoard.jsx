import Timer from './Timer.jsx';

function getDefaults(difficulty) {
    let goal = difficulty === 'easy' ? 100 : 
            difficulty === 'advanced' ? 500 : 3000;
    let choice = difficulty === 'easy' ? [1,2,3,4,5] : 
            difficulty === 'advanced' ? [1,2,3,4,5,6,7] : [1,2,3,4,5,6,7,8,9];
    return {goal, choice}
}

async function getDifficulty(difficulty) {
    
    try {
        const response = await fetch(`http://localhost:8000/tiles?difficulty=${difficulty}`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        const goal = data.target;
        const choice = data.tiles;
    } catch (err) {
        let {goal, choice} = getDefaults(difficulty)
        console.error(err);
    }
    
    
}

const Goal = () => {
    return (
        <div className="goal-container">
            <p>{getDifficulty()}</p>
        </div>
    )
}

const GameBoard = () => {
    return (
        <div id = "game-board" className="game-container">
            
            <div className="title-container">
                <h1>OneThruNine</h1>
            </div>
            <Goal />
            <Timer />
            <div className="message-container"></div>        
            <div className="keyboard-container"></div>
            <div className="board-tile-container"></div>
            <div className="operboard-container"></div>
            <div className="controls-container"></div>

        </div>
    )
    
}

export default GameBoard;