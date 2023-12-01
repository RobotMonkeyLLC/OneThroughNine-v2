import { checkSolution, operManager, saveState } from "./functions"

const operatorHandler = (e, isSolved, setIsSolved) => {
    e.preventDefault()
    checkSolution(isSolved)
    //saveState()
    operManager(e.target, isSolved, setIsSolved)
}

function Operators ({isSolved, setIsSolved}) {
    return (
        <div className="operboard-container">
            {
                ['+', '-', 'x', '÷'].map((oper, index) => {
                    return (
                        <button id={oper} className="operator" onClick={(e) => operatorHandler(e, isSolved,setIsSolved)} key={index}>{oper}</button>
                    )
                })
            }
        </div>
    )
    
}

export default Operators