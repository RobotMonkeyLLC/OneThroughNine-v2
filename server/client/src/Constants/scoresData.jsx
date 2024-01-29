export async function populateScoresData(domain, name) {
        console.log('populateScoresData ---',domain, name)
        switch (domain) {
            case 'local':
                try {
                    const apiHost = `https://one-through-nine-v3-028369100f4b.herokuapp.com/${domain}_stats?name=${name}`
                    //const apiHost = `http://localhost:8000/${domain}_stats?name=${name}`
                    const response = await fetch(apiHost ,{ method: 'GET' });
                    
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
                    const apiHost = `https://one-through-nine-v3-028369100f4b.herokuapp.com/${domain}_stats`
                    //const apiHost = `http://localhost:8000/${domain}_stats`
                    const response = await fetch(apiHost, { method: 'GET' });
                    
                    const data = response.json()
                    console.log('fetching posted data:', data);
                    return data;
                    //statElement.append(scoreElement);
                } catch (err) {
                    console.error(err);
                    return scoresData_posted_default;
                    
                }
                
            default:
                return 'Error: no domain specified';
        }
    
}


const scoresData_posted_default = [
    // sample data for testing
    {
        "name": " ",
        "score": 0,
        "tags": " ",
        "difficulty": " ",
        "date": " "
    }
    
];
const scoresData_local = [
    // sample data for testing
    {
        best: 0,
        average: 0,
        daily: 0,
        tags: " "
    },
];

export {scoresData_local, scoresData_posted_default};