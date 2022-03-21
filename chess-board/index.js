const BOARD_SIZE = 8;

const boardElement = document.getElementById("board");

function createCell(color) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.style.backgroundColor = color;
  return cell;
}

function generateGrid(size) {
  const grid = [];
  for (let r = 0; r < size; r++) {
    grid[r] = [];
    for (let c = 0; c < size; c++) {
      let cellColor = (r + c) % 2 ? "black" : "white";
      grid[r][c] = createCell(cellColor);
    }
  }
  return grid;
}

function renderBoard(grid) {
  let rowElement;
  for (let r = 0; r < grid.length; r++) {
    rowElement = document.createElement("div");
    rowElement.classList.add("row");
    boardElement.append(rowElement);
    for (let c = 0; c < grid.length; c++) {
      rowElement.append(grid[r][c]);
    }
  }
}

const grid = generateGrid(BOARD_SIZE);
renderBoard(grid);
