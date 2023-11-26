import getDefaults from './defaults.js';

const choice = [
    {id:1,value:1},
    {id:2,value:2},
    {id:3,value:3},
    {id:4,value:4},
    {id:5,value:5},
]

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
            <p>10</p>
        </div>
    )
}

export { Goal, choice }