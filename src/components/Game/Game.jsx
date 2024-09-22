import React, { useState } from "react";
import "./Game.css";

const Game = () => {
  const [gameBoard, setGameBoard] = useState(Array(9).fill(""));
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [winMessage, setWinMessage] = useState("");

  const move = (index) => {
    if (lock || gameBoard[index]) return;

    gameBoard[index] = count % 2 === 0 ? "X" : "O";
    setCount(count + 1);

    checkWinner(gameBoard);
  };

  const win = (winner) => {
    setLock(true);
    setWinMessage(winner ? `${winner} wins!` : "It's a Tie!");
  };

  const checkWinner = (gameBoard) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
        win(gameBoard[a]);
        return;
      }
    }

    if (!gameBoard.includes("")) {
      win(null);
    }
  };

  const reset = () => {
    setLock(false);
    setGameBoard(Array(9).fill(""));
    setCount(0);
    setWinMessage("");
  };

  return (
    <div className="container">
      <h1>Tic Tac Toe!</h1>
      <p>{winMessage}</p>
      <div className="board">
        {gameBoard.map((value, index) => (
          <div key={index} className="box" onClick={() => move(index)}>
            <h1>{value}</h1>
          </div>
        ))}
      </div>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default Game;
