import Operators from '../GameBoard/Operators.jsx';

const BoardTile = ({isSolved,setIsSolved}) => {
    return (
        <div className="board-tile-container">
            <div id="int 1" className="int default next-halo"></div>
            <Operators isSolved={isSolved} setIsSolved={setIsSolved}/>
            <div id="operator" className="oper default hidden" ></div>
            <div id="int 2" className="int default"></div>
        </div>
    )
}

export default BoardTile