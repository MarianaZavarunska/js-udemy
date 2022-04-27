"use strict";

// const correctNumber = (document.querySelector(".number").textContent = "?");
// const score = document.querySelector(".score");
// score.innerHTML = 20;

// const labelHighscore = document.querySelector(".highscore");
// labelHighscore.textContent = 17;

// const inputValue = document.querySelector(".guess").value;
// // console.log(document.querySelector(".guess").value);

// btn.addEventListener("click", () => {
//   if (inputValue === correctNumber) {
//     document.body.style.backgroundColor = "green";
//     message.innerHTML = "Correct Number";
//   } else if (inputValue > correctNumber) {
//     message.innerHTML = "Too high!";
//     score--;
//   } else if (inputValue < correctNumber) {
//     message.innerHTML = "Too low!";
//     score--;
//   }
// });
const message = document.querySelector(".message");
const btn = document.querySelector(".check");

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const displayMessage = (content) => (message.textContent = content);

btn.addEventListener("click", () => {
  const inputValue = Number(document.querySelector(".guess").value);

  if (!inputValue) {
    displayMessage("No number!");
  } else if (secretNumber === inputValue) {
    displayMessage("Correct Message");
    document.body.style.backgroundColor = "#60b347";
    document.querySelector(".number").textContent = secretNumber;

    if (score > highscore) {
      highscore = score;
      document.querySelector(".highscore").textContent = highscore;
    }
  } else if (inputValue !== secretNumber) {
    if (score > 1) {
      displayMessage(inputValue > secretNumber ? "Too high" : "Too low");
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      displayMessage("You lost the game!");
      document.querySelector(".score").textContent = 0;
    }
  }
});

document.querySelector(".again").addEventListener("click", () => {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  displayMessage("Start guessing ...");
  document.querySelector(".score").textContent = score;
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";
  document.body.style.backgroundColor = "#222";
});
