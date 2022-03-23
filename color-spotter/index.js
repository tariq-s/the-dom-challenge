const boardElement = document.getElementById("board");
const scoreElement = document.getElementById("score");

let order = 4;
scoreElement.textContent = `Score: ${order - 4}`;

function generateColorSet() {
  const random = Math.floor(Math.random() * 360);
  return {
    main: `hsl(${random}, 20%, 60%)`,
    odd: `hsl(${random}, 20%, 70%)`,
  };
}

function renderGrid(order) {
  boardElement.replaceChildren();
  const oddRow = Math.floor(Math.random() * order);
  const oddCol = Math.floor(Math.random() * order);
  const color = generateColorSet();
  let rowElement;
  for (let r = 0; r < order; r++) {
    rowElement = document.createElement("div");
    rowElement.classList.add("row");
    rowElement.style.height = `${100 / order}%`;
    for (let c = 0; c < order; c++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.style.width = `${100 / order}%`;
      if (r == oddRow && c == oddCol) {
        cell.dataset.type = "odd";
        cell.style.backgroundColor = color.odd;
      } else {
        cell.dataset.type = "main";
        cell.style.backgroundColor = color.main;
      }
      rowElement.append(cell);
    }
    boardElement.append(rowElement);
  }
}

renderGrid(order);

boardElement.addEventListener("click", function (event) {
  const currCell = event.target;
  if (currCell.dataset.type == "odd") {
    order += 1;
    scoreElement.textContent = `Score: ${order - 4}`;
    renderGrid(order);
  } else {
    boardElement.classList.add("shake");
    setTimeout(() => boardElement.classList.remove("shake"), 400);
  }
});
