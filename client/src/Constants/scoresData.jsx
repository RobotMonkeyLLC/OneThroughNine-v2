export async function populateScoresData(domain, name = 'jon' ) {
        console.log('populateScoresData ---',domain, name)
        switch (domain) {
            case 'local':
                try {
                    const response = await fetch(`http://localhost:8000/${domain}_stats?name=${name}`
                        ,{ method: 'GET' });
                    
                    const data = await response.json()
                    //console.log('async data:', data);
                    return data;                    
                    //statElement.append(scoreElement);
                } catch (err) {
                    console.error(err);
                    return scoresData_local;
                    
                }
                break;

            case 'posted':
                try {
                    const response = await fetch(`http://localhost:8000/${domain}_stats`, { method: 'GET' });
                    
                    const data = response.json()
                    console.log('fetching posted data:', data);
                    return data;
                    //statElement.append(scoreElement);
                } catch (err) {
                    console.error(err);
                    return scoresData_posted;
                    
                }
                
            default:
                return 'Error: no domain specified';
        }
    
}


const scoresData_posted = [
    // sample data for testing
    {
        "name": "Player 3",
        "score": 100,
        "source": "Local",
        "difficulty": "Level 1",
        "date": "2020-01-01"
    },
    {
        "name": "Player 2",
        "score": 200,
        "source": "Local",
        "difficulty": "Level 1",
        "date": "2020-01-01"
    },
    {
        "name": "Player 4",
        "score": 200,
        "source": "Local",
        "difficulty": "Level 1",
        "date": "2020-01-01"
    },
    {
        "name": "Player 1",
        "score": 200,
        "source": "Local",
        "difficulty": "Level 3",
        "date": "2020-01-01"
    },
    {
        "name": "Player 5",
        "score": 200,
        "source": "Local",
        "difficulty": "Level 3",
        "date": "2020-01-01"
    },
    {
        "name": "Player 6",
        "score": 200,
        "source": "Local",
        "difficulty": "Level 3",
        "date": "2020-01-01"
    },
    {
        "name": "Player 7",
        "score": 200,
        "source": "Local",
        "difficulty": "Level 3",
        "date": "2020-01-01"
    },
    {
        "name": "Player 8",
        "score": 200,
        "source": "Local",
        "difficulty": "Level 3",
        "date": "2020-01-01"
    },
    {
        "name": "Player 9",
        "score": 200,
        "source": "Local",
        "difficulty": "Level 3",
        "date": "2020-01-01"
    }
    
];
const scoresData_local = [
    // sample data for testing
    {
        best: 100,
        average: 100,
        daily: 100,
        tags: "default"
    },
];

export {scoresData_local, scoresData_posted};