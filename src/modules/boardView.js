const BoardView = () => {
  const main = document.getElementById("main");
  const modal = document.querySelector("dialog");

  const renderBoard = (boardObj, player) => {
    const gameBoard = boardObj.board;
    const boardDiv = document.createElement("div");
    boardDiv.classList.add(`${player}-gameboard`, "gameboard");

    gameBoard.forEach((row, rowIndex) => {
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
      boardDiv.appendChild(rowDiv);
    });
    main.appendChild(boardDiv);
  };

  const renderShips = (boardObj, playerBoard) => {
    const boardEl = document.querySelector(`.${playerBoard}`);

    boardObj.shipsCoordinates.forEach((square) => {
      const squareEl = boardEl.querySelector(`[data-coordinates="${square}"]`);
      squareEl.dataset.occupied = "ship";
    });
  };

  function getSquares() {
    return [...document.querySelectorAll(".square")];
  }

  function getSquareCoordinates(cell) {
    return cell.dataset.coordinates
      .split(",")
      .map((coordinate) => parseInt(coordinate, 10));
  }

  function displayWinner(msg) {
    openModal();
    const winnerEl = modal.querySelector(".winner");
    winnerEl.textContent = msg;
  }

  function openModal() {
    modal.showModal();
  }

  return {
    renderBoard,
    renderShips,
    getSquares,
    getSquareCoordinates,
    displayWinner,
  };
};

export default BoardView;
