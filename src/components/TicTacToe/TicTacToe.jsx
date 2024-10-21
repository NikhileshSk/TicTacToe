import React, { useState } from 'react';
import circle from '../../assets/circle.png';
import cross from '../../assets/cross.png';
import './TicTacToe.css';

const TicTacToe = () => {
  let [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let [winnerMessage, setWinnerMessage] = useState("");

  const toggle = (e, num) => {
    if (lock || data[num]) {
      return;
    }
    const newData = [...data]; // Create a copy of the data array
    if (count % 2 === 0) {
      e.target.innerHTML = `<img src="${cross}" alt="cross" class="icon" />`;
      newData[num] = 'x';
    } else {
      e.target.innerHTML = `<img src="${circle}" alt="circle" class="icon" />`;
      newData[num] = 'o';
    }
    setData(newData);
    setCount(count + 1);
    checkWin(newData);
  };

  const checkWin = (newData) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (newData[a] && newData[a] === newData[b] && newData[a] === newData[c]) {
        won(newData[a]);
        break;
      }
    }
  };

  const won = (winner) => {
    setLock(true);
    setWinnerMessage(`${winner.toUpperCase()} has won the game!`);
  };

  const resetGame = () => {
    setData(["", "", "", "", "", "", "", "", ""]);
    setCount(0);
    setLock(false);
    setWinnerMessage("");
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => box.innerHTML = ""); // Clear the board
  };

  return (
    <>
      <div className="container">
        <h1 className="title">Tic Tac Toe</h1>
        <h2 className="winner-message">{winnerMessage}</h2>
        <div className="board">
          <div className="row1">
            <div className="box" onClick={(e) => toggle(e, 0)}></div>
            <div className="box" onClick={(e) => toggle(e, 1)}></div>
            <div className="box" onClick={(e) => toggle(e, 2)}></div>
          </div>
          <div className="row2">
            <div className="box" onClick={(e) => toggle(e, 3)}></div>
            <div className="box" onClick={(e) => toggle(e, 4)}></div>
            <div className="box" onClick={(e) => toggle(e, 5)}></div>
          </div>
          <div className="row3">
            <div className="box" onClick={(e) => toggle(e, 6)}></div>
            <div className="box" onClick={(e) => toggle(e, 7)}></div>
            <div className="box" onClick={(e) => toggle(e, 8)}></div>
          </div>
        </div>
        <button className="reset" onClick={resetGame}>Reset</button>
      </div>
    </>
  );
};

export default TicTacToe;
