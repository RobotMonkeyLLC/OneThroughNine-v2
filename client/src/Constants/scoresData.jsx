export async function populateScoresData(domain, name) {
    try {
        const response = await fetch(`http://localhost:8000/${domain}_stats?name=${name}`, { method: 'GET' });
        
        const data = await response.json();
        console.log('data:', data);
        
        //statElement.append(scoreElement);
    } catch (err) {
        return err;
    }
}


const scoresData_posted = [
    // sample data for testing
    {
        "name": "Player 3",
        "score": 100,
        "source": "Local",
        "difficulty": "Easy",
        "date": "2020-01-01"
    },
    {
        "name": "Player 2",
        "score": 200,
        "source": "Local",
        "difficulty": "Easy",
        "date": "2020-01-01"
    },
    {
        "name": "Player 4",
        "score": 200,
        "source": "Local",
        "difficulty": "Easy",
        "date": "2020-01-01"
    },
    {
        "name": "Player 1",
        "score": 200,
        "source": "Local",
        "difficulty": "Hard",
        "date": "2020-01-01"
    },
    {
        "name": "Player 5",
        "score": 200,
        "source": "Local",
        "difficulty": "Hard",
        "date": "2020-01-01"
    },
    {
        "name": "Player 6",
        "score": 200,
        "source": "Local",
        "difficulty": "Hard",
        "date": "2020-01-01"
    },
    {
        "name": "Player 7",
        "score": 200,
        "source": "Local",
        "difficulty": "Hard",
        "date": "2020-01-01"
    },
    {
        "name": "Player 8",
        "score": 200,
        "source": "Local",
        "difficulty": "Hard",
        "date": "2020-01-01"
    },
    {
        "name": "Player 9",
        "score": 200,
        "source": "Local",
        "difficulty": "Hard",
        "date": "2020-01-01"
    }
    
];
const scoresData_local = [
    // sample data for testing
    {
        "name": "Player 1",
        "score": 100,
        "source": "Local",
        "difficulty": "Easy",
        "date": "2020-01-01"
    },
    {
        "name": "Player 2",
        "score": 200,
        "source": "Local",
        "difficulty": "Hard",
        "date": "2020-01-01"
    },
    {
        "name": "Player 3",
        "score": 200,
        "source": "Local",
        "difficulty": "Hard",
        "date": "2020-01-01"
    }
];

export {scoresData_local, scoresData_posted};