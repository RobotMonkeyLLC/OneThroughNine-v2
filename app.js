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

let value = 0
const difficulty = 9
const level = Array.from({length: difficulty}, (_, i) => i + 1)
keys = Array.from({length: difficulty}, (_, i) => i + 1)
let prev = false
const operators = ['+','x','-', '/']
const controls = ['Return', 'Restart', 'Undo']

isSolved = false

const guessRows = [
    ['','',''],
]

let currentRow = 0
let currentTile = 0

operators.forEach(operator => {
    const buttonElement = document.createElement('button')
    buttonElement.textContent = operator
    buttonElement.addEventListener('click', () => handleClick(operator))
    operboard.append(buttonElement)
})

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
    })
}
tileMaker()

const keyMaker = () => {
    keyboard.textContent = ''
    //console.log('keyboard made')
    keys.forEach(lvl =>{
        const buttonElement = document.createElement('button')
        buttonElement.textContent = lvl
        //console.log('lvl ', lvl, 'level ', level)
        buttonElement.setAttribute('id', lvl)
        buttonElement.addEventListener('click', () => handleClick(lvl))
        keyboard.append(buttonElement)
    
    })
}
keyMaker()

controls.forEach(control =>{
    const buttonElement = document.createElement('button')
    buttonElement.textContent = control
    buttonElement.setAttribute('id', control)
    buttonElement.addEventListener('click', () => handleControls(control))
    controlsboard.append(buttonElement)
})

const handleClick = (key) => {
    if(isSolved) {
        return
    }
    console.log('clicked', key)
    const tile0 = document.getElementById('guessRow-' + 0 + '-tile-' + 0)
    const tile1 = document.getElementById('guessRow-' + 0 + '-tile-' + 1)
    const tile2 = document.getElementById('guessRow-' + 0 + '-tile-' + 2)

    if (operators.includes(key)) {        
        tile1.textContent = key
        solver()
        return
    }
    if (tile0.textContent && tile2.textContent && tile1.textContent == '') {
        return
    }
    addNumber(key)
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
const handleControls = (key) => {
    if(isSolved) {
        return
    }
    console.log('clicked', key)
    switch(key){
        case 'Restart':
            keyMaker()
            prev = false
            tileMaker()
            break;
        case 'Undo':
            undo()
    }        
}

const addNumber = (number) => {
    if (currentTile < 3 && currentRow < 1) {
        
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = number
        guessRows[currentRow][currentTile] = number
        tile.setAttribute('data', number)
        var index = keys.indexOf(number)
        if (index > -1) {
            storPrev(number, index)
            keys.splice(index, 1)
        }
        
        removeKey(number)
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
        console.log('number ',number)
    }
    
}

const undo = () => {
    if (prev == false) {
        return
    }
    prev.forEach(x => keys.splice(x, 0, x))

    keyMaker()
    console.log('keys', keys)
}

const checkSolution = () => {
    console.log('current value', value,' goal', goal)
    if (value === goal) {
        isSolved = true
        showMessage('Solved! Your Time: ')
    } else {
        //const keyIDs= keyboard.querySelectorAll('*[id]')
        const buttonElement = document.createElement('button')
        buttonElement.textContent = value
        test = []
        keyboard.childNodes.forEach(x => {test.push(parseInt(x.textContent))})
        buttonElement.setAttribute('id', Math.max(...test) + 1)
        const gValue = value
        buttonElement.addEventListener('click', () => handleClick(gValue))
        keyboard.append(buttonElement)
    }
}

const storPrev = (number, index) => {
    if(prev == false){
        prev = []
    }
    if (index >= prev.length) {
        prev.fill(0,prev.length,index+1)
    }
    prev.splice(index+1, 0, number)
}

const showMessage = (message) => {
    const messageElement = document.createElement('p')
    messageElement.textContent = message
    messageDisplay.append(messageElement)
}
