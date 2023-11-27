import { checkSolution, keyManager, saveState } from './functions.jsx'

const handleTiles = (tile, value, isSolved)  => {    
    //const tile = document.getElementById(`tile-${index}`)
    keyManager(tile, isSolved)
    //saveState()
    //checkSolution(isSolved)
    //tile.classList.add('inactive')
    //console.log('in handleTiles', value, isSolved, index)
}

const StackButton = ({index, value, isSolved}) => {
    return (
        <button id={`tile-${index}`} className="key" onClick={(tile) => handleTiles(tile.target, value, isSolved)}>{value}</button>
    )
}

const Stack = ({keys, isSolved}) => {
    //console.log(keys, 'keys in Stack')
    const stackTiles = keys.map((key, index) => {
        return (
            <StackButton key={key.id} value={key.value} isSolved={isSolved}/>
        )
    })
    return(
        <div className="keyboard-container">{stackTiles}</div>
    )
}

export default Stack;