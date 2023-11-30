import {showMessage} from '../GameBoard/functions'
import { getPostedScores } from './getPostedScores.jsx'

// convert seconds to HH:MM:SS
export function secondsToHms() {
    const seconds = document.getElementById('timer').textContent
    let hours = Math.floor(seconds / 3600)
    let minutes = Math.floor(seconds % 3600 / 60)
    let secondsScore = Math.floor(seconds % 3600 % 60)

    return ( hours < 1 ? '' : (hours + ':')) + ( minutes < 1 ? '00' : (minutes)) + ':'+ secondsScore
}

export const updateWin = () => {
    const postedScoresDisplay =  document.querySelector('.game-over-stats-container')
    const gameoverControlsDisplay = document.querySelector('.game-over-controls-container')
    const gameoverMessageDisplay = document.querySelector('.game-over-message-container')

    // *** replace with text.js from constants folder
    showMessage('You Win!')
    const endGame = document.getElementById('game-over')
    endGame.classList.add('overlay')
    endGame.classList.remove('hidden')
    
    const endGameTitle = document.createElement('h1')
    endGameTitle.textContent = 'You Win!'
    endGame.prepend(endGameTitle)
    
    const endGameScore = document.createElement('p')
    const seconds = document.getElementById('timer').textContent
    console.log(seconds, 'seconds in updateWin')
    endGameScore.textContent = `Your time: ${(seconds)}`
    gameoverMessageDisplay.append(endGameScore)

    const leaderBoard = document.createElement('ol')    
    leaderBoard.classList.add('leaderboard')

    getPostedScores(leaderBoard)

    postedScoresDisplay.append(leaderBoard)
    const leaderBoardTitle = document.createElement('h2')
    leaderBoardTitle.textContent = 'Leaderboard'
    postedScoresDisplay.prepend(leaderBoardTitle)
}