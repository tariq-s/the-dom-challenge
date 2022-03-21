const BOARD_SIZE = 8;

const boardElement = document.getElementById("board");

function createCell(rowId, colId, color) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.dataset.row = rowId;
  cell.dataset.col = colId;
  cell.style.backgroundColor = color;
  return cell;
}

function generateGrid(size) {
  let grid = [];
  for (let r = 0; r < size; r++) {
    grid[r] = [];
    for (let c = 0; c < size; c++) {
      let cellColor = (r + c) % 2 ? "black" : "white";
      grid[r][c] = createCell(r, c, cellColor);
    }
  }
  return grid;
}

function resetGrid(grid) {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid.length; c++) {
      let cellColor = (r + c) % 2 ? "black" : "white";
      grid[r][c].style.backgroundColor = cellColor;
    }
  }
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

function selectDiagonals(grid, { r, c }) {
  const selectionColor = "red";
  grid[r][c].style.backgroundColor = selectionColor;

  let row, col;
  for (row = r - 1, col = c + 1; row >= 0 && col < grid.length; row--, col++) {
    grid[row][col].style.backgroundColor = selectionColor;
  }
  for (
    row = r + 1, col = c + 1;
    row < grid.length && col < grid.length;
    row++, col++
  ) {
    grid[row][col].style.backgroundColor = selectionColor;
  }
  for (row = r + 1, col = c - 1; row < grid.length && col >= 0; row++, col--) {
    grid[row][col].style.backgroundColor = selectionColor;
  }
  for (row = r - 1, col = c - 1; row >= 0 && col >= 0; row--, col--) {
    grid[row][col].style.backgroundColor = selectionColor;
  }
}

function handleCellClick(event) {
  const cell = event.target;
  const cellPosition = {
    r: +cell.dataset.row,
    c: +cell.dataset.col,
  };
  resetGrid(grid);
  selectDiagonals(grid, cellPosition);
}

boardElement.addEventListener("click", handleCellClick);

const grid = generateGrid(BOARD_SIZE);
renderBoard(grid);
