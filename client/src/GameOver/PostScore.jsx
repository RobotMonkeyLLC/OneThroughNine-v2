import React, { useState, useEffect } from 'react';

const timeToSeconds = (time) => {
    const timeArray = time.split(':').reverse()
    console.log('timeArrya',timeArray)
    const seconds = parseInt(timeArray[0])
    const minutes = parseInt(timeArray[1])
    const hours = parseInt(timeArray[2] || 0)
    console.log('tts returns',(hours * 3600) + (minutes * 60) + seconds)
    return  (minutes * 60) + seconds
}

export default function PostScore({difficultySelected}) {
    const [localStats, setLocalStats] = useState([]);
    
    useEffect(() => {
        // Fetch local stats from localStorage on component mount
        const localStatsFromStorage = JSON.parse(localStorage.getItem('localStats')) || [];
        setLocalStats(localStatsFromStorage);
      }, []);
    
      // Function to update local leaderboard stats
      const updateLocalStats = (newStat) => {
        // Add the new stat to the localStats array
        const updatedStats = [...localStats, newStat];
        // Update the state and localStorage
        setLocalStats(updatedStats);
        localStorage.setItem('localStats', JSON.stringify(updatedStats));
      };

    const handleSubmit = (event) => {
        event.preventDefault()
        const name = document.getElementById('name').value
        const seconds = document.getElementById('final-score').textContent
        const score = timeToSeconds(seconds)
        const difficulty = difficultySelected.split('_')[1]
        const date = new Date()
        const data = {name, score, difficulty, date}
        console.log('data', data)
        updateLocalStats(data)
        fetch('http://localhost:8000/post_score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                const postScoreForm = document.getElementById('post-score-form')
                window.location.reload()
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    
    return (
        <div id = "post-score" >
            <form id="post-score-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" placeholder="Enter your name" required></input>
                <button type="button" value='Cancel' >Cancel</button>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}