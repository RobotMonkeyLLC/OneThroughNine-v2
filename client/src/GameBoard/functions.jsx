import { defaults } from './defaults'

const isAllTilesUsed = (boardOperValue) => {
    const keyboard = document.querySelector('.keyboard-container')
    const goal = document.querySelector('.goal-container').textContent

    let isEmpty = (keyboard.childNodes.length === 0)
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

const restartGame = () => {
    /* seconds = 0
    timer.textContent = '00:00'
    gameObjects = [messageDisplay, keyboard, boardDisplay, operDisplay, controlsboard]
    gameObjects.forEach((displayElement) => gameBuilder(displayElement)) */
    localStorage.setItem('undoStack', JSON.stringify([]))
}

const showMessage = (message) => {
    const messageDisplay = document.querySelector('.message-container')
    messageDisplay.firstChild.textContent = message
    setTimeout(() => messageDisplay.firstChild.textContent = '', 2000)
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

const addKey = (value) => {
    const buttonElement = document.createElement('button')
    const keyboard = document.querySelector('.keyboard-container')
    const keyboardIDs = []
    keyboard.childNodes.forEach(x => keyboardIDs.push(parseInt(x.id.split('-')[1])))
    const maxID = Math.max(...keyboardIDs)

    buttonElement.textContent = value
    //console.log('adding key', value, 'to keyboard id:', keyboardIDs, 'maxID:', maxID)
    buttonElement.setAttribute('id', `tile-${maxID+1}`)
    buttonElement.classList.add('key')
    buttonElement.addEventListener('click', () => handleClick(buttonElement))
    keyboard.append(buttonElement)
}

const clearBoard = () => {
    const boardTiles =  {int1:document.getElementById('int 1'),int2:document.getElementById('int 2')}
    const boardOper = document.getElementById('operator')
    boardTiles.int1.classList.add('default')
    boardTiles.int2.classList.add('default')
    boardOper.classList.add('default')
    boardTiles.int1.textContent = defaults.board.int1
    boardTiles.int2.textContent = defaults.board.int2
    boardOper.textContent = defaults.board.oper
}

const checkSolution = (isSolved) => {
    const goal = document.querySelector('.goal-container').textContent
    //saveState()
    if (isBoardFilled()) {
        const boardTiles =  {int1:document.getElementById('int 1'),int2:document.getElementById('int 2')}
        const boardOper = document.getElementById('operator')
        const boardKeys = {int1:boardTiles.int1.textContent,int2:boardTiles.int2.textContent}
        const boardOperKey = boardOper.textContent
        const boardOperValue = boardOperKey === '+' ? parseInt(boardKeys.int1) + parseInt(boardKeys.int2) :
                               boardOperKey === '-' ? parseInt(boardKeys.int1) - parseInt(boardKeys.int2) :
                               boardOperKey === 'x' ? parseInt(boardKeys.int1) * parseInt(boardKeys.int2) :
                               boardOperKey === '/' ? parseInt(boardKeys.int1) / parseInt(boardKeys.int2) : 0
        if (!Number.isInteger(boardOperValue)) {
            showMessage("No Floats Allowed!")
            //undo()
            return
        }
        if (boardOperValue === goal) {
            if(isAllTilesUsed(boardOperValue)) {
                console.log('Solved!')
                isSolved = true
                //updateWin()
                console.log('Goal reached! isSolved:', isSolved)
            } else {
                showMessage('Goal reached!...but not all tiles used.')
                clearBoard()
                addKey(boardOperValue)
            }
        } else {
            clearBoard()
            addKey(boardOperValue)
            //console.log('Not solved!')
        }
    }
}

const operManager = (buttonElement, isSolved) => {
    saveState()

    const boardOper = document.getElementById('operator')
    
    if (boardOper.classList.contains('default')) {
        boardOper.classList.remove('default')
    }
    boardOper.textContent = buttonElement.textContent
    checkSolution(isSolved)
}

const removeKey = (buttonElement, isSolved) => {
    const elem = buttonElement
    buttonElement.classList.add('inactive')
    checkSolution(isSolved)
    setTimeout(() => elem.parentNode.removeChild(elem), 200)
}

const saveState = () => {
    const keys = {keys:[], ids:[]}
    const board = {ids:[],values:[], classList:[]}
    const keyboard = document.querySelector('.keyboard-container')
    const boardDisplay = document.querySelector('.board-tile-container')

    keyboard.childNodes.forEach(x => {
        // Fill keys with keyboard values
        keys.keys.push(x.textContent)
        keys.ids.push(x.id)
    })
    boardDisplay.childNodes.forEach(x => {
        // Fill board with board values
        board.ids.push(x.id)
        board.values.push(x.textContent)
        board.classList.push(x.classList.value)
    })
    const currentState = {
        //timestamp: new Date().getDate(),
        tiles: keys,
        board: board
    }
    const undoStack = JSON.parse(localStorage.getItem('undoStack')) || []
    undoStack.push({currentState})
    localStorage.setItem('undoStack', JSON.stringify(undoStack))

    // Track number of states saved for restart purposes
    //localStorage.setItem('stackCount', (localStorage.stackCount ? localStorage.stackCount : 0) + 1)
    //console.log('Saved state', currentState)
} 

const keyManager = (buttonElement,isSolved) => {
    const boardTiles =  {
        int1:document.getElementById('int 1'),
        int2:document.getElementById('int 2'),
        oper:document.getElementById('operator')
    }
    saveState()
    if  (boardTiles.int1.classList.contains('default')) {
        boardTiles.int1.classList.remove('default')
        boardTiles.int1.textContent = buttonElement.textContent
        removeKey(buttonElement, isSolved)
    } else if (boardTiles.int2.classList.contains('default')) {
        boardTiles.int2.classList.remove('default')
        boardTiles.int2.textContent = buttonElement.textContent
        removeKey(buttonElement, isSolved)
    } else {
        showMessage('Board is full! Either Undo or finish the expression.')
    }
}

const restoreBoardState = (tilesState) => {
    const keyboard = document.querySelector('.keyboard-container')
    const boardDisplay = document.querySelector('.board-tile-container')
    // First, clear the current keyboard
    keyboard.innerHTML = '';
    boardDisplay.textContent = boardDisplay.textContent === ''? boardDisplay.textContent : '';
    // Now, loop through the saved state and restore each key
    const tiles = tilesState.tiles
    const board = tilesState.board
    console.log(tiles, 'restore tiles', board, 'restore board')
    /* for (let i = 0; i < tiles.keys.length; i++) { */
    tiles.keys.map((key, i) => {
        
        const buttonElement = document.createElement('button');
        buttonElement.textContent = key;
        buttonElement.setAttribute('id', tiles.ids[i]);
        buttonElement.classList.add('key');
        buttonElement.addEventListener('click', () => handleClick(buttonElement));
        keyboard.append(buttonElement);
    })
    board.values.map((values, ids) => {
        console.log('testing key:',values, 'id:',ids, 'classList:', board.classList[ids])
        const divElement = document.createElement('div');
        divElement.textContent = values;
        divElement.setAttribute('id', board.ids[ids]);
        board.classList[ids].split(' ').forEach(x => divElement.classList.add(x))
        //values.split(' ').forEach(x => divElement.classList.add(x))
        boardDisplay.append(divElement);
    })
}

const undo = () => {   
    const undoStack = JSON.parse(localStorage.getItem('undoStack')) || []
    if (undoStack.length === 0) {
        showMessage('Nothing to undo')
        console.log('Nothing to undo')
        return null
    }
    const lastState = undoStack.pop().currentState
    restoreBoardState(lastState)
    localStorage.setItem('undoStack', JSON.stringify(undoStack))
    console.log('Undone to ',lastState) 
}

const handleClick = (buttonElement, isSolved) => {
    console.log('pressed a',buttonElement.id, 'button')
    if (buttonElement.classList.contains('inactive')) {
        return
    }   else if (buttonElement.classList.contains('key')) {
        keyManager(buttonElement, isSolved)
    } else if (buttonElement.classList.contains('oper')) {
        operManager(buttonElement, isSolved)
    } else if (buttonElement.classList.contains('control')) {
        switch (buttonElement.id) {
            case 'Return':
                window.location.reload()
                break
            case 'Restart':
                //restartGame()
                break
            case 'Undo':
                undo()
                break
            case 'Post Score':
                //postScore()
                break
            default:
                return 'foo'
        }
    }
}

export { handleClick, saveState, removeKey , undo, checkSolution, keyManager, operManager}