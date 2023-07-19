import Gameboard from "../modules/gameboard";
import Ship from "../modules/ship";

const name = "testName";

test("Given ship length and starting coordinates return its coordinates on the board", () => {
  const board = Gameboard(name, Ship);
  const ship = board.placeShip(5, [0, 0]);
  expect(ship.info.coordinates).toStrictEqual([
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
  ]);
});

test("Prevents ship placement if ship length goes off board", () => {
  const board = Gameboard(name, Ship);
  const ship = board.placeShip(5, [0, 6]);
  expect(ship).toStrictEqual(undefined);
});

test("Prevents ship placement if ship exists on given coordinates", () => {
  const board = Gameboard(name, Ship);
  const ship = board.placeShip(4, [1, 0]);
  const anotherShip = board.placeShip(5, [1, 3]);
  expect(ship.info.coordinates).toStrictEqual([
    [1, 0],
    [1, 1],
    [1, 2],
    [1, 3],
  ]);

  expect(anotherShip).toStrictEqual(undefined);
});

test("Given ship length and starting coordinates place ship vertically and return its coordinates", () => {
  const board = Gameboard(name, Ship);
  board.changePlacementPlane();
  const ship = board.placeShip(5, [0, 0]);
  expect(ship.info.coordinates).toStrictEqual([
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
  ]);
});

test("Prevents vertical ship placement if ship length goes off board", () => {
  const board = Gameboard(name, Ship);
  board.changePlacementPlane();
  const ship = board.placeShip(5, [6, 0]);
  expect(ship).toStrictEqual(undefined);
});

test("Receive attack and sink a ship", () => {
  const board = Gameboard(name, Ship);
  board.placeShip(4, [0, 0]);
  board.receiveAttack([0, 0]);
  board.receiveAttack([0, 1]);
  board.receiveAttack([0, 2]);
  board.receiveAttack([0, 3]);
  expect(board.allShipsSunk()).toBe(true);
});

test("Report all ships have been sunk", () => {
  const testBoard = Gameboard(name, Ship);
  testBoard.placeShip(1, [0, 0]);
  testBoard.placeShip(1, [1, 1]);
  testBoard.placeShip(1, [5, 5]);
  testBoard.receiveAttack([0, 0]);
  testBoard.receiveAttack([1, 1]);
  testBoard.receiveAttack([5, 5]);
  expect(testBoard.allShipsSunk()).toBe(true);
});

test("Randomize placement of 5 ships on board", () => {
  const board = Gameboard(name, Ship);
  board.randomizeShipPlacement();
  expect(board.ships.length).toBe(5);
});
