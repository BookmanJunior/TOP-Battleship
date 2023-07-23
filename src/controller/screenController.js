import GameController from "./gameController";
import BoardView from "../view/boardView";
import ShipView from "../view/shipView";
import GeneralView from "../view/generalView";
import { generateAttackCoordinates } from "../modules/coordinateGenerator";

const screenController = () => {
  const game = GameController();
  const boardView = BoardView();
  const shipView = ShipView(game.currentBoard);
  const generalView = GeneralView();

  document.body.addEventListener("mouseover", (e) => {
    if (!e.target.matches(".square") || game.state !== "placing-ship") {
      return;
    }
    if (isTheRightBoard(e.target)) return;

    shipView.highlightShipCoordinates(e.target);
  });

  document.body.addEventListener("mouseout", (e) => {
    if (!e.target.matches(".square") || game.state !== "placing-ship") return;

    shipView.removeShipCoordinatesHighlight(e.target);
  });

  document.body.addEventListener("click", (e) => {
    if (
      !e.target.matches(".square") ||
      game.state !== "placing-ship" ||
      !!isTheRightBoard(e.target)
    )
      return;

    shipView.placeShip(e.target);

    // start game when all ships have been placed
    if (game.isReadyToStart() && game.mode === "ai") {
      game.changeState();
      // set current board to player2 to display attack correctly
      game.changeCurrentBoard();
    }
  });

  document.body.addEventListener("click", (e) => {
    if (e.target.matches(".restart-game") && game.state === "gameover") {
      restartGame();
    }
  });

  document.body.addEventListener("keydown", (e) => {
    if (game.state !== "placing-ship") return;

    shipView.changeShipPlacement(e);
  });

  document.body.addEventListener("click", (e) => {
    if (!e.target.matches(".square")) return;

    play(e.target);
  });

  function restartGame() {
    generalView.resetScreen();
    game.restartGame();
    init();
  }

  function init() {
    game.player2Gameboard.randomizeShipPlacement();
    boardView.renderBoard(game.player1Gameboard, "player1");
    boardView.renderBoard(game.player2Gameboard, "player2");
  }

  function play(square) {
    const coordinates = parseSquareCoordinates(square);

    if (
      game.state !== "playing" ||
      square.dataset.status !== "none" ||
      !isTheRightBoard(square)
    )
      return;

    makeTurn(game.currentBoard, square, coordinates);
  }

  function makeTurn(board, square, coordinates) {
    const attackedSquare = game.playRound(coordinates);
    boardView.updateAttackedSquare(board, square, attackedSquare);

    if (game.state === "gameover") {
      generalView.displayWinner(game.winner());
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

  return {
    init,
  };
};

export default screenController;
