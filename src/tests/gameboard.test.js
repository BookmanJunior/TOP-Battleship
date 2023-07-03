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

test("Given ship length and starting coordinates return its coordinates on the board", () => {
  const placingBoard = Gameboard();
  const ship = Ship(5);
  placingBoard.placeShip(ship, [0, 0]);
  expect(ship.info.coordinates).toStrictEqual([
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
  ]);
});

test("Prevents ship placement if ship length goes off board", () => {
  const offBoard = Gameboard();
  const offBoardShip = Ship(5);
  offBoard.placeShip(offBoardShip, [0, 6]);
  expect(offBoardShip.info.coordinates).toStrictEqual([]);
});

test("Prevents ship placement if ships exists on given coordinates", () => {
  const newBoard = Gameboard();
  const Overlappingship1 = Ship(4);
  const Overlappingship2 = Ship(5);
  newBoard.placeShip(Overlappingship1, [1, 0]);
  newBoard.placeShip(Overlappingship2, [1, 3]);
  expect(Overlappingship2.info.coordinates).toStrictEqual([]);
});
