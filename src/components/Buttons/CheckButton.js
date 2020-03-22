import React from "react";

function CheckButton( {request} ) {
  return (
    <div className="row justify-content-center">
      <button
        type="button"
        className="btn btn-secondary btn-lg btn-block"
        onClick={request}
      >
        Check
      </button>
    </div>
  );
}

export default CheckButton;
