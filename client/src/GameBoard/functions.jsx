import { defaults } from '../Constants/defaults'
import { updateWin } from '../GameOver/endGame'

// convert seconds to HH:MM:SS
function secondsToHms(seconds) {
    //const seconds = document.getElementById('timer').textContent
    let hours = Math.floor(seconds / 3600)
    let minutes = Math.floor(seconds % 3600 / 60)
    let secondsScore = Math.floor(seconds % 3600 % 60)

    return ( hours < 1 ? '' : (hours + ':')) + ( minutes < 1 ? '00' : (minutes)) + ':'+ (secondsScore < 10 ? '0' : '') + secondsScore
}

function formatDate(date) {
    const d = new Date(date);
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
}

const isAllTilesUsed = (boardOperValue) => {
    const keyboard = document.querySelector('.keyboard-container')
    const goal = document.querySelector('.goal-container').textContent

    let isEmpty = (keyboard.childNodes.length === 0) || (keyboard.childNodes.length === 1 && keyboard.childNodes[0].classList.contains('inactive'))
    //let isGoal = (goal == boardOperValue)

    if (isEmpty) {
        
        if(isEmpty){ 
            return true
        } else {
            return ((keyboard.childNodes.length === 1))
        }
    } else if(keyboard.childNodes.length === 1) {
        return (goal === boardOperValue)
    }
}

const showMessage = (message) => {
    const messageDisplay = document.getElementsByClassName('message-container')[0]
    const messageText = document.getElementById('message')
    messageDisplay.classList.remove('hidden')
    messageText.textContent = message
    setTimeout(() => messageDisplay.classList.add('hidden'), 2000)
}

const isBoardFilled = () => {
    let boardTiles =  {int1:document.getElementById('int 1'),int2:document.getElementById('int 2')}
    let boardOper = document.getElementById('operator')
    if (boardTiles.int1.classList.contains('default') || boardTiles.int2.classList.contains('default') || boardOper.classList.contains('default')) {
        return false
    } else {
        return true
    }
}

const addKey = (value,isSolved, setIsSolved) => {
    const buttonElement = document.createElement('button')
    const keyboard = document.querySelector('.keyboard-container')
    const keyboardIDs = []
    keyboard.childNodes.forEach(x => keyboardIDs.push(parseInt(x.id.split('-')[1])))
    const maxID = Math.max(...keyboardIDs)

    buttonElement.textContent = value
    console.log('adding key', value, 'to keyboard id:', keyboardIDs, 'maxID:', maxID)
    buttonElement.setAttribute('id', `tile-${maxID+1}`)
    buttonElement.classList.add('key')
    buttonElement.addEventListener('click', (e) => keyManager(e.target,isSolved, setIsSolved))
    keyboard.append(buttonElement)
}

const clearBoard = () => {
    const boardTiles =  {int1:document.getElementById('int 1'),int2:document.getElementById('int 2')}
    const boardOper = document.getElementById('operator')
    boardTiles.int1.classList.add('default', 'next-halo')
    boardTiles.int2.classList.add('default')
    boardOper.classList.add('default')
    boardTiles.int1.textContent = defaults.board.int1
    boardTiles.int2.textContent = defaults.board.int2
    boardOper.textContent = defaults.board.oper
}


