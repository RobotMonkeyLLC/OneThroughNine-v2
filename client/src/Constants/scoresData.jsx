export async function populateScoresData(domain, name = 'jon' ) {
        console.log('populateScoresData ---',domain, name)
        switch (domain) {
            case 'local':
                try {
                    const response = await fetch(`http://0.0.0.0:${process.env.PORT}/${domain}_stats?name=${name}`
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
                    const response = await fetch(`http://0.0.0.0:${process.env.PORT}/${domain}_stats`, { method: 'GET' });
                    
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