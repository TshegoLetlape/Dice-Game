// Declaring game variables
let scores, currentScore, activePlayer, playing, round;

// Function to initialize the game state
const initializeGame = () => {
  // Initialize game variables
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0; // 0 represents Slytherin, and 1 represents Gryffindor
  playing = true; // Flag to track if the game is still ongoing
  round = 0; // Counter to track the number of rounds played

  // Reset all initial values on the screen
  document.getElementById("p1-current").textContent = "0";
  document.getElementById("p2-current").textContent = "0";
  document.querySelector(".diceUpdate1").textContent = "0";
  document.querySelector(".diceUpdate2").textContent = "0";
  document.getElementById("diceImage").src = "images/Dice-1.png";
  document.querySelector(".container.frst-row").classList.remove("winner");
  document.querySelector(".container.frst-row").classList.remove("active");
};

// Function to switch to the next player
const switchPlayer = () => {
  // Accumulate the current score to the player's total
  scores[activePlayer] += currentScore;
  document.getElementById(`p${activePlayer + 1}-current`).textContent =
    scores[activePlayer];

  // Reset current score and update visuals
  currentScore = 0;

  // Switch active player
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.querySelector(".container.frst-row").classList.toggle("active");

  // Reset dice updates for the next player
  document.querySelector(".diceUpdate1").textContent = "0";
  document.querySelector(".diceUpdate2").textContent = "0";

  // Increment round count
  round++;

  // Check if 6 rounds are over
  if (round >= 6) {
    endGame();
  }
};

// Function to end the game and announce the winner
const endGame = () => {
  playing = false;
  const winner = scores[0] > scores[1] ? "Slytherin 🐍" : "Gryffindor 🦁";
  alert(`${winner} WINS!!`);
};

// Function to handle the roll of the dice
const rollDice = () => {
  if (playing) {
    const dice = Math.floor(Math.random() * 6) + 1;
    currentScore += dice;
    document.getElementById(`p${activePlayer + 1}-current`).textContent =
      currentScore;

    // Update the dice image
    const diceImage = `images/Dice-${dice}.png`;
    document.getElementById("diceImage").src = diceImage;

    // Update the dice result under the respective player
    if (activePlayer === 0) {
      document.querySelector(".diceUpdate1").textContent = dice;
    } else {
      document.querySelector(".diceUpdate2").textContent = dice;
    }
  }
};

// Event listener for the Roll Dice button
document.getElementById("rollDice").addEventListener("click", () => {
  rollDice();
  if (playing) {
    checkGameOver();
  }
});

// Event listener for the Hold button
document.getElementById("hold").addEventListener("click", () => {
  if (playing) {
    switchPlayer();
    checkGameOver();
  }
});

// Event listener for the New Game button
document.getElementById("newGame").addEventListener("click", initializeGame);

// Function to check if the game is over after 6 plays
const checkGameOver = () => {
  if (round >= 6) {
    endGame();
  }
};

// Initialize the game when the page loads
initializeGame();
