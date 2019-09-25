import "./styles.css";

//Global variables. Yes, they are allowed :D
let playerID = 2, //2 == X, 3 == O
  width = 0, //Width of the timerbar
  myTime,
  myInter,
  winner = 0;

//Checks that page has loaded. When loaded initializes code.
if (document.readyState !== "loading") {
  // Document ready, executing
  console.log("Document ready, executing");
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function() {
    //body.appendChild(tbl); // Document was not ready, executing when loaded
    console.log("Document ready, executing after a wait");
    initializeCode();
  });
}

function initializeCode() {
  console.log("Initializing");
  var board = document.getElementById("board");
  generatetable(board);
  timer();
  timerbar();
}

//Places values in the gameboard based on player number
function placeval() {
  var board = document.getElementById("board");
  if (this.innerHTML === "") {
    if (playerID % 2 === 0 && this.innerHTML !== "O") {
      this.innerHTML = "X";
      playerID = playerID + 1;
      this.style.backgroundColor = "rgb(124, 252, 0)";
      cleartimer();
      clearbar();
      timer();
      timerbar();
    } else if (playerID % 2 !== 0 && this.innerHTML !== "X") {
      this.innerHTML = "O";
      playerID = playerID - 1;
      this.style.backgroundColor = "rgb(250, 128, 114)";
      cleartimer();
      clearbar();
      timer();
      timerbar();
    }
  }
  winner = winCheck(board);
  if (winner === true || winner === false) {
    clearbar();
    restart(board);
    timer();
    timerbar();
  }
}

function resettimers() {
  cleartimer();
  clearbar();
  timer();
  timerbar();
}

function timer() {
  myTime = setTimeout(function() {
    if (playerID % 2 === 0) {
      playerID = playerID + 1;
    } else if (playerID % 2 !== 0) {
      playerID = playerID - 1;
    }

    resettimers();
  }, 10000);
}

function cleartimer() {
  clearTimeout(myTime);
}

function timerbar() {
  myInter = setInterval(function() {
    var elem = document.getElementById("timer");
    if (width === 100) {
    } else {
      width = width + 1;
      elem.style.width = width + "%";
    }
  }, 100);
}

function clearbar() {
  clearInterval(myInter);
  var elem = document.getElementById("timer");
  width = 0;
  elem.style.width = width;
}

//Checks for winners
function winCheck(board) {
  //Check rows
  for (var i = 0; i < 5; i++) {
    if (
      document.getElementById(i + "," + 0).innerHTML === "X" &&
      document.getElementById(i + "," + 1).innerHTML === "X" &&
      document.getElementById(i + "," + 2).innerHTML === "X" &&
      document.getElementById(i + "," + 3).innerHTML === "X" &&
      document.getElementById(i + "," + 4).innerHTML === "X"
    ) {
      alert("Player 1 won!");
      return true;
    } else if (
      document.getElementById(i + "," + 0).innerHTML === "O" &&
      document.getElementById(i + "," + 1).innerHTML === "O" &&
      document.getElementById(i + "," + 2).innerHTML === "O" &&
      document.getElementById(i + "," + 3).innerHTML === "O" &&
      document.getElementById(i + "," + 4).innerHTML === "O"
    ) {
      alert("Player 2 won!");
      return true;
    }
  }

  //Check columns
  for (let j = 0; j < 5; j++) {
    if (
      document.getElementById(0 + "," + j).innerHTML === "X" &&
      document.getElementById(1 + "," + j).innerHTML === "X" &&
      document.getElementById(2 + "," + j).innerHTML === "X" &&
      document.getElementById(3 + "," + j).innerHTML === "X" &&
      document.getElementById(4 + "," + j).innerHTML === "X"
    ) {
      alert("Player 1 won!");
      return true;
    } else if (
      document.getElementById(0 + "," + j).innerHTML === "O" &&
      document.getElementById(1 + "," + j).innerHTML === "O" &&
      document.getElementById(2 + "," + j).innerHTML === "O" &&
      document.getElementById(3 + "," + j).innerHTML === "O" &&
      document.getElementById(4 + "," + j).innerHTML === "O"
    ) {
      alert("Player 2 won!");
      return true;
    }
  }

  //Check diagonals
  if (
    document.getElementById(0 + "," + 0).innerHTML === "X" &&
    document.getElementById(1 + "," + 1).innerHTML === "X" &&
    document.getElementById(2 + "," + 2).innerHTML === "X" &&
    document.getElementById(3 + "," + 3).innerHTML === "X" &&
    document.getElementById(4 + "," + 4).innerHTML === "X"
  ) {
    alert("Player 1 won!");
    return true;
  } else if (
    document.getElementById(0 + "," + 0).innerHTML === "O" &&
    document.getElementById(1 + "," + 1).innerHTML === "O" &&
    document.getElementById(2 + "," + 2).innerHTML === "O" &&
    document.getElementById(3 + "," + 3).innerHTML === "O" &&
    document.getElementById(4 + "," + 4).innerHTML === "O"
  ) {
    alert("Player 2 won!");
    return true;
  } else if (
    document.getElementById(4 + "," + 0).innerHTML === "X" &&
    document.getElementById(3 + "," + 1).innerHTML === "X" &&
    document.getElementById(2 + "," + 2).innerHTML === "X" &&
    document.getElementById(1 + "," + 3).innerHTML === "X" &&
    document.getElementById(0 + "," + 4).innerHTML === "X"
  ) {
    alert("Player 1 won!");
    return true;
  } else if (
    document.getElementById(4 + "," + 0).innerHTML === "O" &&
    document.getElementById(3 + "," + 1).innerHTML === "O" &&
    document.getElementById(2 + "," + 2).innerHTML === "O" &&
    document.getElementById(1 + "," + 3).innerHTML === "O" &&
    document.getElementById(0 + "," + 4).innerHTML === "O"
  ) {
    alert("Player 2 won!");
    return true;
  }

  //Checks if board is full
  if (hasSpace(board) !== true) {
    alert("Draw!");
    return false;
  }
}

//Checks if board as any empty cells. If empty cells exists returns true
function hasSpace(board) {
  if (board != null) {
    for (let i = 0; i < 5; i++) {
      for (var j = 0; j < 5; j++) {
        if (document.getElementById(i + "," + j).innerHTML === "") {
          return true;
        }
      }
    }
  }
}

//Generates A 5x5 table
function generatetable(board) {
  for (let i = 0; i < 5; i++) {
    let row = document.createElement("tr");
    board.append(row);
    for (var j = 0; j < 5; j++) {
      if (i === 5 && j === 5) {
        break;
      } else {
        let cell = document.createElement("td");
        cell.setAttribute("id", i + "," + j);
        cell.addEventListener("click", placeval);
        row.appendChild(cell);
      }
    }
  }
}

//Clears the board of any values and sets cell background colour as white
function restart(board) {
  if (board != null) {
    for (let i = 0; i < 5; i++) {
      for (var j = 0; j < 5; j++) {
        document.getElementById(i + "," + j).innerHTML = "";
        document.getElementById(i + "," + j).style.backgroundColor = "white";
      }
    }
    return;
  }
}
