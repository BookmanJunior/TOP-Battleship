import Ship from "../modules/ship";

const ship = Ship(1);

test("Ship properties include: length, hit count and status", () => {
  expect(ship.info).toMatchObject({
    length: 1,
    hitCount: 0,
    isSunk: false,
  });
});

test("Hit counter", () => {
  ship.hit();
  expect(ship.info.hitCount).toBe(1);
});

test("Ship sunk status", () => {
  expect(ship.isSunk()).toBe(true);
});
