"use strict";

let bodyEl;
let hintText;
let secretNumberEl;
let guessInput;
let checkButton;
let againButton;
let scoreEl;
let highScoreEl;

let finished = false;

let secretNumber;

document.addEventListener("DOMContentLoaded", main);

function main() {
    init();
}

function init() {
    initDomElements();
    reset();
    setListeners();
}

function reset() {
    refreshRandomNumber();
    resetValues();
    resetUI();
}

function initDomElements() {
    bodyEl = document.querySelector("body");
    hintText = document.querySelector(".hint");
    secretNumberEl = document.querySelector(".secret-number");
    guessInput = document.querySelector(".guess");
    checkButton = document.querySelector(".btn-check");
    againButton = document.querySelector(".btn-again");
    scoreEl = document.querySelector(".score-value");
    highScoreEl = document.querySelector(".highscore-value");
}

function resetValues() {
    finished = false;
}

function refreshRandomNumber() {
    secretNumber = Math.ceil(Math.random() * 20);
    console.log(`Secret Number: ${secretNumber}`);
}

function resetUI() {
    hideSecretNumber();
    scoreEl.textContent = 20;
    hintText.textContent = "Start guessing...";
    bodyEl.classList.remove("win");
    bodyEl.classList.remove("loss");
    guessInput.classList.remove("win");
    guessInput.classList.remove("loss");
    guessInput.value = "";
    againButton.classList.remove("win-btn");
    againButton.classList.remove("loss-btn");
    checkButton.classList.remove("win-btn");
    checkButton.classList.remove("loss-btn");
    secretNumberEl.classList.remove("secret-number-win");
    secretNumberEl.classList.remove("secret-number-loss");
}

function setListeners() {
    checkButton.addEventListener("click", handleGuess);
    guessInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            handleGuess();
        }
    });
    againButton.addEventListener("click", reset);
}

function handleGuess() {
    if (!finished) {
        const guess = parseInt(guessInput.value);
        console.log(guess);
        if (Number.isInteger(guess)) {
            if (guess == secretNumber) {
                handleCorrectGuess();
            } else {
                handleIncorrectGuess(guess);
            }
        } else {
            handleInvalidGuess();
        }
    }
}

function handleCorrectGuess() {
    finished = true;
    const score = parseInt(scoreEl.textContent);
    const highScore = parseInt(highScoreEl.textContent);
    if (score > highScore) {
        updateHighScore(score);
    }
    updateUIOnWin();
}

function handleInvalidGuess() {
    hintText.textContent = "⛔ Invalid guess!";
}

function handleIncorrectGuess(guess) {
    if (scoreEl.textContent == 1) {
        scoreEl.textContent = 0;
        finished = true;
        updateUIOnLoss();
        return;
    }

    if (guess > secretNumber) {
        hintText.textContent = "📈 Too high!";
    } else {
        hintText.textContent = "📉 Too low!";
    }

    scoreEl.textContent -= 1;
}

function updateUIOnWin() {
    revealSecretNumber();
    hintText.textContent = "🎉 Congratulations! You win!";
    bodyEl.classList.add("win");
    guessInput.classList.add("win");
    againButton.classList.add("win-btn");
    checkButton.classList.add("win-btn");
    secretNumberEl.classList.add("secret-number-win");
}

function updateUIOnLoss() {
    revealSecretNumber();
    hintText.textContent = "💥 You lose!";
    bodyEl.classList.add("loss");
    guessInput.classList.add("loss");
    againButton.classList.add("loss-btn");
    checkButton.classList.add("loss-btn");
    secretNumberEl.classList.add("secret-number-loss");
}

function updateHighScore(newHighScore) {
    highScoreEl.textContent = newHighScore;
}

function revealSecretNumber() {
    secretNumberEl.textContent = secretNumber;
}

function hideSecretNumber() {
    secretNumberEl.textContent = "?";
}
