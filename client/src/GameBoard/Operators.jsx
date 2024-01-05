import { checkSolution, operManager, saveState } from "./functions"

const operatorHandler = (e, isSolved, setIsSolved) => {
    e.preventDefault()
    checkSolution(isSolved, setIsSolved)
    //saveState()
    operManager(e.target.parentElement, isSolved, setIsSolved)
}

function Operators ({isSolved, setIsSolved}) {
    return (
        <div className="operboard-container">
            <div id="operboard-shape">
                {
                    ['+', '-', 'x', '÷'].map((oper, index) => {
                        return (
                            <button id={oper} className="operator" onClick={(e) => operatorHandler(e, isSolved,setIsSolved)} key={index}>
                                <p>{oper}</p>                            
                            </button>
                        )
                    })
                }
            </div>
        </div>
    )
    
}

export default Operators