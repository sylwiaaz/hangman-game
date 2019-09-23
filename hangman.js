const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const words = ['lettuce', 'mouse', 'pillow', 'dirty dancing', 'cos', 'something', 'anything'];
const alphabetDiv = document.querySelector('.alphabet');
const wrapperAllWord = document.querySelector('.wrapper .word');

const numberSpan = document.querySelector('.livesNumber');


let word = '';
let color = '';
let counter = 10;

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
        letter.classList.add('guessChar');
        letter.textContent = char;
        ulList.appendChild(letter);
    });
    alphabetDiv.appendChild(ulList);
}

function createGuessWordSign() {
    for (let i = 0; i < word.length; i++) {
        let span = document.createElement('span');
        span.textContent = '';
        wrapperAllWord.appendChild(span);
    }
}




function getIndexOfGuessChar(index) {
    let indexChar = 0;
    indexChar = index;
    return indexChar;
}

const letters = document.querySelectorAll('.guessChar');

letters.forEach((letter, index) => {
    letter.addEventListener('click', function (e) {
        e.preventDefault();
        if (includeChecker(word, index)) {
            this.style.backgroundColor = 'green';
        } else {
            this.style.backgroundColor = 'red';
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

function letterChecker(index) {
    let span = document.querySelectorAll('span');
    if (includeChecker(word, index)) {
        for (let i = 0; i < word.length; i++) {
            if (word[i] === (alphabet[getIndexOfGuessChar(index)])) {
                span[i].textContent = word[i];
            }
        }
    } else {
        counter--;

    }
    numberSpan.textContent = `${counter}`;
}