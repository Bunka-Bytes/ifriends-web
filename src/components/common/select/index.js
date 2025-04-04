import { Select as SelectAntd } from 'antd'
import React from 'react'
import { removeAccentsString, toArray } from '../../../utils/functions'

const Option = SelectAntd.Option

const Select = (props) => {
  const {
    name,
    onChange,
    options,
    showSearch = true,
    optionFilterProp = 'label',
    filterOption = (input, option) =>
      removeAccentsString(option?.label?.toLowerCase()).includes(
        removeAccentsString(input?.toLowerCase())
      ),
    style = { width: '100%' },
  } = props

  const onChangeComponent = (value, option) => {
    if (onChange) {
      onChange(value, name, option)
    }
  }

  return (
    <SelectAntd
      {...props}
      onChange={onChangeComponent}
      showSearch={showSearch}
      optionFilterProp={optionFilterProp}
      filterOption={filterOption}
      style={style}
      options={options}
    />
  )
}
export default Select
export { Select, Option }
