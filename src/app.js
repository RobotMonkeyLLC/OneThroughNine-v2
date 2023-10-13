const goalDisplay = document.querySelector('.goal-container')
const timerDisplay = document.querySelector('.timer-container')
const boardDisplay = document.querySelector('.board-tile-container')
const keyboard = document.querySelector('.keyboard-container')
const titleDisplay = document.querySelector('.main-title-container')
const statsDisplay = document.querySelector('.stats-container')
const operDisplay = document.querySelector('.operboard-container')
const controlsboard = document.querySelector('.controls-container')
const messageDisplay = document.querySelector('.message-container')
const rulesDisplay = document.querySelector('.rules-container')

let isSolved = false
let isGame = false
let board = [0,0,0]
let value = 0
let goal = 0
let seconds = 0

if (isGame == false) {
        
    // Create Title display
    const titleElement = document.createElement('h1')
    titleElement.textContent = 'OneThruNine'
    titleDisplay.append(titleElement)
    
    // Create Rules display
    const rulesElement = document.createElement('div')
    rulesElement.classList.add('rules')
    rulesParagraph = rulesElement.appendChild(document.createElement('p'))
    rulesParagraph.textContent = 'Directions - Use all of the digits provided to arrive at the random number generated.'
    rulesDisplay.append(rulesElement)

    // populate stats
    const populateStats = (statElement, domain, data) => {
        switch (domain) {
                
            case 'Local':
                // statItem.textContent = `Best Time: ${data.bestTime}`
                ['Best Time', 'Average', 'Daily Time'].forEach((stat, index) => {
                    const scoreElement = document.createElement('ul')
                    const scoreTitle = document.createElement('li')
                    const scoreValue = document.createElement('li')
                    scoreTitle.textContent = stat + ': '
                    scoreValue.textContent = data[stat.toLowerCase().split(' ')[0]]
                    //console.log('Score Element ',scoreValue.textContent, 'at index ',index)
                    scoreElement.append(scoreTitle, scoreValue)
                    statElement.append(scoreElement);
                })
                
                break
            case 'Posted':
                
                data.top10Scores.forEach((score, index) => {
                    const scoreContainer = document.createElement('ul')
                    scoreContainer.classList.add('score-container')
                    
                    const scoreTitle = document.createElement('li')
                    scoreTitle.textContent = index === 0 ? 'Best Time: ' : `#${index+1}: `

                    const metaContainer = document.createElement('ul')
                    metaContainer.classList.add('meta-container')

                    const scoreValue = document.createElement('li')
                    scoreValue.textContent = score.score
                    const scoreDate = document.createElement('li')
                    scoreDate.textContent = formatDate(score.date)
                    const scoreUser = document.createElement('li')
                    scoreUser.textContent = score.name
                    scoreUser.classList.add('user')
                    
                    const statList = document.createElement('ul')
                    statList.classList.add('stat-list')
                    
                    metaContainer.append(scoreUser, scoreDate)
                    scoreContainer.append(scoreTitle, scoreValue)
                    statList.append(scoreContainer, metaContainer)
                    statElement.append(statList)
                })
                break
        }
    }

    // Get local stats
    const getStats = async (statElement, domain) => {
        const statItem = document.createElement('li');
    
        try {
            const response = await fetch(`http://localhost:8000/${domain}_stats`, { method: 'GET' });
            
            const data = await response.json();
            //console.log(`Here is the ${domain} data`,data.bestTime)
            //const scoreTitle = document.createElement('li');
            populateStats(statElement, domain, data)
            
            //statElement.append(scoreElement);
        } catch (err) {
            /* statItem.classList.add('default');
            statItem.textContent = 'No play history to show';
            statElement.append(statItem); */
            const data = {
                best: 'None',
                average: 'None',
                daily: 'None',
                top10Scores: Array(10).fill().map(() => ({
                    score: '0',
                    name: '-----',
                    date: '--/--/----'
                }))
            };
            
            populateStats(statElement, domain, data)
            console.error(err);
        }
    
        //statItem.classList.add('stat');
        //statElement.append(statItem);
    }

    // Create stats board
    const stats = ['Local Stats', 'Posted Scores'] // hard coded for now
    stats.forEach(stat => {
        const statElement = document.createElement('ul')
        const statHeader = document.createElement('ul')
        const statTitle = document.createElement('li')
        const stateValue = document.createElement('li')
        statTitle.textContent = stat
        stateValue.textContent = (stat == 'Local Stats') ? 'Time' : 'Time-User-Date'
        
        statElement.classList.add('stat')
        statElement.setAttribute('id', stat.split(' ')[0]) // splits string; should be changed later
        
        statHeader.classList.add('stat-title')
        statHeader.append(statTitle, stateValue)
        statElement.append(statHeader)
        statsDisplay.append(statElement)
        getStats(statElement, stat.split(' ')[0])
    })

    // Create difficulty selector
    const difficultyDisplay = document.querySelector('.difficulty-container')
    const difficulties = [['easy','Level 1'], ['advanced','Level 2'], ['expert','Level 3']]
    
    difficulties.forEach(dif => {
        const buttonElement = document.createElement('button')
        buttonElement.textContent = dif[1]
        buttonElement.setAttribute('id', dif[0])
        buttonElement.classList.add('difficulty')
        buttonElement.addEventListener('click', () => selectedDifficulty(buttonElement))
        difficultyDisplay.append(buttonElement)
    })

    // Get default difficulty
    function getDefaults(difficulty) {
        goal = difficulty === 'easy' ? 100 : 
                difficulty === 'advanced' ? 500 : 3000;
        choice = difficulty === 'easy' ? [1,2,3,4,5] : 
                difficulty === 'advanced' ? [1,2,3,4,5,6,7] : [1,2,3,4,5,6,7,8,9];
        return {goal, choice}
    }
    
    // Get difficulty from server
    async function getDifficulty(difficulty) {
        isGame = true;
        document.getElementById('overlay').style.display = 'none';
        
        let goalElement = document.createElement('p');
        goalElement.id = 'goal';
    
        try {
            const response = await fetch(`http://localhost:8000/tiles?difficulty=${difficulty}`)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            goal = data.target;
            choice = data.tiles;
        } catch (err) {
            let {goal, choice} = getDefaults(difficulty)
            console.error(err);
        }

        goalElement.textContent = goal;
        goalDisplay.append(goalElement);
        
        choice.forEach((keyO) => {keysO[keyO] = keyO});
            
        gameObjects = [messageDisplay, keyboard, boardDisplay, operDisplay, controlsboard];
        gameObjects.forEach((displayElement) => gameBuilder(displayElement));
        
        // start timer
        //var timerTime = setInterval(upTimer, 1000);
        setInterval(upTimer, 1000);
    }

    // Difficulty selector and generate game
    const selectedDifficulty = async (buttonElement) => {
        const difficulty = buttonElement.id;
        buttonElement.classList.add('button-grow');

        getDifficulty(difficulty);
        createTimer()
    }
}
// Create timer
function createTimer() {
    var timer = document.createElement('p')
    timer.textContent = '00:00'
    timer.id = 'timer'
    timerDisplay.append(timer)
}

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
    if (!isSolved) {
        seconds++
        document.getElementById('timer').innerHTML = secondsToHms(seconds)
    }
}

