import Ship from "../modules/ship";

test("Ship properties include: length, hit count and status", () => {
  const ship = Ship(5);
  expect(ship.info).toMatchObject({
    length: 5,
    hitCount: 0,
    isSunk: false,
  });
});

test("Hit counter", () => {
  const ship = Ship(2);
  ship.hit();
  expect(ship.info.hitCount).toBe(1);
});

test("Ship sunk status", () => {
  const ship = Ship(1);
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
