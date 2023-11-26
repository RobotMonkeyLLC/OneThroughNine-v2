import { checkSolution, operManager, saveState } from "./functions"

const operatorHandler = (e, isSolved) => {
    e.preventDefault()
    checkSolution(isSolved)
    //saveState()
    operManager(e.target, isSolved)
}

const Operators = ({isSolved}) => {
    return (
        <div className="operboard-container">
            {
                ['+', '-', 'x', '÷'].map((oper, index) => {
                    return (
                        <button id={oper} className="operator" onClick={(e) => operatorHandler(e, isSolved)} key={index}>{oper}</button>
                    )
                })
            }
        </div>
    )
    
}

export default Operators