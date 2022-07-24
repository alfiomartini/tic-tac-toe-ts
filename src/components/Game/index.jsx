import React from "react";
import Board from "../Board";
import { calculateWinner } from "../../utils";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      xIsNext: true,
      stepNumber: 0,
    };
  }

  handleClick(i) {
    const { xIsNext, stepNumber } = this.state;
    // this ensures if we go back in time, and make a new move from that
    // point, we throw away all the "future" history that would now be incorrect
    const history = this.state.history.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    // create copy
    const squares = [...current.squares];
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    this.setState((prev) => ({
      history: [...history, { squares: squares }],
      xIsNext: !xIsNext,
      stepNumber: prev.stepNumber + 1,
    }));
  }

  jumpTo(step) {
    this.setState({ stepNumber: step, xIsNext: step % 2 === 0 });
  }

  render() {
    const { history, xIsNext, stepNumber } = this.state;
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, index) => {
      const action = index === 0 ? "Go to game start" : "Go to move #" + index;
      return (
        <li key={index}>
          <button onClick={() => this.jumpTo(index)}>{action}</button>
        </li>
      );
    });
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next Player: " + (xIsNext ? "X" : "O");
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            handleClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
