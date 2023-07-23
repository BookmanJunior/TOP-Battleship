import Board from "../modules/boardComponents";

const BoardView = () => {
  const main = document.getElementById("main");

  const renderBoard = (boardObj, player) => {
    const newGameBoard = Board(boardObj, player);
    main.appendChild(newGameBoard.createGameboardComponents());
  };

  const renderShip = (board, ship) => {
    updateSquare(board, ship.coordinates, "occupied", "ship");
  };

  const renderFog = (board, ship) => {
    updateSquare(board, ship.adjacentSquares, "status", "fog");
  };

  const updateAttackedSquare = (currentBoard, square, attackResult) => {
    // sunk ship returns array
    if (typeof attackResult === "object") {
      renderShip(currentBoard, attackResult);
      renderFog(currentBoard, attackResult);
      square.dataset.status = "hit";
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
    renderShip,
    updateSquare,
    updateAttackedSquare,
  };
};

export default BoardView;
