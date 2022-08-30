import React from "react";
import Board from "../Board";
import { calculateWinner } from "../../utils";

type Squares = {
  squares: Array<string | null>;
  currSquare: number;
};
interface State {
  history: Array<Squares>;
  xIsNext: boolean;
  stepNumber: number;
  selected: number;
}

class Game extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          currSquare: 0,
        },
      ],
      xIsNext: true,
      stepNumber: 0,
      selected: -1,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(i: number) {
    const { xIsNext, stepNumber } = this.state;
    // history is always the initial array segment, [0,step + 1),  each segment
    // consisting of an array with 9 squares
    const history = this.state.history.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    // create copy
    const squares = [...current.squares];
    // if there is a winning position or the selected square is already played
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? "X" : "O";
    this.setState((prev) => ({
      history: [...history, { squares: squares, currSquare: i }],
      xIsNext: !xIsNext,
      stepNumber: prev.stepNumber + 1,
      selected: -1,
    }));
  }

  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
      selected: step,
    });
  }

  getRowCol(index: number) {
    const row = Math.floor(index / 3);
    const col = index % 3;
    return { row, col };
  }

  render() {
    const { history, xIsNext, stepNumber, selected } = this.state;
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, index) => {
      const { row, col } = this.getRowCol(step.currSquare);
      let action = index === 0 ? "Go to game start" : "Go to move #" + index;
      const rowCol = index > 0 ? ` : Row:${row}, Col:${col}` : "";
      action += rowCol;
      return (
        <li key={index}>
          <button
            onClick={() => this.jumpTo(index)}
            className={index === selected ? "selected-move" : ""}
          >
            {action}
          </button>
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
          <Board squares={current.squares} handleClick={this.handleClick} />
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
