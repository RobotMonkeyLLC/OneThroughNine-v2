import { operManager, saveState } from "./functions"

const operatorHandler = (e) => {
    e.preventDefault()
    //saveState()
    operManager(e.target)
}

const Operators = () => {
    return (
        <div className="operboard-container">
            {
                ['+', '-', 'x', '÷'].map((oper, index) => {
                    return (
                        <button id={oper} className="operator" onClick={(e) => operatorHandler(e)} key={index}>{oper}</button>
                    )
                })
            }
        </div>
    )
    
}

export default Operators