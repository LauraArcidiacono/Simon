let orderOfLights = [];
let playerAnswerOrder = [];
let currentLightPosition;
let currentRound;
let goodAnswer;
let computerTurn;
let intervalId;
let strictGameMode = false;
let emitSound = true;
let gameOn = false;
let playerWin;

const turnCounter = document.querySelector('#points__screen');
const topLeft = document.querySelector('#top__left');
const topRight = document.querySelector('#top__right');
const bottomLeft = document.querySelector('#bottom__left');
const bottomRight = document.querySelector('#bottom__right');
const strictButton = document.querySelector('#switch__strict');
const onButton = document.querySelector('#switch__on');
const startButton = document.querySelector('#innerCircle__start');

function turnOnLightOne() {
  if (emitSound) {
    const audio = document.getElementById('audio__clip1');
    audio.play();
  }
  emitSound = true;
  topLeft.style.backgroundColor = 'lightgreen';
}

function turnOnLightTwo() {
  if (emitSound) {
    const audio = document.getElementById('audio__clip2');
    audio.play();
  }
  emitSound = true;
  topRight.style.backgroundColor = 'tomato';
}

function turnOnLightThree() {
  if (emitSound) {
    const audio = document.getElementById('audio__clip3');
    audio.play();
  }
  emitSound = true;
  bottomLeft.style.backgroundColor = 'yellow';
}

function turnOnLightFour() {
  if (emitSound) {
    const audio = document.getElementById('audio__clip4');
    audio.play();
  }
  emitSound = true;
  bottomRight.style.backgroundColor = 'lightblue';
}

function clearColor() {
  topLeft.style.backgroundColor = 'darkgreen';
  topRight.style.backgroundColor = 'darkred';
  bottomLeft.style.backgroundColor = 'goldenrod';
  bottomRight.style.backgroundColor = 'darkblue';
}

function flashColors() {
  topLeft.style.backgroundColor = 'lightgreen';
  topRight.style.backgroundColor = 'tomato';
  bottomLeft.style.backgroundColor = 'yellow';
  bottomRight.style.backgroundColor = 'lightblue';
}

function winGame() {
  flashColors();
  turnCounter.innerHTML = 'Win!';
  gameOn = false;
  playerWin = true;
}

function gameTurn() {
  gameOn = false;

  if (currentLightPosition === currentRound) {
    clearInterval(intervalId);
    computerTurn = false;
    clearColor();
    gameOn = true;
  }

  if (computerTurn) {
    clearColor();
    setTimeout(() => {
      if (orderOfLights[currentLightPosition] === 1) turnOnLightOne();
      if (orderOfLights[currentLightPosition] === 2) turnOnLightTwo();
      if (orderOfLights[currentLightPosition] === 3) turnOnLightThree();
      if (orderOfLights[currentLightPosition] === 4) turnOnLightFour();
      currentLightPosition += 1;
    }, 200);
  }
}

function resetValues() {
  playerAnswerOrder = [];
  currentLightPosition = 0;
  goodAnswer = true;
}

function play() {
  playerWin = false;
  orderOfLights = [];
  resetValues();
  intervalId = 0;
  currentRound = 1;
  turnCounter.innerHTML = 1;

  for (let round = 0; round < 15; round += 1) {
    orderOfLights.push(Math.floor(Math.random() * 4) + 1);
  }
  computerTurn = true;
  intervalId = setInterval(gameTurn, 800);
}

function check() {
  if (playerAnswerOrder[playerAnswerOrder.length - 1]
    !== orderOfLights[playerAnswerOrder.length - 1]) {
    goodAnswer = false;
  }
  if (playerAnswerOrder.length === 15 && goodAnswer) {
    winGame();
  }
  if (goodAnswer === false) {
    flashColors();
    turnCounter.innerHTML = 'No!';
    setTimeout(() => {
      turnCounter.innerHTML = currentRound;
      clearColor();

      if (strictGameMode) {
        play();
      } else {
        computerTurn = true;
        resetValues();
        intervalId = setInterval(gameTurn, 800);
      }
    }, 800);
    emitSound = false;
  }

  if (currentRound === playerAnswerOrder.length && goodAnswer && !playerWin) {
    currentRound += 1;
    playerAnswerOrder = [];
    currentLightPosition = 0;
    computerTurn = true;
    turnCounter.innerHTML = currentRound;
    intervalId = setInterval(gameTurn, 800);
  }
}
function playerClickAnswer() {
  if (!playerWin) {
    setTimeout(() => {
      clearColor();
    }, 300);
  }
}
topLeft.addEventListener('click', () => {
  if (gameOn) {
    playerAnswerOrder.push(1);
    check();
    turnOnLightOne();
    playerClickAnswer();
  }
});

topRight.addEventListener('click', () => {
  if (gameOn) {
    playerAnswerOrder.push(2);
    check();
    turnOnLightTwo();
    playerClickAnswer();
  }
});

bottomLeft.addEventListener('click', () => {
  if (gameOn) {
    playerAnswerOrder.push(3);
    check();
    turnOnLightThree();
    playerClickAnswer();
  }
});

bottomRight.addEventListener('click', () => {
  if (gameOn) {
    playerAnswerOrder.push(4);
    check();
    turnOnLightFour();
    playerClickAnswer();
  }
});

strictButton.addEventListener('click', () => {
  if (strictButton.checked) {
    strictGameMode = true;
  } else {
    strictGameMode = false;
  }
});

onButton.addEventListener('click', () => {
  if (onButton.checked) {
    gameOn = true;
    turnCounter.innerHTML = '-';
  } else {
    gameOn = false;
    turnCounter.innerHTML = '';
    clearColor();
    clearInterval(intervalId);
  }
});

startButton.addEventListener('click', () => {
  if (gameOn || playerWin) {
    play();
  }
});
