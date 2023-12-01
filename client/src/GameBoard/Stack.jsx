import { checkSolution, keyManager, saveState } from './functions.jsx'

function handleTiles ( e,index, isSolved, setIsSolved ) {    
    console.log(e,'e in handleTiles')
    const tile = e
    if (tile.classList.contains('inactive')) {
        return
    }
    //console.log('in handleTiles', index, isSolved)
    keyManager(tile, isSolved, setIsSolved)
    //saveState()
    //checkSolution(isSolved)
    //tile.classList.add('inactive')
    //console.log('in handleTiles', value, isSolved, index)
}

function StackButton ({value, isSolved, setIsSolved}) {
    
    return (
        <button id={`tile-${value}`} className="key" onClick={(e) => {handleTiles(e.target,value, isSolved,setIsSolved)}}>{value}</button>
    )
}

function Stack ({keys, isSolved, setIsSolved}) {
    //console.log(keys, 'keys in Stack')
    const stackTiles = keys.map((key, index) => {
        //console.log(key, 'key in Stack', index, 'index in Stack')
        return (
            <StackButton key={index} value={key} isSolved={isSolved} setIsSolved={setIsSolved}/>
        )
    })
    return(
        <div className="keyboard-container">{stackTiles}</div>
    )
}

export default Stack;