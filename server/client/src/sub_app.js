const titleDisplay = document.querySelector('.main-title-container');

let isGame = false;
console.log('append title');
if (isGame === false){
    const titleElement = document.createElement('h1');
    titleElement.innerText = 'OneThruNine';
    
    titleDisplay.append(titleElement);
}
