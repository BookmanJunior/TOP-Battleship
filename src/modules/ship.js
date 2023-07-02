const Ship = (length) => {
  const ship = {
    length,
    hitCount: 0,
    isSunk: false,
    coordinates: [],
  };

  const hit = () => {
    ship.hitCount += 1;
  };

  const isSunk = () => ship.length === ship.hitCount;

  return {
    hit,
    isSunk,
    get info() {
      return ship;
    },
  };
};

export default Ship;
