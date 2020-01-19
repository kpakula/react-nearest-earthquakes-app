import React, { Component } from "react";
import generateRandomNumberInRange from "../../utils/Random";
import { Row, Col } from "react-bootstrap";

// To do
export default class RandomComponent extends Component {
  getRandomRowsAmount = () => {
    const randomRowsAmount = generateRandomNumberInRange(50);
    console.log(randomRowsAmount);
    let listOfAllRows = Array(randomRowsAmount)
      .fill()
      .map((_, i) => {
        const randomColNumber = generateRandomNumberInRange(12);
        console.log(randomColNumber);


        return (
        <Row key={i}>
            {Array(randomColNumber).fill().map((_, i) => {
                return (
                    <Col key={i + 1}>{i + 1}</Col>
                )
            })}
        </Row>);
      });

      return listOfAllRows;
  };

  render() {
    return <div>{this.getRandomRowsAmount()}</div>;
  }
}
