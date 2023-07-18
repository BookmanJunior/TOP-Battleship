import Board from "./boardComponents";

const BoardView = () => {
  const main = document.getElementById("main");
  const modal = document.querySelector("dialog");

  const renderBoard = (boardObj, player) => {
    const newGameBoard = Board(boardObj, player);
    main.appendChild(newGameBoard.createGameboardComponents());
  };

  const renderShips = (boardObj) => {
    const { shipsCoordinates } = boardObj;

    updateSquare(boardObj, shipsCoordinates, "occupied", "ship");
  };

  const updateAttackedSquare = (currentBoard, square, attackResult) => {
    // sunk ship returns array
    if (Array.isArray(attackResult)) {
      updateSquare(currentBoard, attackResult, "status", "sunk");
      return;
    }

    square.dataset.status = attackResult;
  };

  function updateSquare(playerBoard, squaresToUpdate, dataAtt, status) {
    const boardEl = document.querySelector(`.${playerBoard.name}`);

    squaresToUpdate.forEach((square) => {
      const squareEl = boardEl.querySelector(`[data-coordinates="${square}"]`);
      squareEl.dataset[dataAtt] = status;
    });
  }

  function getSquares() {
    return [...document.querySelectorAll(".square")];
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
    updateAttackedSquare,
    getSquares,
    displayWinner,
  };
};

export default BoardView;
