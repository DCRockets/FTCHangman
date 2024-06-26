let chosenWord = "";
let displayWord = "";
let wrongGuesses = [];
let correctGuesses = [];

async function fetchTeamNames() {
    try {
        const response = await fetch('/api/team-names');
        const teamNames = await response.json();
        chosenWord = teamNames[Math.floor(Math.random() * teamNames.length)].toUpperCase();
        displayWord = chosenWord.replace(/./g, "_ ");
        document.getElementById('word-display').textContent = displayWord;
    } catch (error) {
        console.error('Error fetching team names:', error);
    }
}

function makeGuess() {
    const guessInput = document.getElementById('guess-input');
    const guess = guessInput.value.toUpperCase();

    if (guess && !wrongGuesses.includes(guess) && !correctGuesses.includes(guess)) {
        if (chosenWord.includes(guess)) {
            correctGuesses.push(guess);
            updateDisplayWord();
        } else {
            wrongGuesses.push(guess);
            document.getElementById('wrong-guesses').textContent = wrongGuesses.join(", ");
        }
    }

    guessInput.value = '';
    checkGameStatus();
}

function updateDisplayWord() {
    let updatedDisplayWord = "";
    for (let char of chosenWord) {
        if (correctGuesses.includes(char)) {
            updatedDisplayWord += char + " ";
        } else {
            updatedDisplayWord += "_ ";
        }
    }
    document.getElementById('word-display').textContent = updatedDisplayWord;
}

function checkGameStatus() {
    if (document.getElementById('word-display').textContent.replace(/\s/g, '') === chosenWord) {
        document.getElementById('message').textContent = "Congratulations! You've guessed the team name!";
        disableInput();
    } else if (wrongGuesses.length >= 6) {
        document.getElementById('message').textContent = `Game Over! The team name was ${chosenWord}.`;
        disableInput();
    }
}

function disableInput() {
    document.getElementById('guess-input').disabled = true;
    document.querySelector('button').disabled = true;
}

document.addEventListener('DOMContentLoaded', fetchTeamNames);
