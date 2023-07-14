const Player = (board) => {
  const attack = (coordinates) => board.receiveAttack(coordinates);
  return {
    attack,
  };
};

export default Player;
