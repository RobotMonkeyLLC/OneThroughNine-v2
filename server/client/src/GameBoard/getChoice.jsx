import { useState } from 'react';
import getDefaults from '../Constants/defaults.js';

// merge difficulty endpoints into single call at the start of game
export async function getDifficulty(difficulty, setGoal, goal) {
    
    try {
        const response = await fetch(`hhttps://one-through-nine-v3-028369100f4b.herokuapp.com/tiles?difficulty=${difficulty}`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('fectched data:',data, 'at', difficulty);
        //setGoal(data)
        //console.log('goal set to:', goal)
        return data
        /* const goal = data.target;
        const choice = data.tiles; */
    } catch (err) {
        const {goal, choice} = getDefaults(difficulty)
        console.warn('Error fetching data, using defaults:',goal, choice,);
    }
    //return { goal, choice}
}