import { undo } from './functions.jsx'

const Controls = ({isSolved, setIsSolved}) => {
    const handleRestart = () => {
    //handleGameReStart()
        // ** This is a temporary fix to the restart issue. Update to track actual stack count**
        while (localStorage.undoStack.length > 250) {
            console.log('removing state')
            undo()
        }
    }

    return (
        <div className="controls-container">
            <button id="Return" className="control thirds" onClick={() => window.location.reload()}>Return</button>
            <button id="Undo" className="control thirds" onClick={() => undo(isSolved, setIsSolved)}>Undo</button>
            <button id="Restart" className="control thirds" onClick={() => {handleRestart()}}>Restart</button>
        </div>
    )
    
}

export default Controls