import { Select as SelectAntd } from "antd";
import React from "react";
import { toArray } from "../../../utils/functions";

const Option = SelectAntd.Option;

const Select = (props) => {
  const { name, onChange, options, labelShowOnSelectProp } = props;

  const onChangeComponent = (value, option) => {
    if (onChange) {
      onChange(value, name, option);
    }
  };

  return (
    <SelectAntd
      {...props}
      onChange={onChangeComponent}
      // optionLabelProp="label"
    >
      {toArray(options).map((option) => (
        <SelectAntd.Option
          key={`${option.value} ${option.label}`}
          value={option.value}
          label={option.label}
          disabled={option.disabled}
        >
          {labelShowOnSelectProp ? option[labelShowOnSelectProp] : option.label}
        </SelectAntd.Option>
      ))}
    </SelectAntd>
  );
};
export default Select;
export { Select, Option };
