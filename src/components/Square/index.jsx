import React from "react";

class Square extends React.Component {
  render() {
    const { value, handleClick } = this.props;
    return (
      <button className="square" onClick={() => handleClick()}>
        {value}
      </button>
    );
  }
}

export default Square;
