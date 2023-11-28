import { useState } from 'react'
import { getDifficulty } from '../GameBoard/getChoice.jsx'
import { debug } from './Debug.jsx'

const Difficulty = ({difficulties, onStartGame, setDifficultySelected, goal, setGoal}) => {
    const [ isDebug, setIsDebug ] = useState(false)
    const [ min, setMin ] = useState(1)
    const [ max, setMax ] = useState(9)
    const [ target, setTarget ] = useState(0)

    const toggleDebug = () => {
        setIsDebug(!isDebug)
    }
    const startGame = ({index}) => {
        if (isDebug) {
            //setGoal(getDifficulty(difficulties.ids[index]))
            console.log(goal, 'in Difficulty')
        } else {
        getDifficulty(difficulties.ids[index]).then(data => {
            setGoal(data)
            setDifficultySelected(difficulties.ids[index])
            document.querySelector('.overlay').style.display = 'none'
            onStartGame(true)
            console.log(goal, 'in Difficulty')
        })}
    }

    return (
    <div className="difficulty-container">
        <div className='text-header'>
            <p>Difficulty</p>
            <button className='debug-button' onClick={toggleDebug}>Debug</button>
        </div>
        <div className="difficulty-buttons">
            {
                difficulties.display.map((difficulty, index) =>  (
                        <button className="difficulty-button" onClick={() => {
                            if (isDebug) {
                                //setGoal(getDifficulty(difficulties.ids[index]))
                                console.log(goal, 'in Difficulty')
                                getDifficulty(difficulties.ids[index]).then(data => {
                                    setTarget(data.target)
                                })
                            } else {
                            // matches api difficulty ids to difficulty names
                                startGame({index})
                            }
                            }
                        } id={difficulties.ids[index]} key={index}>{difficulty}</button>
                    )
                )
            }
            
        </div>
        {isDebug && <div className='debug-box'>
            <input type="number" placeholder={target ||'Set target'} className='goal-contianer'/>
            <button>Random</button>
            <button>Start</button>
        </div>}
    </div>
)}

export default Difficulty