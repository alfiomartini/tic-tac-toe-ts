import React from "react";

interface Props {
  handleClick: () => void;
  value: string | null;
  className: string;
}

function Square(props: Props): JSX.Element {
  const { value, handleClick, className } = props;
  return (
    <button className={`square ${className}`} onClick={handleClick}>
      {value}
    </button>
  );
}

export default Square;
