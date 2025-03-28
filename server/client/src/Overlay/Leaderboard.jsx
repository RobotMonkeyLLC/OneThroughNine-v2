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
        {/* <li>{data.difficulty}</li> */}
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
    // get username from local storage
    const user = localStorage.localStats ? JSON.parse(localStorage.getItem('localStats'))[0].name : null;

    const [scoresData_local, setLocalStats] = useState(inLocalStorage);
    const [scoresData_posted, setPostedStats] = useState(scoresData_posted_default);
    const [scores_level1_posted, setScores_level1_posted] = useState(scoresData_posted_default);
    const [scores_level2_posted, setScores_level2_posted] = useState(scoresData_posted_default);
    const [scores_level3_posted, setScores_level3_posted] = useState(scoresData_posted_default);
    const [scores_level1_local, setScores_level1_local] = useState(scoresData_posted_default);
    const [scores_level2_local, setScores_level2_local] = useState(scoresData_posted_default);
    const [scores_level3_local, setScores_level3_local] = useState(scoresData_posted_default);
    

    //console.log('localStatsFromStorage ---',scoresData_posted)

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch game data or perform initial setup
                // Example: fetch('/api').then((res) => res.json()).then((data) => setData(data.message));
                
                const localData = await populateScoresData('local', user);
                setLocalStats([localData.lvl1] || scoresData_local);
                console.log('localData ---',localData)

                const postedData = await populateScoresData('posted')
                
                setPostedStats(postedData.top10Scores || postedData)
                setScores_level1_posted(postedData.top10Scores);
                setScores_level2_posted(postedData.top10Scores2);
                setScores_level3_posted(postedData.top10Scores3);
                
                setScores_level1_local([localData.lvl1]);
                setScores_level2_local([localData.lvl2]);
                setScores_level3_local([localData.lvl3]);
                
                //console.log('scoresData_local ---',localData)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);
    
    const leaderSelect_posted = (e, level) => {
        e.preventDefault();
        e.target.parentElement.childNodes.forEach((child) => {
            child.classList.remove('selected');
        })
        e.target.classList.add('selected');
        console.log('e',e.target)
        setPostedStats(level)
    }
    const leaderSelect_local = (e, level) => {
        e.preventDefault();
        e.target.parentElement.childNodes.forEach((child) => {
            child.classList.remove('selected');
        })
        e.target.classList.add('selected');
        console.log('e',e.target)
        setLocalStats(level)
    }
    return (
        <div className="stats-container">
            <div className="text-header">
                
                <div className="stats-board">
                <ul id="Local" className="stat">
                    <p>Stats</p>
                    <div className="leaderboard-level-select">
                        <button onClick={(e) => leaderSelect_local(e,scores_level1_local)} className="selected">Level 1</button>
                        <button onClick={(e) => leaderSelect_local(e,scores_level2_local)}>Level 2</button>
                        <button onClick={(e) => leaderSelect_local(e,scores_level3_local)}>Level 3</button>
                    </div>
                    <div className="stats-calc">
                        <ul className="stats-board-header">
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
                    </div>                    
                </ul>
            </div>
            </div>
            <div className="text-header">
                
                
                <div className="stats-board">
                    <ul id="Posted" className="stat">
                        <p>Leaderboard</p>  
                        <div className="leaderboard-level-select">
                            <button onClick={(e) => leaderSelect_posted(e,scores_level1_posted)} className="selected">Level 1</button>
                            <button onClick={(e) => leaderSelect_posted(e,scores_level2_posted)}>Level 2</button>
                            <button onClick={(e) => leaderSelect_posted(e,scores_level3_posted)}>Level 3</button>
                        </div>
                        <ul className="stats-board-header">
                            <li>Name</li>
                            <li>Score</li>
                            {/* <li>Difficulty</li> */}
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
            {/* <div className="stats-board">
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
            </div> */}        
        </div>
    )
}
export default Leaderboard;