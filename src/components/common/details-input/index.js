import React from "react";
import { Col } from "react-flexbox-grid";

const DetailsInput = (props) => {
  const label = props.label || "";

  return (
    <Col {...props}>
      <div>{label}</div>

      {props.children}
    </Col>
  );
};

export default DetailsInput;
