const tileDisplay = document.querySelector('.tile-container')
const goalDisplay = document.querySelector('.goal-container')
const operboard = document.querySelector('.operboard-container')
const keyboard = document.querySelector('.key-container')
const controlsboard = document.querySelector('.controls-container')
const messageDisplay = document.querySelector('.message-container')

const goal = 12

const goalElement = document.createElement('p')
goalElement.textContent = goal
goalDisplay.append(goalElement)

var timer = document.createElement('p')
timer.textContent = '00:00'
timer.id = 'timer'
goalDisplay.append(timer)


let value = 0
const difficulty = 9
const level = Array.from({length: difficulty}, (_, i) => i + 1)
let keys = Array.from({length: difficulty}, (_, i) => i + 1)
let keysO={}
keys.forEach(x => keysO[x] = x)
//console.log('keys ',keys)

let prev = false
const operators = ['+','x','-', '/']
const controls = ['Return', 'Restart', 'Undo']

isSolved = false

var seconds = 0
var timer2 = setInterval(upTimer, 1000)

function secondsToHms(seconds) {
    var hours = Math.floor(seconds / 3600)
    var minutes = Math.floor((seconds - (hours * 3600)) / 60)
    minutes = minutes < 10 ? '0' + minutes : minutes
    var seconds = seconds - (hours * 3600) - (minutes * 60)
    seconds = seconds < 10 ? '0' + seconds : seconds

    return ( hours < 1 ? '' : (hours + ':')) + ( minutes < 1 ? '00' : (minutes)) + ':'+ seconds
}

function upTimer() {
    if (isSolved) {
        clearInterval(timer2)
        return
    }
    seconds++
    document.getElementById('timer').innerHTML = secondsToHms(seconds)
}

const guessRows = [
    ['','',''],
]

let currentRow = 0
let currentTile = 0

operators.forEach(operator => {
    const buttonElement = document.createElement('button')
    buttonElement.textContent = operator
    buttonElement.addEventListener('click', () => handleClick(buttonElement))
    operboard.append(buttonElement)
})

const highTile = () => {
    keyboard.childNodes.forEach(x => {
        if (x.id != parseInt(x.textContent)) {
            x.classList.add('grey-overlay')
        }
    })
}

const tileMaker = () => {
    tileDisplay.textContent = ''
    guessRows.forEach((guessRow, guessRowIndex) => {
        const rowElement = document.createElement('div')
        rowElement.setAttribute('id','guessRow-' + guessRowIndex)
        guessRow.forEach((guess, guessIndex) => {
            const tileElement = document.createElement('div')
            tileElement.setAttribute('id','guessRow-' + guessRowIndex + '-tile-' + guessIndex)
            tileElement.classList.add('tile')
            rowElement.append(tileElement)
        })
        tileDisplay.append(rowElement)
        highTile()
    })
}
tileMaker()


const keyMaker = () => {
    keyboard.textContent = ''
    //console.log('keyboard made')
    for (let keyO in keysO) {
        const buttonElement = document.createElement('button')
        buttonElement.textContent = keysO[keyO]
        //console.log('lvl ', lvl, 'level ', level)
        buttonElement.setAttribute('id', keyO)
        //let lvlButton = document.getElementById(lvl)
        buttonElement.addEventListener('click', () => handleClick(buttonElement))
        keyboard.append(buttonElement)
    }
}
keyMaker()

controls.forEach(control =>{
    const buttonElement = document.createElement('button')
    buttonElement.textContent = control
    buttonElement.setAttribute('id', control)
    buttonElement.addEventListener('click', () => handleControls(control))
    controlsboard.append(buttonElement)
})

const handleClick = (keyButton) => {
    if(isSolved) {
        return
    }
    
    const tile0 = document.getElementById('guessRow-' + 0 + '-tile-' + 0)
    const tile1 = document.getElementById('guessRow-' + 0 + '-tile-' + 1)
    const tile2 = document.getElementById('guessRow-' + 0 + '-tile-' + 2)
    
    if (tile0.textContent == '' && tile2.textContent == '' && tile1.textContent == '') {
        let inKeyboard = {}
        keyboard.childNodes.forEach(x => {inKeyboard[x.id] = x.textContent})
        prev = inKeyboard
    }

    let key = keyButton.textContent
    console.log('clicked', key)
    if (operators.includes(key)) {        
        tile1.textContent = key
        solver()
        return
    }

    if (tile0.textContent && tile2.textContent && tile1.textContent == '') {
        return        
    }
    //addNumber(key)
    addNumber(keyButton)
    solver()
}

