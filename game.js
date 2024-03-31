let gameseq = [];
let playerseq = [];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");
let color = ["red", "green", "blue", "yellow"];

document.addEventListener("keydown", function () {
  if (started == false) {
    console.log("game started");
    started = true;
    levelUp();
  }
});

function levelUp() {
  level += 1;
  h2.innerText = "Level " + level;
  let idx = Math.floor(Math.random() * 3);
  let rdncolor = color[idx];
  let btn = document.querySelector(`.${rdncolor}`);
  flashColor(btn);
  gameseq.push(rdncolor);
}
function flashColor(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 500);
}

function checkSequence() {
  for (let i = 0; i < playerseq.length; i++) {
    if (playerseq[i] !== gameseq[i]) {
      return false;
    }
  }
  return true;
}

function btnclicked() {
  let btn = this;
  flashColor(btn);
  playerseq.push(btn.classList[1]);
  if (!checkSequence()) {
    gameOver();
  } else if (playerseq.length === gameseq.length) {
    playerseq = [];
    setTimeout(levelUp, 1000);
  }
}

function gameOver() {
  h2.innerText = "Game Over! Your Score: " + (level - 1);
  started = false;
  gameseq = [];
  playerseq = [];
  level = 0;
  let container = document.querySelector(".btn-container");
  container.classList.add("over");
  setTimeout(function () {
    container.classList.remove("over");
  }, 500);

  let body = document.querySelector("body");
  body.classList.add("gameover");
}

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
  btn.addEventListener("click", btnclicked);
}
