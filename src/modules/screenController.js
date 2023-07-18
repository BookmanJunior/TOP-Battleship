import GameController from "./gameController";
import BoardView from "./boardView";
import { generateAttackCoordinates } from "./coordinateGenerator";

const screenController = () => {
  const game = GameController();
  const boardView = BoardView();

  let cachedSquares = [];

  game.player2Gameboard.randomizeShipPlacement();

  boardView.renderBoard(game.player1Gameboard, "player1");
  boardView.renderBoard(game.player2Gameboard, "player2");
  boardView.renderShips(game.player1Gameboard);
  boardView.renderShips(game.player2Gameboard);

  const boardSquares = boardView.getSquares();

  boardSquares.forEach((square) => {
    square.addEventListener("mouseenter", () => {
      highlightShipCoordinates(square);
    });
  });

  boardSquares.forEach((square) => {
    square.addEventListener("mouseleave", removeShipCoordinatesHighlight);
  });

  boardSquares.forEach((square) => {
    square.addEventListener("click", placeShip);
  });

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

  function placeShip(square) {
    const squareInfo = square.target;
    if (!!isTheRightBoard(squareInfo) || game.state !== "placing-ship") return;

    const squareCoordinates = parseSquareCoordinates(squareInfo);
    if (
      game.currentBoard.placeShip(
        game.currentBoard.getAvailableShips()[0],
        squareCoordinates
      )
    ) {
      cachedSquares.forEach((s) => {
        s.dataset.occupied = "ship";
        s.classList.remove("potential-placement");
      });
      cachedSquares = [];
      game.currentBoard.getAvailableShips().shift();
    }

    // start game when all ships have been placed
    if (game.isReadyToStart() && game.mode === "ai") {
      game.changeState();
      // set current board to player2 to display attack correctly
      game.changeCurrentBoard();
    }
  }

  function highlightShipCoordinates(square) {
    // const squareInfo = square.target;
    if (game.state !== "placing-ship") {
      return;
    }

    if (isTheRightBoard(square)) return;

    const squareCoor = parseSquareCoordinates(square);
    const isValidCoordinatePlacement = game.currentBoard.getNewCoordinates(
      game.currentBoard.getAvailableShips()[0],
      squareCoor
    );
    if (!isValidCoordinatePlacement) {
      square.style.cursor = "not-allowed";
      return;
    }
    isValidCoordinatePlacement.forEach((s) => {
      const squareEl = document.querySelector(`[data-coordinates="${s}"]`);
      squareEl.classList.add("potential-placement");
      cachedSquares.push(squareEl);
    });
  }

  function removeShipCoordinatesHighlight() {
    if (game.state !== "placing-ship") return;

    cachedSquares.forEach((cachedSquare) => {
      cachedSquare.classList.remove("potential-placement");
    });
    // reset cached squares when player stops hovering over a square
    cachedSquares = [];
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
