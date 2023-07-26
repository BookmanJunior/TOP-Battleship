import GameController from "../controller/gameController";

test("Game Over when one player loses all ships", () => {
  const game = GameController();

  game.player1Gameboard.placeShip(5, [0, 0]);
  game.player2Gameboard.placeShip(1, [0, 0]);
  game.changeState();
  game.playRound([0, 0]);
  expect(game.state).toBe("gameover");
});

test("Check if game is ready to start against AI if player1 placed all ships on the gameboard", () => {
  const game = GameController();
  game.player1Gameboard.randomizeShipPlacement();
  game.player2Gameboard.randomizeShipPlacement();
  expect(game.isReadyToStart()).toBe(true);
});
