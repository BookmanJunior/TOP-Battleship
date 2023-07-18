import Gameboard from "./gameboard";
import Ship from "./ship";
import Player from "./player";

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
};

export default GameController;
