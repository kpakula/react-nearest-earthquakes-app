import React, { useState } from "react";
import "./Coordinates.css";
import Coordinate from "./Coordinate";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
export default function Coordinates(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleSave = () => {
    console.log("BENC")
    // setShow(false);
  };
  const handleShow = () => setShow(true);

  let showLatitude;
  let showLongitude;

  if (props.latitude && props.longitude) {
    showLatitude = <b>Latitude</b>;
    showLongitude = <b>Longitude</b>;
  }

  return (
    <div className="row justify-content-center align-items-center">
      <div className="col-6">
        <Coordinate
          handleShow={handleShow}
          showLabel={showLatitude}
          coordinate={props.latitude}
        />
      </div>
      <div className="col-6">
        <Coordinate
          handleShow={handleShow}
          showLabel={showLongitude}
          coordinate={props.longitude}
        />
      </div>

      <Modal show={show} onHide={handleClose}>
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
    </div>
  );
}
