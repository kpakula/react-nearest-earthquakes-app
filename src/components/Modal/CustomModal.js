import React from "react";
import { Modal, InputGroup, FormControl, Button } from "react-bootstrap";

function CustomModal({
  isShowModal,
  handleClose,
  currentLatitude,
  currentLongitude,
  handleRandom
}) {

  return (
    <Modal show={isShowModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Coordinates</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Lat</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            disabled
            type="number"
            placeholder="Latitude"
            aria-label="Latitude"
            aria-describedby="basic-addon1"
            value={currentLatitude}
            onChange={(e) => {}}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon2">Lng</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            disabled
            type="text"
            placeholder="Longitude"
            aria-label="Longitude"
            aria-describedby="basic-addon2"
            value={currentLongitude}
            onChange={(e) => {}}
          />
        </InputGroup>
        <Button variant="secondary" onClick={handleRandom}>
          <svg
            className="bi bi-arrow-repeat"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M2.854 7.146a.5.5 0 00-.708 0l-2 2a.5.5 0 10.708.708L2.5 8.207l1.646 1.647a.5.5 0 00.708-.708l-2-2zm13-1a.5.5 0 00-.708 0L13.5 7.793l-1.646-1.647a.5.5 0 00-.708.708l2 2a.5.5 0 00.708 0l2-2a.5.5 0 000-.708z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M8 3a4.995 4.995 0 00-4.192 2.273.5.5 0 01-.837-.546A6 6 0 0114 8a.5.5 0 01-1.001 0 5 5 0 00-5-5zM2.5 7.5A.5.5 0 013 8a5 5 0 009.192 2.727.5.5 0 11.837.546A6 6 0 012 8a.5.5 0 01.501-.5z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CustomModal;
