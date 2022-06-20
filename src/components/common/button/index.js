import React from "react";
import { Button as ButtonAntd } from "antd";
import styles from "./styles.scss";

export const [PRIMARY, GHOST, DASHED, LINK, TEXT, DEFAULT, DANGER] = [
  "primary",
  "ghost",
  "dashed",
  "link",
  "text",
  "default",
  "danger",
];

const Button = (props) => {
  const { label = "", stopPropagation } = props;
  const newProps = {};

  if (
    props.block ||
    (props.hasOwnProperty("block") && props.block === undefined)
  ) {
    newProps.className += ` ${styles.btnBlock}`;
  }

  const onclick = (event) => {
    stopPropagation && event.stopPropagation();

    if (props.onClick) {
      props.onClick(event);
    }
  };

  return (
    <ButtonAntd {...props} {...newProps} onClick={onclick}>
      {label || props.children}
    </ButtonAntd>
  );
};

export default Button;
export { Button };
