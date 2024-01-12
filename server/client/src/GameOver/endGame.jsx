import {showMessage} from '../GameBoard/functions'
import { getPostedScores } from './getPostedScores.jsx'

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
    
    const scoreLabel = document.createElement('p')
    scoreLabel.setAttribute('id', 'score-label')
    scoreLabel.textContent = 'Your time:'

    const endGameScore = document.createElement('p')
    endGameScore.setAttribute('id', 'final-score')
    const seconds = document.getElementById('timer').textContent
    console.log(seconds, 'seconds in updateWin')
    endGameScore.textContent = seconds
    gameoverMessageDisplay.append(scoreLabel, endGameScore)

    const leaderBoard = document.createElement('ol')    
    leaderBoard.classList.add('leaderboard')

    getPostedScores(leaderBoard)

    postedScoresDisplay.append(leaderBoard)
    const leaderBoardTitle = document.createElement('h2')
    leaderBoardTitle.textContent = 'Leaderboard'
    postedScoresDisplay.prepend(leaderBoardTitle)
}