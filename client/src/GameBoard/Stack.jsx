import { handleClick } from './functions.jsx'

const KeyboardButton = ({value, isSolved}) => {
    return(
        <button className="key" onClick={() => handleClick(value, isSolved)}>{value}</button>
    )

}

const Keyboard = ({keys, isSolved}) => {
    console.log('in keyboard ',keys);
    return(
        <div className="keyboard-container">{
            keys.map((key, index) => (
                <KeyboardButton key={index} value={key} isSolved={isSolved}/>
            ))            
        }</div>
    )
}

export default Keyboard;