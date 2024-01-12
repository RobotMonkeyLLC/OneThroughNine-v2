import { leaderScores } from "../Constants/defaults";
import { secondsToHms, formatDate } from "../GameBoard/functions";

const updateLeaderBoard = (scores, leaderBoard) => {
    //leaderBoard.innerHTML = ''; // Clear the existing scores before appending new ones.
    console.log('scores', scores)
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
        scoreValue.textContent = secondsToHms(score.score)
        scoreDate.textContent = formatDate(score.date)
        //console.log('Score ',score)
        scoreElement.append(scoreName, scoreValue, scoreDate)
        leaderBoard.append(scoreElement)
    });
}

export const getPostedScores = (leaderBoard) => {
    fetch('https://one-through-nine-v3-028369100f4b.herokuapp.com/posted_stats')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const postedScores = data.top10Scores;
        updateLeaderBoard(postedScores, leaderBoard);
    })
    .catch(err => {
        console.error(err);
        leaderBoard.classList.add('default');
        console.log('leaderScores', leaderScores)
        updateLeaderBoard(leaderScores, leaderBoard)
    });

}