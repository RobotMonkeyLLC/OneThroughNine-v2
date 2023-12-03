import React,{ useState, useEffect } from "react";
import { populateScoresData, scoresData_posted_default} from "../Constants/scoresData";
import { formatDate, secondsToHms } from "../GameBoard/functions";
import { localScores } from "../Constants/defaults";

const FillPosted = ({data}) => {
    //console.log('filling posted ---',data)
    return (
    <ul className={`stats ${data.tags || ''}`}>
        <li>{data.name}</li>
        <li>{data.score}</li>
        <li>{data.difficulty}</li>
        <li>{formatDate(data.date)}</li>
    </ul>        
    )
}
const FillLocal = ({data}) => {
    
    return (
        <ul className={`stats ${data.tags || ''}`}>
            
            <li className={!(data.best > 0)? 'default' : ''}>
                {!(data.best > 0)? 'No Score Yet' : secondsToHms(data.best)}
            </li>
            <li className={!(data.average > 0)? 'default' : ''}>
                {!(data.average > 0) ? 'None': secondsToHms(data.average)}
            </li>
            <li className={!(data.daily > 0) ? 'default' : ''}>
                {!(data.daily > 0)? 'No Score Yet' : secondsToHms(data.daily)}
            </li>
        </ul>        
    )
}
const Leaderboard = () => {

    const inLocalStorage = JSON.parse(localStorage.getItem('localStats_calc')) || localScores;
    const [scoresData_local, setLocalStats] = useState(inLocalStorage);
    const [scoresData_posted, setPostedStats] = useState(scoresData_posted_default);
    
    //console.log('localStatsFromStorage ---',populateScoresData('local', 'jon'))

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch game data or perform initial setup
                // Example: fetch('/api').then((res) => res.json()).then((data) => setData(data.message));
                const localData = await populateScoresData('local', 'jon');
                setLocalStats([localData]);

                const postedData = await populateScoresData('posted')
                setPostedStats(postedData.top10Scores);
                //console.log('postedData ---',postedData)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);
    
    return (
        <div className="stats-container">
            <div className="text-header">
                <p>Local Stats</p>
                <p>Posted Stats</p>
            </div>
            <div className="stats-board">
                <ul id="Local" className="stat">
                    <ul>
                        <li>Best</li>
                        <li>Average</li>
                        <li>Daily</li>
                    </ul>
                    {scoresData_local.map((score, index) => (
                        <FillLocal
                            key={index}
                            data={score}
                        />
                    ))}
                </ul>
                <ul id="Posted" className="stat">
                    <ul>
                        <li>Name</li>
                        <li>Score</li>
                        <li>Difficulty</li>
                        <li>Date</li>
                    </ul>
                    {scoresData_posted.map((score, index) => (
                        <FillPosted
                            key={index}
                            data={score}
                        />
                    ))}
                </ul>
            </div>        
        </div>
    )
}
export default Leaderboard;