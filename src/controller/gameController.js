import Gameboard from "../modules/gameboard";
import Ship from "../modules/ship";
import Player from "../modules/player";

const GameController = () => {
  const player1Gameboard = Gameboard("player1-gameboard", Ship);
  const player2Gameboard = Gameboard("player2-gameboard", Ship);

  const player1 = Player(player2Gameboard);
  const player2 = Player(player1Gameboard);

  const gameState = {
    playing: "playing",
    "placing-ship": "placing-ship",
    gameover: "gameover",
  };

  const gameModes = {
    ai: "ai",
    player: "player",
  };

  // defaults
  let currentPlayer = player1;
  let currentBoard = player1Gameboard;
  let state = gameState["placing-ship"];
  let gameMode = gameModes.ai;

  function playRound(coordinates) {
    const attack = currentPlayer.attack(coordinates);

    if (isWinner()) {
      changeState();
    }

    switchTurns();

    return attack;
  }

  function restartGame() {
    const gameboards = [player1Gameboard, player2Gameboard];
    currentPlayer = player1;
    currentBoard = player1Gameboard;
    changeState();

    // reset gameboards
    gameboards.forEach((gameboard) => {
      gameboard.resetShips();
      gameboard.resetAttackedSquares();
      gameboard.resetAvailableShips();
    });
  }

  function isReadyToStart() {
    return (
      player1Gameboard.ships.length === 5 && player2Gameboard.ships.length === 5
    );
  }

  function switchTurns() {
    changeCurrentPlayer();
    changeCurrentBoard();
  }

  function changeState() {
    switch (state) {
      case "playing":
        state = gameState.gameover;
        break;
      case "placing-ship":
        state = gameState.playing;
        break;
      case "gameover":
        state = gameState["placing-ship"];
        break;
      default:
    }
  }

  function changeCurrentPlayer() {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  }

  function changeCurrentBoard() {
    currentBoard =
      currentBoard === player2Gameboard ? player1Gameboard : player2Gameboard;
  }

  function changeGameMode() {
    gameMode = gameMode === "ai" ? gameModes.player : gameModes.ai;
  }

  function isWinner() {
    return player1Gameboard.allShipsSunk() || player2Gameboard.allShipsSunk();
  }

  function winner() {
    return player1Gameboard.allShipsSunk() ? "You lose" : "You win";
  }

  return {
    playRound,
    isReadyToStart,
    switchTurns,
    changeState,
    changeGameMode,
    changeCurrentBoard,
    winner,
    restartGame,
    get player1Gameboard() {
      return player1Gameboard;
    },
    get player2Gameboard() {
      return player2Gameboard;
    },
    get player1() {
      return player1;
    },
    get player2() {
      return player2;
    },
    get currentPlayer() {
      return currentPlayer;
    },
    get currentBoard() {
      return currentBoard;
    },
    get state() {
      return state;
    },
    get mode() {
      return gameMode;
    },
  };
};

export default GameController;
