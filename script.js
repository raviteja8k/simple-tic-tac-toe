const board = document.querySelector('.board');
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset');
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    function handleCellClick(event) {
      const clickedCell = event.target;
      const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

      if (gameState[clickedCellIndex] !== '' || !gameActive) return;

      gameState[clickedCellIndex] = currentPlayer;
      clickedCell.classList.add(currentPlayer.toLowerCase());

      checkForWinner();
      if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    }

    function checkForWinner() {
      for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
          gameActive = false;
          alert(`Player ${currentPlayer} wins!`);
          return;
        }
      }

      if (!gameState.includes('')) {
        gameActive = false;
        alert('Draw!');
      }
    }

    function resetGame() {
      gameState = ['', '', '', '', '', '', '', '', ''];
      gameActive = true;
      currentPlayer = 'X';
      cells.forEach(cell => {
        cell.classList.remove('x', 'o');
      });
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
