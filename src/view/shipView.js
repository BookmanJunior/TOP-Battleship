const ShipView = (boardObj) => {
  // cache hovered squares
  const cachedSquares = {
    invalidSquares: [], // stores squares that weren't valid to remove styling
    validSquares: [],
  };

  function highlightShipCoordinates(square) {
    const parsedSquare = parseSquareCoordinates(square);
    const isValidCoordinatePlacement = boardObj.getNewCoordinates(
      boardObj.getAvailableShips()[0],
      parsedSquare
    );
    if (!isValidCoordinatePlacement) {
      square.style.cursor = "not-allowed";
      // cache square to remove styles
      cachedSquares.invalidSquares.push(square);
      // cache square for when user wants to change placement axis
      cachedSquares.validSquares.push(square);
      return;
    }
    isValidCoordinatePlacement.forEach((s) => {
      const squareEl = document.querySelector(`[data-coordinates="${s}"]`);
      squareEl.classList.add("potential-placement");
      cachedSquares.validSquares.push(squareEl);
    });
  }

  function removeShipCoordinatesHighlight() {
    cachedSquares.validSquares.forEach((cachedSquare) => {
      cachedSquare.classList.remove("potential-placement");
      if (cachedSquare.hasAttribute("style")) {
        cachedSquare.removeAttribute("style");
      }
    });
    // reset cached squares when player stops hovering over a square
    cachedSquares.validSquares = [];
  }

  function placeShip(square) {
    const squareCoordinates = parseSquareCoordinates(square);
    const ship = boardObj.placeShip(
      boardObj.getAvailableShips()[0],
      squareCoordinates
    );
    if (ship) {
      cachedSquares.validSquares.forEach((s) => {
        s.dataset.occupied = "ship";
        s.classList.remove("potential-placement");
      });
      cachedSquares.validSquares = [];
      boardObj.getAvailableShips().shift();
    }
  }

  function changeShipPlacement(e) {
    if (
      e.key.toLocaleLowerCase() === "r" &&
      cachedSquares.validSquares.length
    ) {
      boardObj.changePlacementPlane();
      // recalculate ship placement
      const startingCoor = cachedSquares.validSquares[0];
      removeShipCoordinatesHighlight();
      // synchronizes animation
      setTimeout(() => {
        highlightShipCoordinates(startingCoor);
      }, 20);
    }
  }

  function parseSquareCoordinates(cell) {
    return cell.dataset.coordinates
      .split(",")
      .map((coordinate) => parseInt(coordinate, 10));
  }

  return {
    highlightShipCoordinates,
    removeShipCoordinatesHighlight,
    changeShipPlacement,
    placeShip,
  };
};

export default ShipView;
