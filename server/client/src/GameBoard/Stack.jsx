import { checkSolution, keyManager, saveState } from './functions.jsx'

export const keyHandler = ( e, isSolved, setIsSolved ) => {    
    console.log(e,'e in handleTiles')
    e.preventDefault()
    //console.log('in handleTiles', index, isSolved)
    keyManager(e.target, isSolved, setIsSolved)
    //saveState()
    //checkSolution(isSolved)
    //tile.classList.add('inactive')
    //console.log('in handleTiles', value, isSolved, index)
}

function StackButton ({value, isSolved, setIsSolved}) {
    
    return (
        <button id={`tile-${value}`} 
                className="key" 
                onClick={(e) => {
                    keyHandler( e, isSolved, setIsSolved)
                }}>{value}</button>
    )
}

function Stack ({keys, isSolved, setIsSolved}) {
    //console.log(keys, 'keys in Stack')
    const stackTiles = keys.map((key, index) => {
        //console.log(key, 'key in Stack', index, 'index in Stack')
        return (
            <StackButton key={index} 
                        value={key} 
                        isSolved={isSolved} 
                        setIsSolved={setIsSolved}/>
        )
    })
    return(
        <div className="keyboard-container" 
            style={{width:`${(keys.length*68)-(((keys.length-3)*68))}px`}}>
                {stackTiles}
        </div>
    )
}

export default Stack;