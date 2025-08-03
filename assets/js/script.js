let rockBtn = document.querySelector("#rock-btn");
let paperBtn = document.querySelector("#paper-btn");
let scissorsBtn = document.querySelector("#scissors-btn");
const results = document.querySelector("#results");
const humanScoreElement = document.querySelector("#human-score");
const computerScoreElement = document.querySelector("#computer-score");

let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
  const randomStr = Math.floor(Math.random() * 3);

  if (randomStr === 0) {
    return "rock";
  } else if (randomStr === 1) {
    return "paper";
  } else {
    return "scissors";
  }
}

function checkGameOver() {
  if (humanScore >= 5 || computerScore >= 5) {
    const gameOverMessage = document.createElement("p");
    gameOverMessage.classList.add("game-over");

    if (humanScore >= 5) {
      gameOverMessage.textContent = "🎉 GAME OVER - You win the game! 🎉";
    } else {
      gameOverMessage.textContent = "GAME OVER - Computer wins the game!";
    }

    results.appendChild(gameOverMessage);

    rockBtn.disabled = true;
    paperBtn.disabled = true;
    scissorsBtn.disabled = true;

    const resetButton = document.createElement("button");
    resetButton.textContent = "Play Again";
    resetButton.addEventListener("click", resetGame);
    results.appendChild(resetButton);
  }
}

function resetGame() {
  humanScore = 0;
  computerScore = 0;
  humanScoreElement.textContent = "0";
  computerScoreElement.textContent = "0";
  results.innerHTML =
    "<p>Choose rock, paper, or scissor to start a new game!</p>";

  rockBtn.disabled = false;
  paperBtn.disabled = false;
  scissorsBtn.disabled = false;
}

function playRound(event) {
  results.innerHTML = "";

  const humanChoice = this.dataset.choice;
  const computerChoice = getComputerChoice();

  const choicesElement = document.createElement("p");
  choicesElement.classList.add("round-result");
  choicesElement.textContent = `You chose: ${humanChoice} | Computer chose: ${computerChoice}`;
  results.appendChild(choicesElement);

  //   determine the winner
  let roundResult;
  const resultElement = document.createElement("p");
  resultElement.classList.add("round-result");

  if (humanChoice === computerChoice) {
    resultElement.textContent = "It's a tie";
    roundResult = "tie";
  } else if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper")
  ) {
    resultElement.textContent = `You win! ${humanChoice} beats ${computerChoice}`;
    roundResult = "human";
    humanScore++;
    humanScoreElement.textContent = humanScore;
  } else {
    resultElement.textContent = `You lose! ${computerChoice} beats ${humanChoice}`;
    roundResult = "computer";
    computerScore++;
    computerScoreElement.textContent = computerScore;
  }

  results.appendChild(resultElement);

  checkGameOver();
}

rockBtn.addEventListener("click", playRound);
paperBtn.addEventListener("click", playRound);
scissorsBtn.addEventListener("click", playRound);
