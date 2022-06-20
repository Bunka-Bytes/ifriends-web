import React from "react";
import { Input } from "antd";

const Search = (props) => {
  const { name, onChange } = props;

  const onChangeComponent = (event) => {
    const value = event.target.value;
    if (onChange) {
      onChange(value, name, event);
    }
  };

  return <Input.Search {...props} onChange={onChangeComponent} />;
};

export { Search };
export default Search;
