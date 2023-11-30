import { leaderScores } from "../Constants/defaults";

// convert seconds to HH:MM:SS
function secondsToHms(seconds) {
    //const seconds = document.getElementById('timer').textContent
    let hours = Math.floor(seconds / 3600)
    let minutes = Math.floor(seconds % 3600 / 60)
    let secondsScore = Math.floor(seconds % 3600 % 60)

    return ( hours < 1 ? '' : (hours + ':')) + ( minutes < 1 ? '00' : (minutes)) + ':'+ secondsScore
}

function formatDate(date) {
    const d = new Date(date);
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
}

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
    fetch('http://localhost:8000/posted_stats')
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