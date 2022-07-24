import React, { MouseEventHandler } from "react";

interface Props {
  handleClick: MouseEventHandler;
  value: string;
}

function Square(props: Props) {
  const { value, handleClick } = props;
  return (
    <button className="square" onClick={handleClick}>
      {value}
    </button>
  );
}

export default Square;
