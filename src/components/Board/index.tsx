import React from "react";
import Square from "../Square";

interface Props {
  handleClick: (i: number) => void;
  squares: Array<string | null>;
}

class Board extends React.Component<Props> {
  renderSquare(i: number): JSX.Element {
    const { squares, handleClick } = this.props;
    return (
      <Square value={squares[i]} handleClick={() => handleClick(i)} key={i} />
    );
  }

  renderBoardRow(i: number) {
    const squares = [0, 1, 2].map((index) => this.renderSquare(index + i));
    return (
      <div className="board-row" key={i}>
        {squares}
      </div>
    );
  }

  renderBoard() {
    const board = [0, 3, 6].map((index) => this.renderBoardRow(index));
    return board;
  }

  render() {
    return <div>{this.renderBoard()}</div>;
  }
}

export default Board;