function checkSolution (isSolved, setIsSolved) {
    const goal = parseInt(document.querySelector('.goal-container').textContent)
    //saveState()
    console.log('checking solution', isSolved)
    if (isBoardFilled()) {
        const boardTiles =  {int1:document.getElementById('int 1'),int2:document.getElementById('int 2')}
        const boardOper = document.getElementById('operator')
        const boardKeys = {int1:boardTiles.int1.textContent,int2:boardTiles.int2.textContent}
        const boardOperKey = boardOper.textContent
        const boardOperValue = boardOperKey === '+' ? parseInt(boardKeys.int1) + parseInt(boardKeys.int2) :
                               boardOperKey === '-' ? parseInt(boardKeys.int1) - parseInt(boardKeys.int2) :
                               boardOperKey === 'x' ? parseInt(boardKeys.int1) * parseInt(boardKeys.int2) :
                               boardOperKey === '÷' ? parseInt(boardKeys.int1) / parseInt(boardKeys.int2) : 0
        console.log('boardOperkey:',boardOperKey,'boardOperValue:', boardOperValue, 'goal:', goal)
        if (!Number.isInteger(boardOperValue)) {
            showMessage("No Floats Allowed!")
            JSON.parse(localStorage.getItem('undoStack')).pop()
            //undo()
            return
        }
        console.log('boardOperValue:', boardOperValue, 'goal:', goal, 'isSolved:', boardOperValue === goal)
        if (boardOperValue === goal) {
            if(isAllTilesUsed(boardOperValue)) {
                console.log('Solved!')
                setIsSolved(true)
                updateWin()
                console.log('Goal reached! isSolved:', isSolved)
            } else {
                //setIsSolved(false)
                showMessage('Goal reached...but not all tiles used.')
                clearBoard()
                addKey(boardOperValue,isSolved, setIsSolved)
            }
        } else {
            //setIsSolved(false)
            clearBoard()
            addKey(boardOperValue,isSolved, setIsSolved)
            //console.log('Not solved!')
        }
        //setIsSolved(false)
    }
}

function operManager (buttonElement, isSolved,setIsSolved) {
    const boardOper = document.getElementById('operator')
    if(boardOper.textContent === buttonElement.textContent) {
        console.log('Same operator selected, not saving state or checking solution')
        return
    } else if (document.getElementById('operboard-shape').classList.contains('next-halo')) {
    
        saveState()
        //console.log('in operManager', buttonElement, isSolved)
        
        buttonElement.classList.add('selected')
        if (boardOper.classList.contains('default')) {
            boardOper.classList.remove('default')
        }
        document.getElementById('operboard-shape').classList.remove('next-halo')
        document.getElementById('int 2').classList.add('next-halo')
        boardOper.textContent = buttonElement.textContent
        checkSolution(isSolved, setIsSolved)
    } else {
        showMessage('Select a number first.')
    }
}

function removeKey (buttonElement, isSolved, setIsSolved) {
    const elem = buttonElement
    buttonElement.classList.add('inactive')
    checkSolution(isSolved, setIsSolved)
    setTimeout(() => elem.parentNode.removeChild(elem), 200)
}

const saveState = () => {
    const keys = {keys:[], ids:[]}
    const board = {ids:[],values:[], classList:[]}
    const keyboard = document.querySelector('.keyboard-container')
    const boardDisplay = document.querySelectorAll('.int')
    const operSelected = document.getElementById('operator')

    keyboard.childNodes.forEach(x => {
        // Fill keys with keyboard values
        keys.keys.push(x.textContent)
        keys.ids.push(x.id)
    })
    boardDisplay.forEach(x => {
        // Fill board with board values
        board.ids.push(x.id)
        board.values.push(x.textContent)
        board.classList.push(x.classList.value)
    })
    const currentState = {
        //timestamp: new Date().getDate(),
        tiles: keys,
        board: board,
        oper: operSelected.textContent
    }
    const undoStack = JSON.parse(localStorage.getItem('undoStack')) || []
    undoStack.push({currentState})
    localStorage.setItem('undoStack', JSON.stringify(undoStack))

    // Track number of states saved for restart purposes
    //localStorage.setItem('stackCount', (localStorage.stackCount ? localStorage.stackCount : 0) + 1)
    //console.log('Saved state', currentState)
} 

