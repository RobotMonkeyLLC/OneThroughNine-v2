import React from "react";
import {scoresData_local, scoresData_posted} from "./scoresData";

const FillPosted = ({data}) => (
    <ul className="stats">
        <li>{data.name}</li>
        <li>{data.score}</li>
        <li>{data.difficulty}</li>
        <li>{data.date}</li>
    </ul>        
)

const FillLocal = ({data}) => (
    <ul className="stats">
        
        <li>{data.score}</li>
        <li>{data.difficulty}</li>
        <li>{data.date}</li>
    </ul>        
)

const Leaderboard = () => (
    <div className="stats-container">
        <div className="text-header">
            <p>Local Stats</p>
            <p>Posted Stats</p>
        </div>
        <div className="stats-board">
            <ul id="Local" className="stat">
                <ul>
                    <li>Score</li>
                    <li>Difficulty</li>
                    <li>Date</li>
                </ul>
                {scoresData_local.map((score, index) => (
                    <FillLocal
                        key={score.name}
                        index={index}
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
                        key={score.name}
                        index={index}
                        data={score}
                    />
                ))}
            </ul>
        </div>        
    </div>
)
export default Leaderboard;