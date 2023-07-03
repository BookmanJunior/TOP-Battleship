const Gameboard = () => {
  const gameboard = generateBoard();

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

  return {
    get board() {
      return gameboard;
    },
  };
};

export default Gameboard;
