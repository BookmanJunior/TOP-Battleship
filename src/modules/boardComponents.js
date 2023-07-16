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

  return {};
};

export default Board;