const solver = () => {
    const tile0 = document.getElementById('guessRow-' + 0 + '-tile-' + 0)
    const tile1 = document.getElementById('guessRow-' + 0 + '-tile-' + 1)
    const tile2 = document.getElementById('guessRow-' + 0 + '-tile-' + 2)
    
    if (tile0.textContent && tile1.textContent && tile2.textContent) {
        
        let int0 = tile0.textContent
        let int2 = tile2.textContent
        if(tile1.textContent == '+'){
            //console.log('value ',value, (parseInt(int0)+parseInt(int2)));
            value = (parseInt(int0)+parseInt(int2))
        }
        if(tile1.textContent == 'x'){
            //console.log('value ',value, (parseInt(int0)*parseInt(int2)));
            value = (parseInt(int0)*parseInt(int2))
        }
        if(tile1.textContent == '-'){
            //console.log('value ',value, (parseInt(int0)-parseInt(int2)));
            value = (parseInt(int0)-parseInt(int2))
        }
        if(tile1.textContent == '/'){
            if (Number.isInteger(parseInt(int0)/parseInt(int2))) {
                //console.log('value ',value, (parseInt(int0)/parseInt(int2)));
                value = (parseInt(int0)/parseInt(int2))
            }   else {
                //console.log('No Floats!')
                showMessage('No Floats!')
            }         
        } 
        checkSolution()
        setTimeout(() => tileMaker(), 200)      
        //tileMaker()
        //console.log('Tiles full!!')
    }
}
const handleControls = (keyButton) => {
    
    let key = keyButton
    if(isSolved) {
        return
    }
    console.log('clicked', key)
    switch(key){
        case 'Restart':
            self.keys = level
            seconds = 0
            timer.textContent = '00:00'
            keyMaker()
            prev = false
            tileMaker()
            break;
        case 'Undo':
            undo()
    }        
}

const addNumber = (numberButton) => {
    if (currentTile < 3 && currentRow < 1) {
        
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        number = numberButton.textContent
        tile.textContent = number
        guessRows[currentRow][currentTile] = number
        tile.setAttribute('data', number)
        let index = numberButton.id//keys.indexOf(parseInt(numberButton.id))
        console.log('Adding ', number, 'at id ',index,' to tiles')
        //prev[index] = number
        //keysO.removeKey()
        switch (number) {
            case index:
                console.log('Number ', number, ' at', index)
                console.log('Removing base tile', number, ' at ', index)
                removeKey(index)
                  
                break;
            default:
                console.log('Number ', number)
                console.log('Removing generated tile ', number, ' at ', index)
                removeKey(numberButton.id)
        }

        if (index > -1) {
            //storPrev()
            //keys.splice(index, 1)
        }
        
       
        
        if (keyboard.childElementCount == 0) {
            showMessage('Ran out of tiles!')
        }
        //console.log('keys ',keys)
        if (currentTile == 0) {
            currentTile = 2
        } else {
            currentTile = 0
        }
    }
    
}

const removeKey = (number) => {
    const elem = document.getElementById(number)
    if (elem != null) {        
        elem.parentNode.removeChild(elem)
        console.log('number with id=',number, ' removed')
    }

}

const undo = () => {
    if (prev == false) {
        return
    }
    //prev.forEach(x => keys.splice(x, 0, x))
    //prev.forEach(x => keys.splice(x, 0, x))    
    keysO = prev
    keyMaker()
    tileMaker()
}

const checkSolution = () => {
    console.log('Recent generated - ', value,' goal', goal)
    const buttonElement = document.createElement('button')
    buttonElement.textContent = value
    test = []
    keyboard.childNodes.forEach(x => {test.push(parseInt(x.id))})
    buttonElement.setAttribute('id', Math.max(...test) + 1)
    buttonElement.addEventListener('click', () => handleClick(buttonElement))
    keyboard.append(buttonElement)
    if (value === goal) {
        isSolved = true
        keyboard.lastChild.classList.add('green-overlay')
        showMessage('Solved! Your Time: ')
    } else {
        //const keyIDs= keyboard.querySelectorAll('*[id]')
        highTile()
    }
}

const storPrev = () => {
    prev = keysO
    //prev.splice(index+1, 0, number)
}

const showMessage = (message) => {
    const messageElement = document.createElement('p')
    messageElement.textContent = message
    messageDisplay.append(messageElement)
}
