const pauseBtn = document.querySelector(".pause-btn");
const playBtn = document.querySelector(".play-btn");
const gameOverSound = document.querySelector(".game-over-sound");
const mainSound = document.querySelector(".main-sound");
const mainScore = document.querySelector(".score");
const tryAgainBtn = document.querySelector(".try-again-btn");
const gameOverModal = document.querySelector(".game-over-modal");
const highScore = document.querySelector(".high-score")
const block = document.getElementById("block");
const character = document.getElementById("character");
const finalScore = document.querySelector(".final-score");

let counter = 0;
mainScore.textContent = counter;
highScore.textContent = localStorage.getItem('highScore') || 0;


window.addEventListener("load", function () {
  mainSound.value = 60;
});



document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    moveLeft();
  }
  if (event.key === "ArrowRight") {
    moveRight();
  }
});


function moveLeft() {
  let left = parseInt(
    window.getComputedStyle(character).getPropertyValue("left")
  );
  left -= 100;
  if (left >= 0) {
    character.style.left = left + "px";
  }
  mainSound.play();
}
function moveRight() {
  let left = parseInt(
    window.getComputedStyle(character).getPropertyValue("left")
  );
  left += 100;
  if (left < 300) {
    character.style.left = left + "px";
  }
  mainSound.play();
}


block.addEventListener("animationiteration", () => {
  var random = Math.floor(Math.random() * 3);
  left = random * 100;
  block.style.left = left + "px";
  mainScore.textContent = counter++ + 1;
  
  if(parseInt(mainScore.textContent) > parseInt(highScore.textContent)) {
    highScore.textContent = parseInt(mainScore.textContent)
  }
  
  if (counter >= 15) {
    block.style.animationDuration = ".9s";
    block.style.animationDelay = "1s";
  } if (counter >= 30) {
    block.style.animationDuration = ".7s";
    block.style.animationDelay = "1s";
  } if (counter >= 50) {
    block.style.animationDuration = ".6s";
    block.style.animationDelay = "1s";
  } if (counter >= 80) {
    block.style.animationDuration = ".5s";
  }
    
});

setInterval(function () {
  let characterLeft = parseInt(
    window.getComputedStyle(character).getPropertyValue("left")
  );
  let blockLeft = parseInt(
    window.getComputedStyle(block).getPropertyValue("left")
  );
  let blockTop = parseInt(
    window.getComputedStyle(block).getPropertyValue("top")
  );
  if (characterLeft == blockLeft && blockTop < 750 && blockTop > 450) {
    gameOverModal.classList.add("active");
    block.style.animation = "none";
    block.style.top = "550px"
    character.classList.add("active");
    block.classList.add("active");
    mainSound.pause();
    gameOverSound.play();
    localStorage.setItem('highScore', highScore.textContent)
    finalScore.textContent = `your score: ${counter}`;
    setTimeout(function () {
      gameOverSound.pause();
    }, 1500)
  }
}, 1);


function paused() {
  block.style.animationPlayState = "paused";
  mainSound.pause();
  gameOverSound.pause();
  playBtn.classList.add("offline");
}

function played() {
  block.style.animationPlayState = "running";
  mainSound.play();
  playBtn.classList.remove("offline");
}

document.getElementById("right").addEventListener("touchstart", moveRight);
document.getElementById("left").addEventListener("touchstart", moveLeft);

tryAgainBtn.addEventListener("click", function () {
  location.reload();
  gameOverModal.classList.remove("active");
});