function getDefaults(difficulty) {
    let goal = difficulty === 'easy' ? 100 : 
            difficulty === 'advanced' ? 500 : 3000;
    let choice = difficulty === 'easy' ? [1,2,3,4,5] : 
            difficulty === 'advanced' ? [1,2,3,4,5,6,7] : [1,2,3,4,5,6,7,8,9];
    return {goal, choice}
}

export default getDefaults;