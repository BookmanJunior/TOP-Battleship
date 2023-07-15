import GameController from "../modules/gameController";

test("Game Over when one player loses all ships", () => {
  const game = GameController();

  game.player1Gameboard.placeShip(5, [0, 0]);
  game.player2Gameboard.placeShip(1, [0, 0]);
  game.playRound([0, 0]);
  expect(game.gameOn).toBe(false);
});
