import React from "react";

interface Props {
  handleClick: () => void;
  value: string | null;
}

function Square(props: Props): JSX.Element {
  const { value, handleClick } = props;
  return (
    <button className="square" onClick={handleClick}>
      {value}
    </button>
  );
}

export default Square;
