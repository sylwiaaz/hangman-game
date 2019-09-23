const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const words = ['lettuce', 'mouse', 'pillow', 'blueberry', 'chair', 'bottle', 'madrid', 'turtle', 'start', 'oxygen', 'mother', 'computer', 'football', 'blood', 'winner', 'shark', 'shopping', 'warsaw'];
const alphabetDiv = document.querySelector('.alphabet');
const wrapperAllWord = document.querySelector('.wrapper .word');
const resultDiv = document.querySelector('.result');
const newGameBtn = document.querySelector('.newGame');


let Word = '';
let color = '';
let livesNumber = 10;
let counter = 0;

function renderWord() {
    let number = Math.floor(Math.random() * words.length);
    word = words[number];
    console.log(word);
    return word;
}

word = renderWord();

function start() {
    createAlphabetList();
    createGuessWordSign();
}
start();

function createAlphabetList() {
    let ulList = document.createElement('ul');
    alphabet.forEach(char => {
        let letter = document.createElement('li');
        letter.classList.add('char');
        letter.textContent = char;
        ulList.appendChild(letter);
    });
    alphabetDiv.appendChild(ulList);
}

function createGuessWordSign() {
    for (let i = 0; i < word.length; i++) {
        let liList = document.createElement('li');
        liList.classList.add('guessChar')
        liList.textContent = '';
        wrapperAllWord.appendChild(liList);
    }
}

function getIndexOfGuessChar(index) {
    let indexChar = 0;
    indexChar = index;
    return indexChar;
}

const letters = document.querySelectorAll('.char');

letters.forEach((letter, index) => {
    letter.addEventListener('click', function (e) {
        e.preventDefault();
        if (includeChecker(word, index)) {
            this.style.backgroundColor = '#B0C38D';
        } else {
            this.style.backgroundColor = '#D35B3F';
        }
        this.style.cursor = 'default';
        getIndexOfGuessChar(index);
        letterChecker(index);

    });
});

function includeChecker(word, index) {
    if (word.includes(alphabet[getIndexOfGuessChar(index)])) {
        return true;
    } else {
        return false;
    }
}
let guessLi = document.querySelectorAll('.guessChar');

function letterChecker(index) {
    let guessLi = document.querySelectorAll('.guessChar');
    if (includeChecker(word, index)) {
        for (let i = 0; i < word.length; i++) {
            if (word[i] === (alphabet[getIndexOfGuessChar(index)])) {
                guessLi[i].textContent = word[i];
                counter++;
            }
        }
    } else {
        livesNumber--;
    }
    resultDiv.textContent = `You have ${livesNumber} lives.`;
    getResult();
}

function endGame() {
    livesNumber = 10;
    counter = 0;
    resultDiv.textContent = `You have 10 lives.`;
}

function getResult() {
    if (livesNumber < 1) {
        resultDiv.textContent = 'Game over!';
        
    } else if (counter === word.length) {
        resultDiv.textContent = 'You are winner!';
    }
}

newGameBtn.addEventListener('click', startAgain);

function startAgain() {
    endGame();
    letters.forEach(letter => letter.style.backgroundColor = '#31595E');
    guessLi.forEach(span => span.textContent = '');
    wrapperAllWord.innerHTML = '';
    renderWord();
    createGuessWordSign();
}