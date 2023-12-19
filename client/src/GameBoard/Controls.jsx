import { undo } from './functions.jsx'

const Controls = () => {
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
            <button id="Return" className="control" onClick={() => window.location.reload()}>Return</button>
            <button id="Undo" className="control" onClick={() => undo()}>Undo</button>
            <button id="Restart" className="control" onClick={() => {handleRestart()}}>Restart</button>
        </div>
    )
    
}

export default Controls