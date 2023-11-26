import { undo } from './functions.jsx'

const Controls = () => {
    return (
        <div className="controls-container">
            <button id="Return" className="control" onClick={() => window.location.reload()}>Return</button>
            <button id="Restart" className="control">Restart</button>
            <button id="Undo" className="control" onClick={() => undo()}>Undo</button>
        </div>
    )
    
}

export default Controls