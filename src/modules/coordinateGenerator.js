function generateRandomCoordinates() {
  const coordinates = [];
  for (let i = 0; i < 2; i++) {
    coordinates.push(Math.floor(Math.random() * 10));
  }
  return coordinates;
}

function generateAttackCoordinates(board) {
  let randomCoordinates = generateRandomCoordinates();
  const playerBoard = board.attackedSquares;
  if (playerBoard.length) {
    for (let i = 0; i < playerBoard.length; i++) {
      while (
        playerBoard[i][0] === randomCoordinates[0] &&
        playerBoard[i][1] === randomCoordinates[1]
      ) {
        randomCoordinates = generateAttackCoordinates(board);
      }
    }
  }
  return randomCoordinates;
}

export { generateRandomCoordinates, generateAttackCoordinates };
