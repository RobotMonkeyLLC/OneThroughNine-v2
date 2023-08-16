const goalDisplay = document.querySelector('.goal-container')
const timerDisplay = document.querySelector('.timer-container')
const tileDisplay = document.querySelector('.tile-container')
const keyboard = document.querySelector('.key-container')
const title = document.querySelector('.main-title-container')

let isSolved = false
let isGame = false

if (isGame == false) {
        
    // Create Title display
    const titleElement = document.createElement('h1')
    titleElement.textContent = 'OneThroughNine'


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

    // Difficulty selector
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
                keyMaker()
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

// Create tiles
const keyMaker = () => {
    keyboard.textContent = ''    
    for (let keyO in keysO) {
        const buttonElement = document.createElement('button')
        buttonElement.textContent = keysO[keyO]
        //console.log('lvl ', lvl, 'level ', level)
        buttonElement.setAttribute('id', keyO)
        //let lvlButton = document.getElementById(lvl)
        buttonElement.addEventListener('click', () => handleClick(buttonElement))
        keyboard.append(buttonElement)
        console.log('key ', keyO)
    }
    console.log('keyboard made')
}
    


