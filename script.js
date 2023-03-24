// let initBlankTile=document.querySelector(".grey")
// let colorTile=document.querySelector(".yellow")
let colorTiles = document.querySelectorAll("div[data-color]");
let correctPositions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
let re = /[0-9]/;
let allTiles = document.querySelectorAll(".puzzle div:not(.col)");
const numOfRows = 3;

let initialPositions2d = getPositions();
console.log(`the initial positions are`, initialPositions2d);

//adding click event
for (colorTile of colorTiles) {
  colorTile.addEventListener("click", (event) => {
    let clickedTile = event.target;
    let clickedTileColor = event.target.getAttribute("data-color");
    let blankTile = document.querySelector("div[data-color='gray']");
    let currentPositions2d = getPositions();
    console.log(blankTile.getAttribute("data-color"));
    if (checkIfNext(blankTile.id, clickedTile.id, currentPositions2d)) {
      //swapping colors
      event.target.setAttribute("data-color", "gray");
      blankTile.setAttribute("data-color", clickedTileColor);
      getPositions();
      changeIds(clickedTile, blankTile);
    }
    checkWinCondition(getPositions(), correctPositions);
  });
  // console.log(colorTile.getAttribute("data-color"))
}

function getPositions() {
  let currentPositions = Array.from(allTiles, (tile) => tile.id);
  let currentPositions2d = [];
  //making the array 2d
  for (let row = 0; row < numOfRows; row++) {
    currentPositions2d[row] = [];

    for (let col = 0; col < numOfRows; col++) {
      currentPositions2d[row][col] = currentPositions[row * 3 + col];
    }
  }
  console.log("currentPositions2d", currentPositions2d);
  return currentPositions2d;
}

function changeIds(clickedTile, blankTile) {
  let placeholderId = clickedTile.id;
  let placeholderText = clickedTile.textContent;
  clickedTile.id = blankTile.id;
  blankTile.id = placeholderId;
  clickedTile.textContent = blankTile.textContent;
  blankTile.textContent = placeholderText;
}

function checkIfNext(blankTileId, clickedTileId, currentPositions) {
  let indexBlankTile = getTileIndex(blankTileId, currentPositions);
  let indexClickedTile = getTileIndex(clickedTileId, currentPositions);
  let [xB, yB] = indexBlankTile;
  let [xC, yC] = indexClickedTile;

  console.log("index of blank tile", indexBlankTile);
  console.log("index of clicked tile", indexClickedTile);
  if (
    (xC === xB && yC === yB + 1) ||
    (xC === xB && yC === yB - 1) ||
    (xC === xB + 1 && yC === yB) ||
    (xC === xB - 1 && yC === yB)
  ) {
    console.log("tile is next to blank tile and can be moved");
    return true;
  } else {
    console.log("tile cant be moved");
    return false;
  }
  //I need to find the index of the id in currentPosition array to check
  // the Ids that are close enough to be moveable this means
}
function getTileIndex(TileId, currentPositions2d) {
  let x;
  let y;
  outer_loop: for (let r = 0; r < currentPositions2d.length; r++) {
    console.log(currentPositions2d[r]);
    for (let c = 0; c < currentPositions2d.length; c++) {
      console.log(currentPositions2d[r][c]);
      if (TileId !== currentPositions2d[r][c]) {
        continue;
      }
      console.log(r, c);
      x = r;
      y = c;
      return [x, y];
      break outer_loop;
    }
  }
}
// colorTiles.addEventListener("click",(event)=>{
//   colorTile.classList.remove("yellow");
//   colorTile.classList.add("grey")
//   initBlankTile.classList.remove("grey")
//   initBlankTile.classList.add("yellow")
// })

function checkWinCondition(currentTilesPositions, correctPositions) {
  console.log(currentTilesPositions.join());
  console.log(correctPositions.join());

  if (currentTilesPositions.join() === correctPositions.join()) {
    console.log("game won");
    alert("game won");
    //TODO remover as bordas
    //TODOremover o clique
    return true;
  } else {
    console.log("game not won yet");
    return false;
  }
}

//TODO Randomize tile positions
//TODO check if game is winnable
