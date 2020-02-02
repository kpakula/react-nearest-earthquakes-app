import React from 'react'
import { Col, Row } from "react-bootstrap";
export default function HandleKeyPressed(props) {
    return (
        <Row>
          <Col>{props.handlerInformation}</Col>
        </Row>
    )
}
