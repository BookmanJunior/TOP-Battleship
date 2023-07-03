const Gameboard = () => {
  const gameboard = generateBoard();
  const ships = [];
  const occupiedSquares = [];

  function generateBoard() {
    const arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push([]);
      for (let j = 0; j < 10; j++) {
        arr[i].push([]);
      }
    }
    return arr;
  }

  const placeShip = (ship, startingCoor) => {
    const coors = ship.info.coordinates;
    coors.push(startingCoor);
    occupiedSquares.push(startingCoor);

    for (let i = 1; i < ship.info.length; i++) {
      const newCoordinates = [startingCoor[0], startingCoor[1] + i];
      coors.push(newCoordinates);
      occupiedSquares.push(newCoordinates);
    }
    ships.push(ship);
  };

  return {
    placeShip,
    get board() {
      return gameboard;
    },
  };
};

export default Gameboard;
