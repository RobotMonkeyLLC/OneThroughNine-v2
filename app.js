const goalDisplay = document.querySelector('.goal-container')
const timerDisplay = document.querySelector('.timer-container')
const boardDisplay = document.querySelector('.board-tile-container')
const keyboard = document.querySelector('.keyboard-container')
const titleDisplay = document.querySelector('.main-title-container')
const statsDisplay = document.querySelector('.stats-container')
const operDisplay = document.querySelector('.operboard-container')
const controlsboard = document.querySelector('.controls-container')

let isSolved = false
let isGame = false
let board = [0,0,0]

if (isGame == false) {
        
    // Create Title display
    const titleElement = document.createElement('h1')
    titleElement.textContent = 'OneThruNine'
    titleDisplay.append(titleElement)

    // Get local stats
    const getStats = (statElement) => {
        fetch('https://localhost:8000/stats')
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
            fetch(`https://localhost:8000/tiles?difficulty=${difficulty}`)
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
                gameObjects = [keyboard, boardDisplay, operDisplay, controlsboard]
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
        case keyboard:
            boardBlock = keysO
            elemType = 'button'
            boardClass = 'key'
            break
        case boardDisplay:
            boardBlock = ['int1', 'oper', 'int2']
            elemType = 'div'
            boardClass = 'board-tile'
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
        buttonElement.classList.add(boardClass)
        buttonElement.addEventListener('click', () => handleClick(buttonElement))
        displayElement.append(buttonElement)
    }
}


