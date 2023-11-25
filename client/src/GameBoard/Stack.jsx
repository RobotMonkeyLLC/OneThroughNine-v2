import { saveState } from './functions.jsx'

const handleTiles = ()  => {
    console.log('in handleTiles')
    saveState()
}

const StackButton = ({index, value, isSolved}) => (
        <button id={index} className="key" onClick={() => handleTiles(value, isSolved)}>{value}</button>
    )


const Stack = ({keys, isSolved}) => {
    
    return(
        <div className="keyboard-container">{
            keys.map((key, index) => (
                <StackButton key={index} value={key} isSolved={isSolved} />
            ))
        }</div>
    )
}

export default Stack;