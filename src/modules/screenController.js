const screenController = () => {
  const renderBoard = (boardObj, renderTarget, player) => {
    const gameBoard = boardObj.board;
    const boardDiv = document.createElement("div");
    boardDiv.classList.add(`${player}-gameboard`);

    gameBoard.forEach((row, rowIndex) => {
      const rowDiv = document.createElement("div");
      rowDiv.classList.add("row");

      row.forEach((square, squareIndex) => {
        const squareDiv = document.createElement("div");
        squareDiv.classList.add("square");
        squareDiv.dataset.coordinates = [rowIndex, squareIndex];
        squareDiv.dataset.hit = "none";
        squareDiv.dataset.occupied = "empty";
        rowDiv.appendChild(squareDiv);
      });
      boardDiv.appendChild(rowDiv);
    });
    renderTarget.appendChild(boardDiv);
  };

  const renderShips = (boardObj, playerBoard) => {
    const boardEl = document.querySelector(`.${playerBoard}`);

    boardObj.shipsCoordinates.forEach((square) => {
      const squareEl = boardEl.querySelector(`[data-coordinates="${square}"]`);
      squareEl.dataset.occupied = "ship";
    });
  };

  return {
    renderBoard,
    renderShips,
  };
};

export default screenController;
