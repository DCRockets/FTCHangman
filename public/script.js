document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/team-names')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(teamNames => {
            if (!Array.isArray(teamNames) || teamNames.length === 0) {
                throw new Error('Team names array is empty or invalid');
            }
            console.log('Fetched team names:', teamNames); // Log the fetched team names to the console
            startGame(teamNames);
        })
        .catch(error => console.error('Error fetching team names:', error));
});

function startGame(teamNames) {
    let randomTeam = teamNames[Math.floor(Math.random() * teamNames.length)];
    if (!randomTeam) {
        console.error('Random team name is undefined or empty');
        return;
    }
    console.log('Selected team name:', randomTeam); // Log the selected team name

    let word = randomTeam.toUpperCase();
    let guessedWord = word.replace(/./g, '_');
    let attempts = 6;

    document.getElementById('word').innerText = guessedWord;
    document.getElementById('attempts').innerText = attempts;

    document.getElementById('submit-guess').addEventListener('click', () => {
        let guess = document.getElementById('guess').value.toUpperCase();
        if (guess.length !== 1) {
            document.getElementById('message').innerText = 'Please enter a single letter.';
            return;
        }

        let newGuessedWord = '';
        let correctGuess = false;

        for (let i = 0; i < word.length; i++) {
            if (word[i] === guess) {
                newGuessedWord += guess;
                correctGuess = true;
            } else {
                newGuessedWord += guessedWord[i];
            }
        }

        guessedWord = newGuessedWord;
        document.getElementById('word').innerText = guessedWord;

        if (!correctGuess) {
            attempts--;
        }

        document.getElementById('attempts').innerText = attempts;
        document.getElementById('guess').value = '';

        if (guessedWord === word) {
            document.getElementById('message').innerText = 'Congratulations! You guessed the team name!';
        } else if (attempts === 0) {
            document.getElementById('message').innerText = `Game over! The team name was ${word}.`;
        }
    });
}
