import React from "react";
import { Input as InputAntd } from "antd";

const { Password } = InputAntd;

const Input = (props) => {
  const { name, onChange, onPressEnter, onClick } = { ...props };

  const type = props.type || "text";

  const onChangeComponent = (event) => {
    const value = event.target.value;
    if (onChange) {
      onChange(value, name, event);
    }
  };

  const onClickComponent = (event) => {
    const value = event.target.value;
    if (onClick) {
      onClick(value, name, event);
    }
  };

  const onPressEnterComponent = () => {
    if (onPressEnter) {
      onPressEnter();
    }
  };

  return (
    <InputAntd
      {...props}
      type={type}
      onPressEnter={onPressEnterComponent}
      onChange={onChangeComponent}
      onClick={onClickComponent}
    />
  );
};

export default Input;
export { Input, Password };
