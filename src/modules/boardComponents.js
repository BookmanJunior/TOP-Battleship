const Board = (boardObj, player) => {
  const boardNotation = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    E: 5,
    F: 6,
    G: 7,
    H: 8,
    I: 9,
    J: 10,
  };

  function createGameboardComponents() {
    const gameboardWrapper = document.createElement("div");

    gameboardWrapper.classList.add("gameboard-wrapper");

    const fleetSign = createFleetSign(player);
    const rowNumDiv = createRowNumeration();
    const columnLettersDiv = createColumnLetter();
    const gameBoard = createGameBoard();

    gameboardWrapper.append(fleetSign, rowNumDiv, columnLettersDiv, gameBoard);

    return gameboardWrapper;
  }

  function createGameBoard() {
    const gameBoardDiv = document.createElement("div");
    gameBoardDiv.classList.add(`${player}-gameboard`, "gameboard");

    boardObj.board.forEach((row, rowIndex) => {
      const rowDiv = document.createElement("div");
      rowDiv.classList.add("row");

      row.forEach((square, squareIndex) => {
        const squareDiv = document.createElement("div");
        squareDiv.classList.add("square");
        squareDiv.dataset.coordinates = [rowIndex, squareIndex];
        squareDiv.dataset.status = "none";
        squareDiv.dataset.occupied = "empty";
        rowDiv.appendChild(squareDiv);
      });
      gameBoardDiv.appendChild(rowDiv);
    });

    return gameBoardDiv;
  }

  function createFleetSign() {
    const fleetSign = document.createElement("div");
    fleetSign.classList.add(`${player}-fleet`, "fleet-sign");

    fleetSign.textContent = fleetSign.classList.contains("player1-fleet")
      ? "Your Fleet"
      : "Opponent";

    return fleetSign;
  }

  function createRowNumeration() {
    const rowNumDiv = document.createElement("div");

    rowNumDiv.classList.add("row-numeration");

    for (const num of Object.values(boardNotation)) {
      const rowNum = document.createElement("p");
      rowNum.textContent = num;
      rowNumDiv.appendChild(rowNum);
    }
    return rowNumDiv;
  }

  function createColumnLetter() {
    const columnDiv = document.createElement("div");

    columnDiv.classList.add("column-letters");

    for (const letter of Object.keys(boardNotation)) {
      const columnLetter = document.createElement("p");
      columnLetter.textContent = letter;
      columnDiv.appendChild(columnLetter);
    }

    return columnDiv;
  }

  return {
    createGameboardComponents,
  };
};

export default Board;
