import {showMessage} from '../GameBoard/functions'
import { getPostedScores } from './getPostedScores.jsx'
import { time_delays } from '../Constants/time_delays.js'

export const updateWin = () => {
    const postedScoresDisplay =  document.querySelector('.game-over-stats-container')
    const gameoverControlsDisplay = document.querySelector('.game-over-controls-container')
    const gameoverMessageDisplay = document.querySelector('.game-over-message-container')
    const endGame = document.getElementById('game-over')
    const endGameTitle = document.createElement('h1')
    const scoreLabel = document.createElement('p')
    const endGameScore = document.createElement('p')
    const seconds = document.getElementById('timer').textContent
    const leaderBoard = document.createElement('ol')
    const leaderBoardTitle = document.createElement('h2')
    // *** replace with text.js from constants folder
    showMessage('YOU WIN', true)
    setTimeout(() => {
        endGame.classList.add('overlay')
        endGame.classList.remove('hidden')
        
        endGameTitle.textContent = 'You Win!'
        endGame.prepend(endGameTitle)
        
        
        scoreLabel.setAttribute('id', 'score-label')
        scoreLabel.textContent = 'Your time:'
    
        endGameScore.setAttribute('id', 'final-score')
        
        console.log(seconds, 'seconds in updateWin')
        endGameScore.textContent = seconds
        gameoverMessageDisplay.append(scoreLabel, endGameScore)
    
        leaderBoard.classList.add('leaderboard')
    
        getPostedScores(leaderBoard)
    
        postedScoresDisplay.append(leaderBoard)
    
        leaderBoardTitle.textContent = 'Leaderboard'
        postedScoresDisplay.prepend(leaderBoardTitle)
    }, time_delays.game_over_delay)
    
}