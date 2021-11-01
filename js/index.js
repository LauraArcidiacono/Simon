/* eslint-disable no-console */
let order = [];
let playerOrder = [];
let flash;
let turn;
let good;
let computerTurn;
let intervalId;
let strict = false;
let noise = true;
let on = false;
let win;

const turnCounter = document.querySelector('#points__screen');
const topLeft = document.querySelector('#outerCircle__topLeft');
const topRight = document.querySelector('#outerCircle__topRight');
const bottomLeft = document.querySelector('#outerCircle__bottomLeft');
const bottomRight = document.querySelector('#outerCircle__bottomRight');
const strictButton = document.querySelector('#switch__strict');
const onButton = document.querySelector('#switch__on');
const startButton = document.querySelector('#innerCircle__start');

function one() {
  if (noise) {
    const audio = document.getElementById('audio__clip1');
    audio.play();
  }
  noise = true;
  topLeft.style.backgroundColor = 'lightgreen';
}

function two() {
  if (noise) {
    const audio = document.getElementById('audio__clip2');
    audio.play();
  }
  noise = true;
  topRight.style.backgroundColor = 'tomato';
}

function three() {
  if (noise) {
    const audio = document.getElementById('audio__clip3');
    audio.play();
  }
  noise = true;
  bottomLeft.style.backgroundColor = 'yellow';
}

function four() {
  if (noise) {
    const audio = document.getElementById('audio__clip4');
    audio.play();
  }
  noise = true;
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
  on = false;
  win = true;
}

function gameTurn() {
  on = false;

  if (flash === turn) {
    clearInterval(intervalId);
    computerTurn = false;
    clearColor();
    on = true;
  }

  if (computerTurn) {
    clearColor();
    setTimeout(() => {
      if (order[flash] === 1) one();
      if (order[flash] === 2) two();
      if (order[flash] === 3) three();
      if (order[flash] === 4) four();
      flash += 1;
    }, 200);
  }
}

function play() {
  win = false;
  order = [];
  playerOrder = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  turnCounter.innerHTML = 1;
  good = true;
  for (let round = 0; round < 20; round += 1) {
    order.push(Math.floor(Math.random() * 4) + 1);
  }
  computerTurn = true;

  intervalId = setInterval(gameTurn, 800);
}

function check() {
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1]) {
    good = false;
  }
  if (playerOrder.length === 20 && good) {
    winGame();
  }
  if (good === false) {
    flashColors();
    turnCounter.innerHTML = 'No!';
    setTimeout(() => {
      turnCounter.innerHTML = turn;
      clearColor();

      if (strict) {
        play();
      } else {
        computerTurn = true;
        flash = 0;
        playerOrder = [];
        good = true;
        intervalId = setInterval(gameTurn, 800);
      }
    }, 800);
    noise = false;
  }

  if (turn === playerOrder.length && good && !win) {
    turn += 1;
    playerOrder = [];
    computerTurn = true;
    flash = 0;
    turnCounter.innerHTML = turn;
    intervalId = setInterval(gameTurn, 800);
  }
}

topLeft.addEventListener('click', () => {
  if (on) {
    playerOrder.push(1);
    check();
    one();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

topRight.addEventListener('click', () => {
  if (on) {
    playerOrder.push(2);
    check();
    two();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

bottomLeft.addEventListener('click', () => {
  if (on) {
    playerOrder.push(3);
    check();
    three();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

bottomRight.addEventListener('click', () => {
  if (on) {
    playerOrder.push(4);
    check();
    four();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

strictButton.addEventListener('click', () => {
  if (strictButton.checked) {
    strict = true;
  } else {
    strict = false;
  }
});

onButton.addEventListener('click', () => {
  if (onButton.checked) {
    on = true;
    turnCounter.innerHTML = '-';
  } else {
    on = false;
    turnCounter.innerHTML = '';
    clearColor();
    clearInterval(intervalId);
  }
});

startButton.addEventListener('click', () => {
  if (on || win) {
    play();
  }
});
