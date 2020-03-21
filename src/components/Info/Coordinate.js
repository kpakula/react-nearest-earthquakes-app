import React from "react";

function Coordinate({ handleShow, showLabel, coordinate }) {
  return (
    <div className="coordinates" onClick={handleShow}>
      {showLabel}
      <p>{coordinate}</p>
    </div>
  );
}

export default Coordinate;
