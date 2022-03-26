const scoreElement = document.getElementById("score");
const highScoreElement = document.getElementById("high-score");
const blocksContainerElement = document.getElementById("blocks");
const buttonElement = document.getElementsByTagName("button")[0];
let blockElements;
const BLOCK_COUNT = 5;
const ANIMATE_COUNT = 3;

function generateRandomList() {
  const l = [];
  for (let i = 0; i < ANIMATE_COUNT; i++) {
    l[i] = Math.floor(Math.random() * BLOCK_COUNT);
  }
  return l;
}

let score = 0;
let highScore = 0;
let state = "INIT"; // "ANIMATE", "TEST"
let testAttempt = 0;
let randList;

function renderBlocks() {
  blocksContainerElement.replaceChildren();
  let block;
  for (let b = 0; b < BLOCK_COUNT; b++) {
    block = document.createElement("div");
    block.classList.add("block");
    block.dataset.blockId = b;
    block.style.width = `${100 / BLOCK_COUNT}%`;
    blocksContainerElement.append(block);
  }
  randList = generateRandomList();
  blockElements = document.getElementsByClassName("block");
  console.log(randList);
}

async function blink(blcEle) {
  blcEle.style.backgroundColor = "red";
  return new Promise((resolve) => {
    setTimeout(function () {
      blcEle.style.backgroundColor = "aquamarine";
      resolve();
    }, 200);
  });
}

async function animate() {
  let currAnimation = 0;
  await blink(blockElements[randList[currAnimation]]);
  const interval = setInterval(async function () {
    currAnimation += 1;
    await blink(blockElements[randList[currAnimation]]);
    if (currAnimation === ANIMATE_COUNT - 1) {
      clearInterval(interval);
      state = "TEST";
    }
  }, 1000);
}

renderBlocks();

buttonElement.onclick = function (event) {
  if (state == "INIT") {
    buttonElement.disabled = true;
    state = "ANIMATE";
    animate();
  }
};

blocksContainerElement.addEventListener("click", function (event) {
  if (state == "TEST") {
    const currBlock = event.target;
    console.log(Number(currBlock.dataset.blockId));
    if (Number(currBlock.dataset.blockId) === randList[testAttempt]) {
      testAttempt += 1;
      if (testAttempt === ANIMATE_COUNT) {
        testAttempt = 0;
        renderBlocks();
        score++;
        highScore = Math.max(highScore, score);
        highScoreElement.textContent = highScore;
        scoreElement.textContent = score;
        animate();
      }
    } else {
      testAttempt = 0;
      state = "INIT";
      renderBlocks();
      buttonElement.disabled = false;
      score = 0;
      scoreElement.textContent = score;
      this.classList.add("shake");
      setTimeout(() => {
        this.classList.remove("shake");
      }, 200);
    }
  }
});
