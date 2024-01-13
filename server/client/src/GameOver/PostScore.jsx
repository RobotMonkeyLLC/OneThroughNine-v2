import React, { useState, useEffect } from 'react';

const timeToSeconds = (time) => {
    const timeArray = time.split(':').reverse()
    //console.log('timeArray',timeArray)
    const seconds = parseInt(timeArray[0])
    const minutes = parseInt(timeArray[1])
    const hours = parseInt(timeArray[2] || 0)
    //console.log('tts returns',(hours * 3600) + (minutes * 60) + seconds)
    return  (minutes * 60) + seconds
}

export default function PostScore({difficultySelected}) {
    const [localStats, setLocalStats] = useState([]);
    const [localName, setLocalName] = useState(null);
    
    useEffect(() => {
        // Fetch local stats from localStorage on component mount
        const localStatsFromStorage = JSON.parse(localStorage.getItem('localStats')) || [];
        const username = JSON.parse(localStorage.getItem('username')) || null;
        setLocalName(username);
        setLocalStats(localStatsFromStorage);
    }, []);
    
    // Function to update local leaderboard stats
    const updateLocalStats = (newStat) => {
    // Add the new stat to the localStats array
    const updatedStats = [...localStats, newStat];
    // Update the state and localStorage
    setLocalStats(updatedStats);
    localStorage.setItem('localStats', JSON.stringify(updatedStats));
    // update localStats_calc
    const localStats_calc = [{
        best: Math.min(...updatedStats.map((stat) => stat.score)),
        average: Math.round(updatedStats.reduce((acc, stat) => acc + stat.score, 0) / updatedStats.length),
        daily: updatedStats.filter((stat) => 
            (new Date(stat.date)).getDate() === new Date().getDate() &&
            (new Date(stat.date)).getMonth() === new Date().getMonth() &&
            (new Date(stat.date)).getFullYear() === new Date().getFullYear() ? stat.score : 0).reduce((acc, stat) => acc + stat.score, 0)
    }]
    console.log('localStats_calc',localStats_calc)
    localStorage.setItem('localStats_calc', JSON.stringify(localStats_calc));
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        //const name = document.getElementById('name').value
        const name = localName || document.getElementById('name').value
        const seconds = document.getElementById('final-score').textContent
        const score = timeToSeconds(seconds)
        console.log('difficultySelected', difficultySelected)
        const difficulty = difficultySelected.split('_')[1]
        const date = new Date()
        const data = {name, score, difficulty, date}
        console.log('data', data)
        updateLocalStats(data)
        fetch('https://one-through-nine-v3-028369100f4b.herokuapp.com/post_score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                localStorage.setItem('username', JSON.stringify(name));
                window.location.reload()
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    
    return (
        <div id = "post-score" onSubmit={handleSubmit}>
            <form id="post-score-form" >
                <label htmlFor="name">Name:{localName || ''}</label>
                {localName == null && <input type="text" id="name" name="name" placeholder="Enter your name" required></input>}
                <button type="button" value='Cancel' onClick={() => window.location.reload()}>Cancel</button>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}