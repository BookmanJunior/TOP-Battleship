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
    if (!isValidPlacement(startingCoor)) return;

    const shipInfo = ship.info;

    for (let i = 0; i < shipInfo.length; i++) {
      const newCoordinates = [startingCoor[0], startingCoor[1] + i];
      if (!isValidPlacement(newCoordinates)) {
        // reset ships coordinates if placement is invalid
        shipInfo.coordinates = [];
        return;
      }
      shipInfo.coordinates.push(newCoordinates);
      occupiedSquares.push(newCoordinates);
    }
    ships.push(ship);
  };

  function isValidPlacement(coordinates) {
    return isOnBoard(coordinates) && !isCoordinateOccupied(coordinates);
  }

  function isOnBoard(coordinates) {
    return coordinates[0] <= 9 && coordinates[1] <= 9;
  }

  function isCoordinateOccupied(coordinates) {
    return occupiedSquares.find((square) =>
      square.every((c, index) => c === coordinates[index])
    );
  }

  return {
    placeShip,
    get board() {
      return gameboard;
    },
  };
};

export default Gameboard;
