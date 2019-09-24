const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const words = [{
        name: 'pillow',
        category: 'everyday items',
        hint: 'a soft object that you rest your head on in bed'
    },
    {
        name: 'lettuce',
        category: 'vegetables',
        hint: 'a plant with large, green leaves, eaten uncooked in salads'
    },
    {
        name: 'mouse',
        category: 'animals',
        hint: 'a small mammal with short fur, associated with a cat'
    }, {
        name: 'blueberry',
        category: 'fruits',
        hint: 'the dark blue fruit, similar to a bilberry'
    },
    {
        name: 'chair',
        category: 'everyday items',
        hint: 'a seat for one person'
    },
    {
        name: 'bottle',
        category: 'everyday items',
        hint: 'a container for liquids, usually made of glass or plastic'
    },
    {
        name: 'madrid',
        category: 'european capitals',
        hint: 'the capital city of Spain'
    },
    {
        name: 'turtle',
        category: 'animals',
        hint: 'an animal which lives in or near water and has a thick shell'
    },
    {
        name: 'start',
        category: 'activity',
        hint: 'to begin doing something'
    },
    {
        name: 'oxygen',
        category: 'chemistry',
        hint: 'a gas needed to live'
    },
    {
        name: 'mother',
        category: 'family',
        hint: 'a female parent'
    },
    {
        name: 'computer',
        category: 'everyday items',
        hint: 'an electronic machine'
    },
    {
        name: 'football',
        category: 'sport',
        hint: 'a game played between two teams of eleven people'
    },
    {
        name: 'museum',
        category: 'buildings',
        hint: 'a building where you can look at important objects connected with art, history, or science'
    },
    {
        name: 'laboratory',
        category: 'place',
        hint: 'a room used for scientific work'
    },
    {
        name: 'policeman',
        category: 'profession',
        hint: 'a male member of a police force'
    },
    {
        name: 'shark',
        category: 'animals',
        hint: 'a large fish that has sharp teeth and a pointed fin on its back'
    },
    {
        name: 'shopping',
        category: 'activity',
        hint: 'the activity of buying things from shops'
    },
    {
        name: 'warsaw',
        category: 'european capitals',
        hint: 'the capital city of Poland'
    }
];

const alphabetDiv = document.querySelector('.alphabet');
const wrapperAllWord = document.querySelector('.wrapper .word');
const resultDiv = document.querySelector('.result');
const newGameBtn = document.querySelector('.newGame');
const categorySpan = document.querySelector('.categorySpan');
const showHintBtn = document.querySelector('.showHint');
const hintDiv = document.querySelector('.hint');

let word = '';
let color = '';
let livesNumber = 10;
let counter = 0;
let lastNumber = 0;

function renderNumber() {
    let number = Math.floor(Math.random() * words.length);
    return number;
}

function displayWord() {
    number = renderNumber();
    word = words[number].name;
    categorySpan.textContent = words[number].category;
    return word;
}
displayWord();

function start() {
    createAlphabetList();
    createGuessWordSign();
}
start();
// console.log(word, number);
showHintBtn.addEventListener('click', showHint);

function showHint() {
    hintDiv.textContent = `Your hint:   ${words[number].hint}  `;
}

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
            this.style.backgroundColor = '#83975c';
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
    resultDiv.textContent = `You have  ${livesNumber}  lives.`;
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
    letters.forEach(letter => {
        letter.style.backgroundColor = '#31595E';
        letter.style.cursor = 'pointer';
    });
    guessLi.forEach(span => span.textContent = '');
    wrapperAllWord.innerHTML = '';
    hintDiv.textContent = 'Your hint: ';
    displayWord();
    createGuessWordSign();
}