// Format date
function formatDate(date) {
    const d = new Date(date);
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
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
            break
        case gameoverControlsDisplay:
            boardBlock = ['Return', 'Post Score']
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
            buttonElement.addEventListener('click', () => handleClick(buttonElement))
            buttonElement.classList.add(boardClass)
        }
        
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
    localStorage.setItem('undoStack', JSON.stringify([]))
}
const restoreBoardState = (tilesState) => {
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
    for (i in ['int 1', 'oper', 'int 2']) {
        const buttonElement = document.createElement('div');
        buttonElement.textContent = board.values[i];
        buttonElement.setAttribute('id', board.ids[i]);
        board.classList[i].split(' ').forEach(x => buttonElement.classList.add(x))
        //buttonElement.classList.add(tilesState.board.classList[i]);
        boardDisplay.append(buttonElement);
    }
}

const undo = () => {   
    const undoStack = JSON.parse(localStorage.getItem('undoStack')) || []
    if (undoStack.length == 0) {
        console.log('Nothing to undo')
        return null
    }
    const lastState = undoStack.pop().currentState
    //gameBuilder(keyboard)
    restoreBoardState(lastState)
    localStorage.setItem('undoStack', JSON.stringify(undoStack))
    //console.log('Undone to ',lastState) 
}
const saveState = () => {
    const keys = {keys:[], ids:[]}
    const board = {ids:[],values:[], classList:[]}
    keyboard.childNodes.forEach(x => {keys.keys.push(x.textContent), keys.ids.push(x.id)})
    boardDisplay.childNodes.forEach(x => {
        board.ids.push(x.id), 
        board.values.push(x.textContent), 
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

const isBoardFilled = () => {
    let boardTiles =  {int1:document.getElementById('int 1'),int2:document.getElementById('int 2')}
    let boardOper = document.getElementById('operator')
    if (boardTiles.int1.classList.contains('default') || boardTiles.int2.classList.contains('default') || boardOper.classList.contains('default')) {
        return false
    } else {
        return true
    }
}

const clearBoard = () => {
    const boardTiles =  {int1:document.getElementById('int 1'),int2:document.getElementById('int 2')}
    const boardOper = document.getElementById('operator')
    boardTiles.int1.classList.add('default')
    boardTiles.int2.classList.add('default')
    boardOper.classList.add('default')
    boardTiles.int1.textContent = ''
    boardTiles.int2.textContent = ''
    boardOper.textContent = ''
}
const getMaxId = () => {
    let maxId = 0
    keyboard.childNodes.forEach(x => {
        if (x.id > maxId) {
            maxId = x.id
        }
    })
    return parseInt(maxId)
}

const addKey = (value) => {
    const buttonElement = document.createElement('button')
    buttonElement.textContent = value
    buttonElement.setAttribute('id', getMaxId()+1)
    buttonElement.classList.add('key')
    buttonElement.addEventListener('click', () => handleClick(buttonElement))
    keyboard.append(buttonElement)
}

const isAllTilesUsed = (boardOperValue) => {
    let isEmpty = (keyboard.childNodes.length == 0)
    //let isGoal = (goal == boardOperValue)

    if (isEmpty) {
        
        if(isEmpty){ 
            return true
        } else {
            return ((keyboard.childNodes.length == 1) & isGoal)
        }
    } else if(keyboard.childNodes.length == 1) {
        return (goal == boardOperValue)
    }
}

const checkSolution = () => {
    //saveState()
    if (isBoardFilled()) {
        const boardTiles =  {int1:document.getElementById('int 1'),int2:document.getElementById('int 2')}
        const boardOper = document.getElementById('operator')
        const boardKeys = {int1:boardTiles.int1.textContent,int2:boardTiles.int2.textContent}
        const boardOperKey = boardOper.textContent
        const boardOperValue = boardOperKey == '+' ? parseInt(boardKeys.int1) + parseInt(boardKeys.int2) :
                               boardOperKey == '-' ? parseInt(boardKeys.int1) - parseInt(boardKeys.int2) :
                               boardOperKey == 'x' ? parseInt(boardKeys.int1) * parseInt(boardKeys.int2) :
                               boardOperKey == '/' ? parseInt(boardKeys.int1) / parseInt(boardKeys.int2) : 0
        if (!Number.isInteger(boardOperValue)) {
            showMessage("No Floats Allowed!")
            //undo()
            return
        }
        //console.log('boardOperValue ',boardOperValue)        
        
        //console.log('goal ',goal)
        if (boardOperValue == goal) {
            if(isAllTilesUsed(boardOperValue)) {
                console.log('Solved!')
                isSolved = true
                updateWin()
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

const removeKey = (buttonElement) => {
    const elem = buttonElement
    buttonElement.classList.add('inactive')
    checkSolution()
    setTimeout(() => elem.parentNode.removeChild(elem), 200)
}
const keyManager = (buttonElement) => {
    const boardTiles =  {int1:document.getElementById('int 1'),int2:document.getElementById('int 2')}
    saveState()
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
    saveState()
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
                break
            case 'Post Score':
                postScore()           
        }
    }
}

const postedScoresDisplay =  document.querySelector('.game-over-stats-container')
const gameoverControlsDisplay = document.querySelector('.game-over-controls-container')
const gameoverMessageDisplay = document.querySelector('.game-over-message-container')

const updateWin = () => {

    showMessage('Goal reached!')
    const endGame = document.getElementById('game-over')
    endGame.classList.add('overlay')
    endGame.classList.remove('hidden')
    
    const endGameTitle = document.createElement('h1')
    endGameTitle.textContent = 'You Win!'
    endGame.prepend(endGameTitle)
   
    const endGameScore = document.createElement('p')
    endGameScore.textContent = `Your time: ${secondsToHms(seconds)}`
    gameoverMessageDisplay.append(endGameScore)

    const leaderBoard = document.createElement('ol')    
    leaderBoard.classList.add('leaderboard')
    const getPostedScores = () => {
        fetch('http://localhost:8000/posted_stats')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const postedScores = data.top10Scores;
            updateLeaderBoard(postedScores);
        })
        .catch(err => {
            console.error(err);
            leaderBoard.classList.add('default');
            defaultScores = Array(10).fill().map(() => ({
                score: '0',
                name: '-----',
                date: '--/--/----'
            }));
            updateLeaderBoard(defaultScores)
        });
    }
    
    const updateLeaderBoard = (scores) => {
        leaderBoard.innerHTML = ''; // Clear the existing scores before appending new ones.
        scores.forEach(score => {
            const scoreElement = document.createElement('ol')
            scoreElement.classList.add('over-score')
            
            const scoreName = document.createElement('li')
            scoreName.classList.add('over-user')

            const scoreValue = document.createElement('li')
            scoreValue.classList.add('over-value')
            
            const scoreDate = document.createElement('li')
            scoreDate.classList.add('over-date')

            scoreName.textContent = score.name
            scoreValue.textContent = score.score
            scoreDate.textContent = formatDate(score.date)
            //console.log('Score ',score)
            scoreElement.append(scoreName, scoreValue, scoreDate)
            leaderBoard.append(scoreElement)
        });
    }
    
    getPostedScores();
    

    postedScoresDisplay.append(leaderBoard)
    const leaderBoardTitle = document.createElement('h2')
    leaderBoardTitle.textContent = 'Leaderboard'
    postedScoresDisplay.prepend(leaderBoardTitle)

    // End game controls
    gameBuilder(gameoverControlsDisplay)    
}

const showMessage = (message) => {
    messageDisplay.firstChild.textContent = message
    setTimeout(() => messageDisplay.firstChild.textContent = '', 2000)
}

const postScore = () => {
    const postScore = document.getElementById('post-score')
    postScore.classList.add('overlay')
    postScore.classList.remove('hidden')
    
    const postScoreTitle = document.createElement('h1') 
    postScoreTitle.textContent = 'Post Score'
    //postScore.prepend(postScoreTitle)
    
    const scoreBanner = document.createElement('div')
    scoreBanner.classList.add('score-banner')
    
    const bannerParagraph = document.createElement('p')
    //bannerParagraph.classList.add('score-banner')
    bannerParagraph.textContent = `Your time: ${secondsToHms(seconds)}`
    scoreBanner.append(postScoreTitle)
    scoreBanner.append(bannerParagraph)    
    postScore.append(scoreBanner)

    const postScoreForm = document.createElement('form')
    postScoreForm.setAttribute('id', 'post-score-form')
    const postScoreInput = document.createElement('input')
    postScoreInput.setAttribute('type', 'text')
    postScoreInput.setAttribute('name', 'username')
    postScoreInput.setAttribute('id', 'username')
    postScoreInput.setAttribute('placeholder', 'Enter name')
    postScoreInput.setAttribute('required', 'true')

    const postScoreSubmit = document.createElement('input');
    postScoreSubmit.setAttribute('type', 'submit');
    postScoreSubmit.setAttribute('value', 'Submit');

    const postScoreCancel = document.createElement('input');
    postScoreCancel.setAttribute('type', 'button');
    postScoreCancel.setAttribute('value', 'Cancel');

    const postScoreControls = document.createElement('div');
    postScoreControls.classList.add('post-score-controls');
    postScoreControls.append(postScoreSubmit, postScoreCancel);

    postScoreForm.append(postScoreInput, postScoreControls);
    postScore.append(postScoreForm);

    postScoreForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const score = seconds;
        const data = { username, score };

        fetch('http://localhost:8000/post_score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            postScore.classList.add('hidden');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    postScoreCancel.addEventListener('click', () => {
        postScore.innerHTML = '';
        postScore.classList.add('hidden');
        //postScore.remove();
    });

}
// Clear undoStack storge on page load
document.addEventListener("DOMContentLoaded", function() {
    localStorage.setItem('undoStack', JSON.stringify([]));
});