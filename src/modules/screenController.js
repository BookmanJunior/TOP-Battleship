import GameController from "./gameController";
import BoardView from "./boardView";
import { generateAttackCoordinates } from "./coordinateGenerator";

const screenController = () => {
  const game = GameController();
  const boardView = BoardView();

  game.player1Gameboard.randomizeShipPlacement();
  game.player2Gameboard.randomizeShipPlacement();

  boardView.renderBoard(game.player1Gameboard, "player1");
  boardView.renderBoard(game.player2Gameboard, "player2");
  boardView.renderShips(game.player1Gameboard);
  boardView.renderShips(game.player2Gameboard);

  // set game to playing
  game.changeState();
  // change gameBoard to player2 to display attacks properly
  game.changeCurrentBoard();

  const boardSquares = boardView.getSquares();

  boardSquares.forEach((square) => {
    square.addEventListener("click", play);
  });

  function play(square) {
    const squareInfo = square.target;
    const clickedSquare = squareInfo;
    const coordinates = parseSquareCoordinates(clickedSquare);

    if (game.state !== "playing") return;

    if (squareInfo.dataset.status !== "none") {
      return;
    }

    if (!isTheRightBoard(squareInfo)) {
      return;
    }

    makeTurn(game.currentBoard, squareInfo, coordinates);
  }

  function makeTurn(board, square, coordinates) {
    const attackedSquare = game.playRound(coordinates);
    boardView.updateAttackedSquare(board, square, attackedSquare);

    if (game.state === "gameover") {
      boardView.displayWinner(game.winner());
      return;
    }

    // let ai make turn
    if (game.mode === "ai" && game.currentPlayer === game.player2) {
      const randomCoordinates = generateAttackCoordinates(
        game.player1Gameboard
      );
      const attackedSquareEl = document.querySelector(
        `[data-coordinates="${randomCoordinates}"]`
      );
      makeTurn(game.player1Gameboard, attackedSquareEl, randomCoordinates);
    }
  }

  function isTheRightBoard(square) {
    const gameboardEl = square.closest(".gameboard");
    return (
      (game.currentPlayer === game.player1 &&
        gameboardEl.classList.contains(`player2-gameboard`)) ||
      (game.currentPlayer === game.player2 &&
        gameboardEl.classList.contains(`player1-gameboard`))
    );
  }

  function parseSquareCoordinates(cell) {
    return cell.dataset.coordinates
      .split(",")
      .map((coordinate) => parseInt(coordinate, 10));
  }
};

export default screenController;
