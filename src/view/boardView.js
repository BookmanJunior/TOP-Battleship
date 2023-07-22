import Board from "../modules/boardComponents";

const BoardView = () => {
  const main = document.getElementById("main");

  const renderBoard = (boardObj, player) => {
    const newGameBoard = Board(boardObj, player);
    main.appendChild(newGameBoard.createGameboardComponents());
  };

  const renderShips = (boardObj) => {
    const { ships } = boardObj;

    ships.forEach((ship) => {
      updateSquare(boardObj, ship.info.coordinates, "occupied", "ship");
    });
  };

  const updateAttackedSquare = (currentBoard, square, attackResult) => {
    // sunk ship returns array
    if (typeof attackResult === "object") {
      updateSquare(currentBoard, attackResult.coordinates, "status", "sunk");
      updateSquare(currentBoard, attackResult.adjacentSquares, "status", "fog");
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

  return {
    renderBoard,
    renderShips,
    updateSquare,
    updateAttackedSquare,
  };
};

export default BoardView;
