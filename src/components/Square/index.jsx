import React from "react";

function Square(props) {
  const { value, handleClick } = props;
  return (
    <button className="square" onClick={handleClick}>
      {value}
    </button>
  );
}

export default Square;
