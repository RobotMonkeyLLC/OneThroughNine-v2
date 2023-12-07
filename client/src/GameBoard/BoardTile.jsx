import Operators from '../GameBoard/Operators.jsx';

const BoardTile = ({isSolved,setIsSolved}) => {
    return (
        <div className="board-tile-container">
            <div id="int 1" className="int default next-halo">int 1</div>
            <Operators isSolved={isSolved} setIsSolved={setIsSolved}/>
            <div id="operator" className="oper default hidden" >operator</div>
            <div id="int 2" className="int default">int 2</div>
        </div>
    )
}

export default BoardTile