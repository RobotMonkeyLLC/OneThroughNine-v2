import { useState } from 'react'
import { getDifficulty } from '../GameBoard/getChoice.jsx'
import { debug, handleSubmit } from './Debug.jsx'

const Difficulty = ({difficulties, onStartGame, setDifficultySelected, goal, setGoal, setTiles}) => {
    const [ isDebug, setIsDebug ] = useState(false)
    const [ min, setMin ] = useState(1)
    const [ max, setMax ] = useState(200)
    const [ target, setTarget ] = useState(0)
    const [ level, setLevel ] = useState(['Level 1', 'lvl_1'])

    const handleSubmit = (e) => {
        e.preventDefault()
        
        document.querySelector('.overlay').style.display = 'none'
        onStartGame(true)
        //const formData = new FormData(form)  
        console.log(goal, '-target', min, 'min', max, 'max', goal, 'goal')
    }

    const toggleDebug = () => {
        document.getElementById(level[1]).classList.add('selected')
        setIsDebug(!isDebug)
    }
    
    const randomTarget = (e) => {
        e.preventDefault()
        const newTarget = Math.floor(Math.random() * (max - min + 1) + min)
        setTarget(newTarget)
        setGoal(newTarget)
        console.log(newTarget, 'random target')
    }

    const startGame = ({index}) => {
        if (isDebug) {
            //setGoal(getDifficulty(difficulties.ids[index]))
            console.log(goal, 'in Difficulty')
        } else {
        getDifficulty(difficulties.ids[index]).then(data => {
            setGoal(data.target)
            setTiles(data.tiles)
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
                difficulties.ids.map((difficulty, index) =>  (
                        <button className="difficulty-button" onClick={() => {
                            if (isDebug) {
                                //setGoal(getDifficulty(difficulties.ids[index]))
                                //console.log(goal, 'in Difficulty')
                                getDifficulty(difficulty).then(data => {
                                    setMin(data.target > 3 && data.target < 201 ? 4 :
                                            data.target > 200 && data.target < 1001 ? 201 :1001 )
                                    setMax(data.target > 3 && data.target < 201 ? 200 :
                                            data.target > 200 && data.target < 1001 ? 1000 :5000 )
                                    setTarget(data.target)
                                    //console.log(target, 'set target')
                                    setGoal(data.target)
                                    setTiles(data.tiles)
                                    console.log(difficulty, 'in Difficulty')
                                    const buttons = document.querySelectorAll('.difficulty-button')
                                    buttons.forEach(button => button.classList.remove('selected'))
                                    const buttonSelected = document.getElementById(difficulty)
                                    buttonSelected.classList.toggle('selected')
                                    setLevel([difficulties.display[index], difficulty])
                                }                                
                            )} else {
                            // matches api difficulty ids to difficulty names
                                startGame({index})
                            }
                            }
                        } id={difficulty} key={index}>{difficulties.display[index]}</button>
                    )
                )
            }
            
        </div>
        {isDebug && <form onSubmit={handleSubmit} className='debug-box'>
            <input 
                type="number"
                min={min}
                max={max}
                name='target'
                placeholder={target || 'Set target'}
                className='goal-contianer'
                onChange={e => setGoal(e.target.value)}
                value={goal}/>
            <label className='debug-level' type="text" name="level">{level[0]}</label>
            <button
                type="button"
                onClick={randomTarget}>
                    Random
            </button>
            <button type='submit'>Start</button>
        </form>}
    </div>
)}

export default Difficulty