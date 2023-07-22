import { generateRandomCoordinates } from "./coordinateGenerator";

const Gameboard = (name, shipMaker) => {
  let ships = [];
  let attackedSquares = [];
  let isVertical = false;
  // used to create ship
  let availableShips = [5, 4, 3, 2, 2];

  const placeShip = (length, startingCoor) => {
    if (!isValidPlacement(startingCoor)) return;

    const ship = shipMaker(length);
    const shipInfo = ship.info;
    const newCoordinates = getNewCoordinates(length, startingCoor);

    if (newCoordinates) {
      shipInfo.coordinates.push(...newCoordinates);
      ships.push(ship);
      getAdjacentSquares(ship);
      return ship;
    }
  };

  const receiveAttack = (coordinates) => {
    const isShip = isShipCoordinate("coordinates", coordinates);
    if (isShip.length) {
      isShip[0].hit();
      // change ships sunk status if it was sunk
      isShip[0].info.isSunk = !!isShip[0].isSunk();
      attackedSquares.push(coordinates);
      const attackResult = isShip[0].isSunk() ? isShip[0].info : "hit";

      if (typeof attackResult === "object") {
        attackedSquares.push(...isShip[0].info.adjacentSquares);
      }

      return attackResult;
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

  function getAdjacentSquares(ship) {
    const possibleAdjacentSquares = [
      [-1, 1],
      [-1, -1],
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
      [1, 1],
      [1, -1],
    ];

    const shipCoors = ship.info.coordinates;
    for (let i = 0; i < shipCoors.length; i++) {
      const currentXCoor = shipCoors[i][0];
      const currentYCoor = shipCoors[i][1];

      if (!isVertical) {
        if (i === 0 && currentYCoor - 1 >= 0) {
          ship.info.adjacentSquares.push([currentXCoor, currentYCoor - 1]);
        }

        if (i === shipCoors.length - 1 && currentYCoor + 1 <= 9) {
          ship.info.adjacentSquares.push([currentXCoor, currentYCoor + 1]);
        }
      } else {
        if (i === 0 && currentXCoor - 1 >= 0) {
          ship.info.adjacentSquares.push([currentXCoor - 1, currentYCoor]);
        }

        if (i === shipCoors.length - 1 && currentXCoor + 1 <= 9) {
          ship.info.adjacentSquares.push([currentXCoor + 1, currentYCoor]);
        }
      }

      for (let j = 0; j < possibleAdjacentSquares.length; j++) {
        const newXCoor = possibleAdjacentSquares[j][0] + currentXCoor;
        const newYCoor = possibleAdjacentSquares[j][1] + currentYCoor;

        if (
          isOnBoard([newXCoor, newYCoor]) &&
          !notDuplicate(ship.info.adjacentSquares, [newXCoor, newYCoor]) &&
          newXCoor !== currentXCoor &&
          newYCoor !== currentYCoor
        ) {
          ship.info.adjacentSquares.push([newXCoor, newYCoor]);
        }
      }
    }
  }

  function notDuplicate(shipAdjCoors, coors) {
    return shipAdjCoors.find((c) => c.every((s, index) => s === coors[index]));
  }

  function isValidPlacement(coordinates) {
    return (
      isOnBoard(coordinates) &&
      !isShipCoordinate("coordinates", coordinates).length &&
      !isShipCoordinate("adjacentSquares", coordinates).length
    );
  }

  function isOnBoard(coordinates) {
    return (
      coordinates[0] >= 0 &&
      coordinates[0] <= 9 &&
      coordinates[1] >= 0 &&
      coordinates[1] <= 9
    );
  }

  function isShipCoordinate(arrayToCheck, coordinates) {
    return ships.filter((ship) => {
      const shipsCoor = ship.info[arrayToCheck];
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

  const resetShips = () => {
    ships = [];
  };

  const resetAttackedSquares = () => {
    attackedSquares = [];
  };

  const resetAvailableShips = () => {
    availableShips = [5, 4, 3, 2, 2];
  };

  return {
    placeShip,
    changePlacementPlane,
    receiveAttack,
    allShipsSunk,
    randomizeShipPlacement,
    getNewCoordinates,
    getAvailableShips,
    resetShips,
    resetAttackedSquares,
    resetAvailableShips,
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
