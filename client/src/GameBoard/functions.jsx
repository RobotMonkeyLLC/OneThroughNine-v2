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

const isAllTilesUsed = (boardOperValue) => {
    const keyboard = document.querySelector('.keyboard-container')
    // Check if all keys are used
    console.log('Update isAllTilesUsed function ')
}

const checkSolution = (isSolved) => {
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
        //console.log('boardOperValue ',boardOperValue)        
        
        //console.log('goal ',goal)
        const goal = parseInt(document.querySelector('.goal-container').firstChild.textContent)
        
        if (boardOperValue === goal) {
            if(isAllTilesUsed(boardOperValue)) {
                console.log('Solved!')
                isSolved = true
                //updateWin()
            } else {
                showMessage('Goal reached!...but not all tiles used.')
                //clearBoard()
                //addKey(boardOperValue)
            }
        } else {
            //clearBoard()
            //addKey(boardOperValue)
            //console.log('Not solved!')
        }
    }
}

const operManager = (buttonElement, isSolved) => {
    const boardOper = document.getElementById('operator')
    saveState()
    if (boardOper.classList.contains('default')) {
        boardOper.classList.remove('default')
        boardOper.textContent = buttonElement.textContent
        checkSolution(isSolved)
    }
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
} 

const keyManager = (buttonElement,isSolved) => {
    const boardTiles =  {int1:document.getElementById('int 1'),int2:document.getElementById('int 2')}
    saveState()
    if  (boardTiles.int1.classList.contains('default')) {
        boardTiles.int1.classList.remove('default')
        boardTiles.int1.textContent = buttonElement.textContent
        removeKey(buttonElement, isSolved)
    } else if (boardTiles.int2.classList.contains('default')) {
        boardTiles.int2.classList.remove('default')
        boardTiles.int2.textContent = buttonElement.textContent
        removeKey(buttonElement, isSolved)
    }        
}

const restoreBoardState = (tilesState) => {
    const keyboard = document.querySelector('.keyboard-container')
    const boardDisplay = document.querySelector('.board-tile-container')
    // First, clear the current keyboard
    keyboard.innerHTML = '';
    boardDisplay.textContent = boardDisplay.textContent == ''? boardDisplay.textContent : '';
    // Now, loop through the saved state and restore each key
    const tiles = tilesState.tiles
    const board = tilesState.board
    for (let i = 0; i < tiles.keys.length; i++) {
        const buttonElement = document.createElement('button');
        buttonElement.textContent = tiles.keys[i];
        buttonElement.setAttribute('id', tiles.ids[i]);
        buttonElement.classList.add('key');
        buttonElement.addEventListener('click', () => handleClick(buttonElement));
        keyboard.append(buttonElement);
    }
    ['int 1', 'oper', 'int 2'].map((key) => {
        const buttonElement = document.createElement('div');
        buttonElement.textContent = board.values[key];
        buttonElement.setAttribute('id', board.ids[key]);
        board.classList[key].split(' ').forEach(x => buttonElement.classList.add(x))
        //buttonElement.classList.add(tilesState.board.classList[i]);
        boardDisplay.append(buttonElement);
    })
}

const undo = () => {   
    const undoStack = JSON.parse(localStorage.getItem('undoStack')) || []
    if (undoStack.length === 0) {
        console.log('Nothing to undo')
        return null
    }
    const lastState = undoStack.pop().currentState
    //gameBuilder(keyboard)
    restoreBoardState(lastState)
    localStorage.setItem('undoStack', JSON.stringify(undoStack))
    //console.log('Undone to ',lastState) 
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

export { handleClick, saveState, removeKey }