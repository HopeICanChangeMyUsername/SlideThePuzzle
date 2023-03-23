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
let currentPositions = Array.from(allTiles, (tile) => tile.id);
let currentPositions2d = [];
//set num of rows and columns
const numOfRows = 3;
//making the array 2d
// for (let row = 0 ; row<numOfRows;row++)
//   {
//     currentPositions2d[row]=[]

//     for (let col = 0; col <numOfRows ; col++)
//       {

//         currentPositions2d[row][col]=currentPositions[(row*3)+col]
//       }
//   }
console.log(currentPositions);
console.log(currentPositions2d);

for (colorTile of colorTiles) {
  colorTile.addEventListener("click", (event) => {
    let clickedTile = event.target;
    console.log(event.target.getAttribute("data-color"));
    let clickedTileColor = event.target.getAttribute("data-color");
    let blankTile = document.querySelector("div[data-color='gray']");

    console.log(blankTile.getAttribute("data-color"));
    checkIfMoveable(blankTile.id, currentPositions2d);
    //swapping colors
    event.target.setAttribute("data-color", "gray");
    blankTile.setAttribute("data-color", clickedTileColor);
    checkPositions();
    changeIds(clickedTile, blankTile);
    console.log(checkPositions(currentPositions));
  });
  // console.log(colorTile.getAttribute("data-color"))
}

function checkPositions(currentPositions) {
  currentPositions = Array.from(allTiles, (tile) => tile.id);
  //making the array 2d
  for (let row = 0; row < numOfRows; row++) {
    currentPositions2d[row] = [];

    for (let col = 0; col < numOfRows; col++) {
      currentPositions2d[row][col] = currentPositions[row * 3 + col];
    }
  }
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

function checkIfMoveable(blankTileId, currentPositions2d) {
  let index = getIndexBlankTile(blankTileId, currentPositions2d);
  let currentPosition = checkPositions(currentPositions);
  console.log(index);
  //I need to find the index of the id in currentPosition array to check
  // the Ids that are close enough to be moveable
}
function getIndexBlankTile(blankTileId, currentPositions2d) {
  let x;
  let y;
  outer_loop: for (let r = 0; r < currentPositions2d.length; r++) {
    console.log(currentPositions2d[r]);
    for (let c = 0; c < currentPositions2d.length; c++) {
      console.log(currentPositions2d[r][c]);
      if (blankTileId !== currentPositions2d[r][c]) {
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
