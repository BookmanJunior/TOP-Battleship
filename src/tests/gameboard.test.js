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
  const board = Gameboard(Ship);
  board.placeShip(5, [0, 0]);
  expect(board.shipsCoordinates).toStrictEqual([
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
  ]);
});

test("Prevents ship placement if ship length goes off board", () => {
  const board = Gameboard(Ship);
  board.placeShip(5, [0, 6]);
  expect(board.shipsCoordinates).toStrictEqual([]);
});

test("Prevents ship placement if ship exists on given coordinates", () => {
  const board = Gameboard(Ship);
  board.placeShip(4, [1, 0]);
  board.placeShip(5, [1, 3]);
  expect(board.shipsCoordinates).toStrictEqual([
    [1, 0],
    [1, 1],
    [1, 2],
    [1, 3],
  ]);
});

test("Given ship length and starting coordinates place ship vertically and return its coordinates", () => {
  const board = Gameboard(Ship);
  board.changePlacementPlane();
  board.placeShip(5, [0, 0]);
  expect(board.shipsCoordinates).toStrictEqual([
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
  ]);
});

test("Prevents vertical ship placement if ship length goes off board", () => {
  const board = Gameboard(Ship);
  board.changePlacementPlane();
  board.placeShip(5, [6, 0]);
  expect(board.shipsCoordinates).toStrictEqual([]);
});

test("Receive attack and sink a ship", () => {
  const board = Gameboard(Ship);
  board.placeShip(4, [0, 0]);
  board.receiveAttack([0, 0]);
  board.receiveAttack([0, 1]);
  board.receiveAttack([0, 2]);
  board.receiveAttack([0, 3]);
  expect(board.allShipsSunk()).toBe(true);
});

test("Report all ships have been sunk", () => {
  const testBoard = Gameboard(Ship);
  testBoard.placeShip(1, [0, 0]);
  testBoard.placeShip(1, [1, 1]);
  testBoard.placeShip(1, [5, 5]);
  testBoard.receiveAttack([0, 0]);
  testBoard.receiveAttack([1, 1]);
  testBoard.receiveAttack([5, 5]);
  expect(testBoard.allShipsSunk()).toBe(true);
});