function keyManager (buttonElement,isSolved, setIsSolved)  {
    const boardTiles =  {
        int1:document.getElementById('int 1'),
        int2:document.getElementById('int 2'),
        oper:document.getElementsByClassName('operboard-container')[0]
    }
    checkSolution(isSolved, setIsSolved)
    
    
    if (buttonElement.classList.contains('inactive')) {
        return
    }   else if  (boardTiles.int1.classList.contains('default')) {
        saveState()
        boardTiles.int1.classList.remove('default','next-halo')
        boardTiles.int1.textContent = buttonElement.textContent
        document.getElementById('operboard-shape').classList.add('next-halo')
        console.log('in keyManager int 1 removing default', buttonElement, isSolved)
        removeKey(buttonElement, isSolved, setIsSolved)
    } else if (boardTiles.int2.classList.contains('next-halo')) {
        saveState()
        boardTiles.int2.classList.remove('default', 'next-halo')
        boardTiles.int2.textContent = buttonElement.textContent
        console.log('in keyManager int 2 removing default ', buttonElement, isSolved)
        removeKey(buttonElement, isSolved, setIsSolved)
    } else if (boardTiles.oper.classList.contains('next-halo')) {
        showMessage('Select an operator first.')
    } else {
        showMessage('Select a number first.')
    }
}

const restoreBoardState = (tilesState, buttonElement, isSolved, setIsSolved) => {
    const keyboard = document.querySelector('.keyboard-container')
    const intDisplay = document.querySelectorAll('.int')
    const boardDisplay = document.querySelector('.board-tile-container')
    // First, clear the current keyboard
    keyboard.innerHTML = '';
    intDisplay.forEach((x) => x.textContent = x.textContent === ''? x.textContent : '');
    // Now, loop through the saved state and restore each key
    const tiles = tilesState.tiles
    const board = tilesState.board
    //console.log(tiles, 'restore tiles', board, 'restore board')
    /* for (let i = 0; i < tiles.keys.length; i++) { */
    tiles.keys.map((key, i) => {
        
        const buttonElement = document.createElement('button');
        buttonElement.textContent = key;
        buttonElement.setAttribute('id', tiles.ids[i]);
        buttonElement.classList.add('key');
        buttonElement.addEventListener('click', () => keyManager(buttonElement, isSolved, setIsSolved));
        keyboard.append(buttonElement);
    })
    board.values.map((values, ids) => {
        console.log('testing key:',values, 'id:',ids, 'classList:', board.classList[ids])
        const divElement = document.createElement('div');
        divElement.textContent = values;
        divElement.setAttribute('id', board.ids[ids]);
        board.classList[ids].split(' ').forEach(x => divElement.classList.add(x))
        ids === 0 ? boardDisplay.prepend(divElement) : boardDisplay.append(divElement)
        //values.split(' ').forEach(x => divElement.classList.add(x))
    })
}

const undo = (buttonElement, isSolved, setIsSolved) => {   
    const undoStack = JSON.parse(localStorage.getItem('undoStack')) || []
    if (undoStack.length === 0) {
        showMessage('Nothing to undo')
        console.log('Nothing to undo')
        return null
    }
    const lastState = undoStack.pop().currentState
    restoreBoardState(lastState,buttonElement, isSolved, setIsSolved)
    localStorage.setItem('undoStack', JSON.stringify(undoStack))
    console.log('Undone to ',lastState) 
}

function handleClick (buttonElement, isSolved, setIsSolved) {
    console.log('pressed a',buttonElement.id, 'button')
    if (buttonElement.classList.contains('inactive')) {
        return
    }   else if (buttonElement.classList.contains('key')) {
        keyManager(buttonElement, isSolved, setIsSolved)
    } else if (buttonElement.classList.contains('oper')) {
        operManager(buttonElement, isSolved, setIsSolved)
    } else if (buttonElement.classList.contains('control')) {
        switch (buttonElement.id) {
            case 'Return':
                window.location.reload()
                break
            case 'Restart':
                //restartGame()
                break
            case 'Undo':
                undo(buttonElement, isSolved, setIsSolved)
                break
            case 'Post Score':
                //postScore()
                break
            default:
                return 'foo'
        }
    }
}

export { saveState, removeKey , undo, checkSolution, keyManager, operManager, showMessage, secondsToHms, formatDate}