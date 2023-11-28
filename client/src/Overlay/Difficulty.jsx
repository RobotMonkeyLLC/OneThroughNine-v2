import { getDifficulty } from '../GameBoard/getChoice.jsx'

const Difficulty = ({difficulties, onStartGame, setDifficultySelected, goal, setGoal}) => (
    <div className="difficulty-container">
        <p className='text-header'>Difficulty</p>
        <div className="difficulty-buttons">
            {
                difficulties.display.map((difficulty, index) =>  (
                        <button className="difficulty-button" onClick={() => {
                            
                            // matches api difficulty ids to difficulty names
                            getDifficulty(difficulties.ids[index]).then(data => {
                                setGoal(data)
                                setDifficultySelected(difficulties.ids[index])
                                document.querySelector('.overlay').style.display = 'none'
                                onStartGame(true)
                                console.log(goal, 'in Difficulty')
                            })
                            //console.log(goal, 'in Difficulty')
                            //setGoal(getDifficulty(difficulties.ids[index]))
                            
                            //setTiles(goal.tiles)
                            
                            
                            }
                        } id={difficulties.ids[index]} key={index}>{difficulty}</button>
                    )
                )
            }
            
        </div>
    </div>
)

export default Difficulty