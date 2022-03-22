const BOARD_SIZE = 10;
const boardElement = document.getElementById("board");

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function createCell() {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  return cell;
}

function createGrid() {
  let rowElement;
  for (let r = 0; r < BOARD_SIZE + 1; r++) {
    rowElement = document.createElement("div");
    rowElement.classList.add("row");
    for (let c = 0; c < BOARD_SIZE; c++) {
      const cell = createCell();
      if (r == BOARD_SIZE) {
        cell.dataset.type = "color-cell";
        cell.style.backgroundColor = getRandomColor();
      } else {
        cell.dataset.type = "board-cell";
      }
      rowElement.append(cell);
    }
    boardElement.append(rowElement);
  }
}

let currColor = "white";
let mouseHold = false;

createGrid();

boardElement.addEventListener("click", function (event) {
  const targetCell = event.target;
  if (targetCell.dataset.type === "board-cell") {
    targetCell.style.backgroundColor = currColor;
  } else if (targetCell.dataset.type === "color-cell") {
    currColor = targetCell.style.backgroundColor;
  }
});

boardElement.addEventListener("mousedown", function (event) {
  mouseHold = true;
});

boardElement.addEventListener("mouseup", function (event) {
  mouseHold = false;
});

boardElement.addEventListener("mousemove", function (event) {
  const targetCell = event.target;
  if (mouseHold && targetCell.dataset.type === "board-cell") {
    targetCell.style.backgroundColor = currColor;
  }
});
