import { useState } from 'react';
import './styles.css';

// This component is the square that will represent each square on the board
function Square({ value, onSquareClick }) {
  return (
    <button className='square' onClick={onSquareClick}>
      {value}
    </button>
  );
}

// This is the board with 9 square components
function Board({ squares, onSquareClick }) {
  return (
    <>
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={() => onSquareClick(0)} />
        <Square value={squares[1]} onSquareClick={() => onSquareClick(1)} />
        <Square value={squares[2]} onSquareClick={() => onSquareClick(2)} />
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => onSquareClick(3)} />
        <Square value={squares[4]} onSquareClick={() => onSquareClick(4)} />
        <Square value={squares[5]} onSquareClick={() => onSquareClick(5)} />
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => onSquareClick(6)} />
        <Square value={squares[7]} onSquareClick={() => onSquareClick(7)} />
        <Square value={squares[8]} onSquareClick={() => onSquareClick(8)} />
      </div>
    </>
  );
}

function declareWinner(squares) {
  const lines =[ // this values represent the lines that makes the wins
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,4],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a,b,c] = lines[i]; // assigns the values of the specific lines to a, b and c
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;

}

// This is the main function of the file
function Game() {
  const initialSquares = Array(9).fill(null); // resets the values in the boxes to null
  const [squares, setSquares] = useState(initialSquares);
  const [xIsNext, setXIsNext] = useState(true);

  function handleSquareClick(i) {
    if (squares[i] || declareWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function handleRestart() {
    setSquares(initialSquares);
    setXIsNext(true);
  }

  const winner = declareWinner(squares);
  const isGameOver = winner || squares.every((square) => square !== null);
  let status;
  if (winner) {
    status = <span className='winner-text'>{winner} wins!</span>;
  } else if (isGameOver) {
    status = <span className='draw-text'>Game over!</span>;
  } else {
    status = <span className='winner-text'>{xIsNext ? 'X' : 'O'}'s turn...</span>;
  }

  return (
    <>
      <h1>TIC - TAC - TOE</h1>
      <div className='status'>{status}</div>
      <Board squares={squares} onSquareClick={handleSquareClick} />
      <RestartButton handleRestart={handleRestart} />
    </>
  );
}

function RestartButton({ handleRestart }) {
  return (
    <button className='restart-button' onClick={handleRestart}>
      Restart Game
    </button>
  );
}

export default Game;
