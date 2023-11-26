function getDefaults(difficulty) {
    let goal = difficulty === 'easy' ? 100 : 
            difficulty === 'advanced' ? 500 : 3000;
    let choice = difficulty === 'easy' ? [1,2,3,4,5] : 
            difficulty === 'advanced' ? [1,2,3,4,5,6,7] : [1,2,3,4,5,6,7,8,9];
    return {goal, choice}
}

const defaults = {
    easy: [1, 2, 3, 4, 5],
    advanced: [1, 2, 3, 4, 5, 6, 7],
    expert: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        goal: {
                easy: 100,
                advanced: 500,
                expert: 3000
        },
        board: {
                int1: 'int 1',
                int2: 'int 2',
                oper: 'operator',
        }
}

export { defaults }
export default getDefaults;