import { useState } from 'react'
import { getDifficulty } from '../GameBoard/getChoice.jsx'
import { debug, handleSubmit } from './Debug.jsx'
import { time_delays } from '../Constants/time_delays.js'

const Difficulty = ({difficulties, onStartGame, setDifficultySelected, goal, setGoal, setTiles}) => {
    const [ isDebug, setIsDebug ] = useState(false)
    const [ min, setMin ] = useState(1)
    const [ max, setMax ] = useState(200)
    const [ target, setTarget ] = useState(0)
    const [ level, setLevel ] = useState(['Level 1', 'lvl_1'])

    const handleSubmit = (e) => {
        e.preventDefault()
        setDifficultySelected(level[1])
        
        document.querySelector('.overlay').style.display = 'none'
        onStartGame(true)
        //const formData = new FormData(form)  
        //console.log(goal, '-target', min, 'min', max, 'max', goal, 'goal')
    }

    const toggleDebug = () => {
        document.getElementById(level[1]).classList.toggle('selected')
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
   
        getDifficulty(difficulties.ids[index]).then(data => {
            setGoal(data.target)
            setTiles(data.tiles)
            
            document.querySelector('.overlay').style.display = 'none'
            onStartGame(true)
            //console.log(goal, 'in Difficulty')
        })
    }

    const handleClick = (e, difficulty, index) => {
        setDifficultySelected(difficulty)
        console.log('difficulty selected', difficulty, 'in Difficulty')
        if (isDebug) {
            //setDifficultySelected(level[1])
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
            console.log(difficulty, 'in Difficulty - ', index)
        }
    }

    var counter = null
    const onMouseDown = (e, difficulty, index) => {        
        e.target.classList.add('difficulty-selected')
        counter = setInterval(() => {
            setTimeout(() => {
                handleClick(e, difficulty, index)
                onMouseUp()
                e.target.classList.remove('difficulty-selected')
            }, time_delays.start_game_delay)
            
        }, time_delays.start_game)
    }
    const onMouseUp = () => {
        clearInterval(counter)
        counter = null
    }

    return (
        <div className="difficulty-container">
            <div className='text-header'>
                {/* <p>Difficulty</p> */}
                <button className='debug-button' onClick={toggleDebug}>Debug</button>
            </div>
            <div className="difficulty-buttons">
                {
                    difficulties.ids.map((difficulty, index) =>  (
                            <button className="difficulty-button" 
                            /* onMouseDown={(event) => {
                                onMouseDown(event, difficulty, index)
                            }}
                            onMouseUp={(event) => {
                                onMouseUp()                                
                            }
                            } */ 
                            onClick={(e) => {
                                e.target.classList.add('difficulty-selected')
                                setTimeout(() => {
                                    e.target.classList.remove('difficulty-selected')
                                    handleClick(e, difficulty, index)
                                }, time_delays.start_game_delay)
                            }                         
                            }
                            id={difficulty} key={index}>{difficulties.display[index]}</button>
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