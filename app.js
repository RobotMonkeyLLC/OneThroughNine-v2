const goalDisplay = document.querySelector('.goal-container')
const timerDisplay = document.querySelector('.timer-container')
const boardDisplay = document.querySelector('.board-tile-container')
const keyboard = document.querySelector('.keyboard-container')
const titleDisplay = document.querySelector('.main-title-container')
const statsDisplay = document.querySelector('.stats-container')
const operDisplay = document.querySelector('.operboard-container')
const controlsboard = document.querySelector('.controls-container')
const messageDisplay = document.querySelector('.message-container')

let isSolved = false
let isGame = false
let board = [0,0,0]
let value = 0

if (isGame == false) {
        
    // Create Title display
    const titleElement = document.createElement('h1')
    titleElement.textContent = 'OneThruNine'
    titleDisplay.append(titleElement)

    // Get local stats
    const getStats = (statElement) => {
        fetch('http://localhost:8000/stats')
        .then(response => response.json())
        .then(data => {
            const statItem = document.createElement('li')
            statItem.textContent = `${statElement.id} Best: ${data.bestTime}`
            statItem.classList.add('stat')
            statElement.append(statItem)
        })
        .catch(err => console.error(err))
    }

    // Create stats board
    const stats = ['Local Stats', 'Posted Scores'] // hard coded for now
    stats.forEach(stat => {
        const statElement = document.createElement('ul')
        statElement.textContent = stat
        statElement.classList.add('stat')
        statElement.setAttribute('id', stat.split(' ')[0]) // splits string; should be changed later
        statsDisplay.append(statElement)
        getStats(statElement)
    })

    // Create difficulty selector
    const difficultyDisplay = document.querySelector('.difficulty-container')
    const difficulties = ['easy', 'advanced', 'expert']
    
    difficulties.forEach(dif => {
        const buttonElement = document.createElement('button')
        buttonElement.textContent = dif
        buttonElement.setAttribute('id', dif)
        buttonElement.classList.add('difficulty')
        buttonElement.addEventListener('click', () => selectedDifficulty(buttonElement))
        difficultyDisplay.append(buttonElement)
    })

    // Difficulty selector and generate game
    const selectedDifficulty = (buttonElement) => {
        difficulty = buttonElement.id
        buttonElement.classList.add('button-grow')
        setTimeout(() => {
            fetch(`http://localhost:8000/tiles?difficulty=${difficulty}`)
            .then(response => response.json())
            .then(data => {
                choice = data.tiles
                //console.log(choice)
                isGame = true
                //console.log(isGame)
                document.getElementById('overlay').style.display = 'none'
                var timerTime = setInterval(upTimer, 1000)
                goal = data.target
                let goalElement = document.createElement('p')
                goalElement.textContent = goal
                goalElement.id = 'goal'
                goalDisplay.append(goalElement)
                choice.forEach((keyO) => {keysO[keyO] = keyO})
                gameObjects = [messageDisplay, keyboard, boardDisplay, operDisplay, controlsboard]
                gameObjects.forEach((displayElement) => gameBuilder(displayElement))
            })
            .catch(err => console.error(err))
        }, 200)
    }

}
// Create timer
var timer = document.createElement('p')
timer.textContent = '00:00'
timer.id = 'timer'
timerDisplay.append(timer)
var seconds = 0
//var timerTime = setInterval(upTimer, 1000)

// convert seconds to HH:MM:SS
function secondsToHms(seconds) {
    var hours = Math.floor(seconds / 3600)
    var minutes = Math.floor((seconds - (hours * 3600)) / 60)
    minutes = minutes < 10 ? '0' + minutes : minutes
    var seconds = seconds - (hours * 3600) - (minutes * 60)
    seconds = seconds < 10 ? '0' + seconds : seconds

    return ( hours < 1 ? '' : (hours + ':')) + ( minutes < 1 ? '00' : (minutes)) + ':'+ seconds
}

// Update timer
function upTimer() {
    if (isSolved) {
        clearInterval(timerTime)
        return
    }
    seconds++
    document.getElementById('timer').innerHTML = secondsToHms(seconds)
}

let keysO= {}
let key = 0

// game builder
const gameBuilder = (displayElement) => {
    displayElement.textContent = ''
    switch (displayElement) {
        case messageDisplay:
            boardBlock = ['']
            elemType = 'p'
            boardClass = 'message'
            break
        case keyboard:
            boardBlock = keysO
            elemType = 'button'
            boardClass = 'key'
            break
        case boardDisplay:
            boardBlock = ['int 1', 'operator', 'int 2']
            elemType = 'div'
            boardClass = ['int', 'oper', 'int']
            break
        case operDisplay:
            boardBlock = ['+', '-', 'x', '/']
            elemType = 'button'
            boardClass = 'oper'
            break
        case controlsboard:
            boardBlock = ['Return', 'Restart', 'Undo']
            elemType = 'button'
            boardClass = 'control'
    }
    for (let i in boardBlock) {
        const buttonElement = document.createElement(elemType)
        buttonElement.textContent = boardBlock[i]
        buttonElement.setAttribute('id', boardBlock[i])
        buttonElement.classList.add((displayElement==boardDisplay)? boardClass[i] : boardClass)
        if(displayElement == boardDisplay){
            buttonElement.classList.add('default')
            buttonElement.classList.add(boardClass[i])
        } else {
            buttonElement.classList.add(boardClass)
        }
        buttonElement.addEventListener('click', () => handleClick(buttonElement))
        displayElement.append(buttonElement)
    }
}

