const GeneralView = () => {
  const modal = document.querySelector("dialog");

  const resetScreen = () => {
    const mainDiv = document.getElementById("main");
    mainDiv.textContent = "";
    closeModal();
  };

  function displayWinner(msg) {
    openModal();
    const winnerEl = modal.querySelector(".winner");
    winnerEl.textContent = msg;
  }

  function openModal() {
    modal.showModal();
  }

  function closeModal() {
    modal.close();
  }

  return {
    resetScreen,
    displayWinner,
  };
};

export default GeneralView;
