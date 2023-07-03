import Gameboard from "../modules/gameboard";
import Ship from "../modules/ship";

const gameboard = Gameboard(Ship);

test("Gameboard has 10 rows", () => {
  expect(gameboard.board.length).toBe(10);
});

gameboard.board.forEach((row) => {
  test("Each gameboard row has 10 squares", () => {
    expect(row.length).toBe(10);
  });
});