const reload = () => {
    location.reload()
}
const restartGame = () => {
    seconds = 0
    timer.textContent = '00:00'
    gameObjects = [messageDisplay, keyboard, boardDisplay, operDisplay, controlsboard]
    gameObjects.forEach((displayElement) => gameBuilder(displayElement))
}

const undo = () => {   
    const undoStack = JSON.parse(localStorage.getItem('undoStack')) || []
    if (undoStack.length == 0) {
        console.log('Nothing to undo')
        return null
    }
    const lastState = undoStack.pop()
    gameBuilder(keyboard)
    localStorage.setItem('undoStack', JSON.stringify(undoStack))
    console.log('Undone to ',lastState) 
}
const saveState = () => {
    const keys = {
        keys:[],
        ids:[]
    }
    keyboard.childNodes.forEach(x => keys.keys.push(x.textContent), keys.ids.push(x.id))
    const currentState = {
        timestamp: Date.now().toString(),
        tiles: keys
    }
    const undoStack = JSON.parse(localStorage.getItem('undoStack')) || []
    undoStack.push({currentState})
    localStorage.setItem('undoStack', JSON.stringify(undoStack))
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

const getMaxId = () => {

}

const addKey = (value) => {
    const buttonElement = document.createElement('button')
    buttonElement.textContent = value
    buttonElement.setAttribute('id', getMaxId()+1)
    buttonElement.classList.add('key')
    buttonElement.addEventListener('click', () => handleClick(buttonElement))
    keyboard.append(buttonElement)
}

const checkSolution = () => {
    if (isBoardFilled()) {
        const boardTiles =  {int1:document.getElementById('int 1'),int2:document.getElementById('int 2')}
        const boardOper = document.getElementById('operator')
        const boardKeys = {int1:boardTiles.int1.textContent,int2:boardTiles.int2.textContent}
        const boardOperKey = boardOper.textContent
        const boardOperValue = boardOperKey == '+' ? parseInt(boardKeys.int1) + parseInt(boardKeys.int2) :
                               boardOperKey == '-' ? parseInt(boardKeys.int1) - parseInt(boardKeys.int2) :
                               boardOperKey == 'x' ? parseInt(boardKeys.int1) * parseInt(boardKeys.int2) :
                               boardOperKey == '/' ? parseInt(boardKeys.int1) / parseInt(boardKeys.int2) : 0
        console.log('boardOperValue ',boardOperValue)
        console.log('goal ',goal)
        if (boardOperValue == goal) {
            isSolved = true
            updateWin()
            console.log('Solved!')
        } else {
            addKey(boardOperValue)
            saveState()
            console.log('Not solved!')
        }
    }
}

const removeKey = (buttonElement) => {
    const elem = buttonElement
    buttonElement.classList.add('inactive')
    setTimeout(() => elem.parentNode.removeChild(elem), 200)
    checkSolution()
}
const keyManager = (buttonElement) => {
    const boardTiles =  {int1:document.getElementById('int 1'),int2:document.getElementById('int 2')}
        
    if  (boardTiles.int1.classList.contains('default')) {
        boardTiles.int1.classList.remove('default')
        boardTiles.int1.textContent = buttonElement.textContent
        removeKey(buttonElement)
    } else if (boardTiles.int2.classList.contains('default')) {
        boardTiles.int2.classList.remove('default')
        boardTiles.int2.textContent = buttonElement.textContent
        removeKey(buttonElement)
    }
    //removeKey(buttonElement)          
}

const operManager = (buttonElement) => {
    const boardOper = document.getElementById('operator')
    if (boardOper.classList.contains('default')) {
        boardOper.classList.remove('default')
        boardOper.textContent = buttonElement.textContent
        checkSolution()
    }
}

const handleClick = (buttonElement) => {
    console.log('pressed a',buttonElement.id, 'button')
    if (buttonElement.classList.contains('inactive')) {
        return
    }   else if (buttonElement.classList.contains('key')) {
        keyManager(buttonElement)
    } else if (buttonElement.classList.contains('oper')) {
        operManager(buttonElement)
    } else if (buttonElement.classList.contains('control')) {
        switch (buttonElement.id) {
            case 'Return':
                reload()
                break
            case 'Restart':
                restartGame()
                break
            case 'Undo':
                undo()              
        }
    }
}
