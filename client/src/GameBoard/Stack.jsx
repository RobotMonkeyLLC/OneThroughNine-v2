import { checkSolution, keyManager, saveState } from './functions.jsx'

const handleTiles = (tile, value, isSolved)  => {    
    //const tile = document.getElementById(`tile-${index}`)
    if (tile.classList.contains('inactive')) {
        return
    }
    keyManager(tile, isSolved)
    //saveState()
    //checkSolution(isSolved)
    //tile.classList.add('inactive')
    //console.log('in handleTiles', value, isSolved, index)
}

const StackButton = ({value, isSolved}) => {
    return (
        <button id={`tile-${value}`} className="key" onClick={(tile) => handleTiles(tile.target, value, isSolved)}>{value}</button>
    )
}

const Stack = ({keys, isSolved}) => {
    console.log(keys, 'keys in Stack')
    const stackTiles = keys.map((key, index) => {
        return (
            <StackButton key={key} value={key} isSolved={isSolved}/>
        )
    })
    return(
        <div className="keyboard-container">{stackTiles}</div>
    )
}

export default Stack;