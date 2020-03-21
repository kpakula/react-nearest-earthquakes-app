import React from "react";
import {
  Modal,
  InputGroup,
  FormControl,
  Button
} from "react-bootstrap";

function CustomModal({ isShowModal, handleClose, handleSave }) {
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
            placeholder="Latitude"
            aria-label="Latitude"
            aria-describedby="basic-addon1"
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon2">Lng</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Longitude"
            aria-label="Longitude"
            aria-describedby="basic-addon2"
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CustomModal;
