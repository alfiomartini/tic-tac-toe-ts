import React from "react";
import { MouseEventHandler } from "react";
import Square from "../Square";

interface Props {
  handleClick: MouseEventHandler;
  squares: Array<string | null>;
}

class Board extends React.Component<Props> {
  renderSquare(i: any): JSX.Element {
    const { squares, handleClick } = this.props;
    return <Square value={squares[i]} handleClick={() => handleClick(i)} />;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default Board;
