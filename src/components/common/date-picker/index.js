import React from 'react'
import { DatePicker as DatePickerAntd } from 'antd'
import moment from 'moment/moment'
import localePtBr from 'antd/es/date-picker/locale/pt_BR'
import 'moment/locale/pt-br'
import localeEnUs from 'antd/es/date-picker/locale/en_US'
import i18n from 'i18n'
import { DATE_FORMAT_BR, DATE_FORMAT_US } from 'utils/constants'

const DatePicker = (props) => {
  const { onChange, name, style = { width: '100%' } } = props

  const onChangeComponent = (value) => {
    if (onChange) {
      console.log(value, name)
      onChange(value, name)
    }
  }

  let format = DATE_FORMAT_BR
  let locale = localePtBr
  if (i18n?.language?.indexOf('pt') === 0) {
    require('moment/locale/pt-br.js')
    moment.locale('pt')
    locale = localePtBr
    format = DATE_FORMAT_BR
    console.log('ptttttttt')
  } else {
    moment.locale('en')
    locale = localeEnUs
    format = DATE_FORMAT_US
    console.log('ussss')
  }
  console.log('index', i18n?.language)

  return (
    <DatePickerAntd
      {...props}
      locale={locale}
      style={style}
      format={format}
      onChange={onChangeComponent}
    />
  )
}

export default DatePicker
