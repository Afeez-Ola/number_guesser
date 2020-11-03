// UI variables
let body = document.querySelector('body');
let container = document.querySelector('.container');
let game = document.getElementById('game');
let minVal = document.querySelector('.min-num');
let maxVal = document.querySelector('.max-num');
let guessInput = document.querySelector('#guess-input');
let guessBtn = document.querySelector('#guess-btn');
let message = document.querySelector('.message');
let header = document.querySelector('h1');
let note = document.querySelector('#game p');

let min = 1,
    max = 10;

let winningNum = Math.floor(Math.random() * max + 1);
let guessesLeft = 3;

// CSS designs
minVal.textContent = min;
maxVal.textContent = max;
container.style.width = '40%';
container.style.paddingTop = '40px';
container.style.paddingBottom = '40px';
container.style.margin = '100px auto';
header.style.fontFamily = 'Montserrat';
body.style.textAlign = 'center';
container.style.backgroundColor = '#0abf53';
container.style.color = '#00112c';
guessInput.style.borderRadius = '24px';
guessBtn.style.padding = '.3rem .9rem';
guessInput.style.padding = '.3rem .9rem';
guessBtn.style.borderRadius = '16px';
guessBtn.style.color = 'white';
note.style.fontFamily = 'montserrat';

guessBtn.addEventListener('click', guessValid);
game.addEventListener('mousedown', function(e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
});

function guessValid(e) {
    let userVal = parseInt(guessInput.value);
    console.log(winningNum);

    if (isNaN(userVal) || userVal < min || userVal > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }
    if (userVal === winningNum) {
        gameOver(
            true,
            `Congratulations, the correct answer is ${winningNum}`,
            'green'
        );
    } else {
        guessesLeft -= 1;

        if (guessesLeft === 0) {
            gameOver(false, `You Lost!, the correct answer was ${winningNum}`);
        } else {
            guessInput.style.borderColor = 'red';
            guessInput.value = '';
            setMessage(`${userVal} is incorrect. ${guessesLeft} guess left.`, 'red');
        }
    }

    function gameOver(won, msg) {
        let color;
        won == true ? (color = 'green') : (color = 'red');

        guessInput.disabled = true;
        guessInput.style.borderColor = color;
        setMessage(msg, color);
        guessBtn.value = 'Play again';
        guessBtn.className += 'play-again';
    }
}

function setMessage(msg, color) {
    message.textContent = msg;
    message.style.color = color;
}