const Gameboard = () => {
  const gameboard = generateBoard();
  const ships = [];
  const shipsCoordinates = [];
  const hitSquares = [];
  let isVertical = false;

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
      const newX = [startingCoor[0], startingCoor[1] + i];
      const newY = [startingCoor[0] + i, startingCoor[1]];
      const newCoordinates = isVertical ? newY : newX;
      if (!isValidPlacement(newCoordinates)) {
        // reset ships coordinates if placement is invalid
        shipInfo.coordinates = [];
        return;
      }
      shipInfo.coordinates.push(newCoordinates);
      shipsCoordinates.push(newCoordinates);
    }
    ships.push(ship);
  };

  const receiveAttack = (coordinates) => {
    const isShip = isShipCoordinate(coordinates);
    if (isShip.length) {
      isShip[0].hit();
      // change ships sunk status if it was sunk
      isShip[0].info.isSunk = !!isShip[0].isSunk();
    }
    hitSquares.push(coordinates);
  };

  const allShipsSunk = () => {
    const allSunkenShips = ships.filter((ship) => ship.info.isSunk);
    return allSunkenShips.length === ships.length;
  };

  const changePlacementPlane = () => {
    isVertical = !isVertical;
  };

  function isValidPlacement(coordinates) {
    return isOnBoard(coordinates) && !isCoordinateOccupied(coordinates);
  }

  function isOnBoard(coordinates) {
    return coordinates[0] <= 9 && coordinates[1] <= 9;
  }

  function isCoordinateOccupied(coordinates) {
    return shipsCoordinates.find((square) =>
      square.every((c, index) => c === coordinates[index])
    );
  }

  function isShipCoordinate(coordinates) {
    return ships.filter((ship) => {
      const shipsCoor = ship.info.coordinates;
      return shipsCoor.find((coor) =>
        coor.every((c, index) => c === coordinates[index])
      );
    });
  }

  return {
    placeShip,
    changePlacementPlane,
    receiveAttack,
    allShipsSunk,
    get hitSquares() {
      return hitSquares;
    },
    get board() {
      return gameboard;
    },
    get shipsCoordinates() {
      return shipsCoordinates;
    },
  };
};

export default Gameboard;
