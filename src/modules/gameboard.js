import { generateRandomCoordinates } from "./coordinateGenerator";

const Gameboard = (name, shipMaker) => {
  const ships = [];
  const attackedSquares = [];
  // used to create ship
  const availableShips = [5, 4, 3, 2, 2];
  let isVertical = false;

  const placeShip = (length, startingCoor) => {
    if (!isValidPlacement(startingCoor)) return;

    const ship = shipMaker(length);
    const shipInfo = ship.info;
    const newCoordinates = getNewCoordinates(length, startingCoor);

    // check if coordinates we generated properly
    if (newCoordinates) {
      shipInfo.coordinates.push(...newCoordinates);
      ships.push(ship);
      return ship;
    }
  };

  const receiveAttack = (coordinates) => {
    const isShip = isShipCoordinate(coordinates);
    if (isShip.length) {
      isShip[0].hit();
      // change ships sunk status if it was sunk
      isShip[0].info.isSunk = !!isShip[0].isSunk();
      attackedSquares.push(coordinates);
      return isShip[0].isSunk() ? isShip[0].info.coordinates : "hit";
    }
    attackedSquares.push(coordinates);
    return "miss";
  };

  const randomizeShipPlacement = () => {
    for (let i = 0; i < availableShips.length; i++) {
      const randomPlane = Math.floor(Math.random() * 2);
      isVertical = !!randomPlane;
      let randomCoordinate = generateRandomCoordinates();
      while (!placeShip(availableShips[i], randomCoordinate)) {
        randomCoordinate = generateRandomCoordinates();
      }
    }
  };

  function getNewCoordinates(shipLength, startingCoor) {
    const allCoors = [];
    for (let i = 0; i < shipLength; i++) {
      const newX = [startingCoor[0], startingCoor[1] + i];
      const newY = [startingCoor[0] + i, startingCoor[1]];
      const newCoordinates = isVertical ? newY : newX;

      if (!isValidPlacement(newCoordinates)) {
        return;
      }

      allCoors.push(newCoordinates);
    }
    return allCoors;
  }

  function isValidPlacement(coordinates) {
    return isOnBoard(coordinates) && !isShipCoordinate(coordinates).length;
  }

  function isOnBoard(coordinates) {
    return coordinates[0] <= 9 && coordinates[1] <= 9;
  }

  function isShipCoordinate(coordinates) {
    return ships.filter((ship) => {
      const shipsCoor = ship.info.coordinates;
      return shipsCoor.find((coor) =>
        coor.every((c, index) => c === coordinates[index])
      );
    });
  }

  const getAvailableShips = () => availableShips;

  const allShipsSunk = () => ships.every((ship) => ship.info.isSunk);

  const changePlacementPlane = () => {
    isVertical = !isVertical;
  };

  return {
    placeShip,
    changePlacementPlane,
    receiveAttack,
    allShipsSunk,
    randomizeShipPlacement,
    getNewCoordinates,
    getAvailableShips,
    get attackedSquares() {
      return attackedSquares;
    },
    get ships() {
      return ships;
    },
    get name() {
      return name;
    },
  };
};

export default Gameboard;
