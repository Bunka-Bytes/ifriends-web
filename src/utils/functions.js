import message from 'antd/lib/message'
import emailjs from 'emailjs-com'
import { useNavigate } from 'react-router-dom'

export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

export const stringToColour = (str) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  let colour = '#'
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff
    colour += ('00' + value.toString(16)).substr(-2)
  }
  return colour
}

export const arrayToDate = (dateApi) => {
  if (dateApi == null) return null

  return new Date(
    dateApi[0],
    dateApi[1] - 1,
    dateApi[2],
    dateApi[3] - 3,
    dateApi[4],
    dateApi[5]
  )
}

export const dateDifferenceInSeconds = (date1, date2) => {
  const date1utc = Date.UTC(
    date1.getFullYear(),
    date1.getMonth(),
    date1.getDate(),
    date1.getHours(),
    date1.getMinutes(),
    date1.getSeconds()
  )
  const date2utc = Date.UTC(
    date2.getFullYear(),
    date2.getMonth(),
    date2.getDate(),
    date2.getHours(),
    date2.getMinutes(),
    date2.getSeconds()
  )
  // let day = 1000 * 60 * 60 * 24 //milisegundos em um dia
  // if (date2utc - date1utc < day) {
  //   return date2utc - date1utc;
  // }
  return (date2utc - date1utc) / 1000
}

export const getDateWithText = (date1, date2) => {
  let differDatesInDays = dateDifferenceInSeconds(date1, date2)
  const language = localStorage.getItem('i18nextLng')
  const langCondition = language === 'pt-BR' || language === 'pt'

  let textDate = langCondition ? ' segundo' : ' second'

  if (differDatesInDays >= 60 * 60 * 24) {
    differDatesInDays /= 60 * 60 * 24
    textDate = langCondition ? ' dia' : ' day'
  } else if (differDatesInDays >= 60 * 60) {
    differDatesInDays /= 60 * 60
    textDate = langCondition ? ' hora' : ' hour'
  } else if (differDatesInDays >= 60) {
    differDatesInDays /= 60
    textDate = langCondition ? ' minuto' : ' minute'
  }
  differDatesInDays = Math.abs(Math.floor(differDatesInDays))

  const string = langCondition ? ' atrás' : ' ago'
  const dateWithText = `${differDatesInDays}${textDate}${
    differDatesInDays > 1 ? 's' : ''
  } ${string}`

  return dateWithText
}

export const getBeetweenDateWithTextForApiDate = (dateApi) => {
  if (dateApi == null) return 'Em algum momento do multiverso...'

  const newDataEmissao = arrayToDate(dateApi)
  const dateToday = new Date()
  return getDateWithText(newDataEmissao, dateToday)
}

export const toArray = (arr) => {
  return Array.isArray(arr) ? arr : []
}

export const sendVerificationEmail = (paramsTemplate) => {
  const { toName, toEmail, codigo } = paramsTemplate

  return emailjs.send(
    process.env.REACT_APP_SEND_EMAIL_SERVICE_ID,
    process.env.REACT_APP_SEND_EMAIL_TEMPLATE_ID,
    {
      to_name: toName,
      to_email: toEmail,
      codigo,
    },
    process.env.REACT_APP_SEND_EMAIL_PUBLIC_KEY
  )
}

export const sendEmailTemplateDefault = (data = {}) => {
  return emailjs.send(
    process.env.REACT_APP_SEND_EMAIL_SERVICE_ID,
    process.env.REACT_APP_SEND_EMAIL_TEMPLATE_ID_GENERAL,
    {
      from_email: 'bunkabytes@gmail.com',
      ...data,
    },
    process.env.REACT_APP_SEND_EMAIL_PUBLIC_KEY
  )
}

export const calculatePercentageTrophys = (pontos = 0) => {
  if (pontos >= 160) {
    return ((pontos - 160) / (300 - 160)) * 100
  } else if (pontos >= 80) {
    return ((pontos - 80) / (160 - 80)) * 100
  } else if (pontos >= 20) {
    return ((pontos - 20) / (80 - 20)) * 100
  }

  return (pontos / 20) * 100
}

export const getTrophy = (pontos = 0) => {
  if (pontos >= 300) {
    return 4
  } else if (pontos >= 160) {
    return 3
  } else if (pontos >= 80) {
    return 2
  } else if (pontos >= 20) {
    return 1
  }

  return 0
}

export const valideTokenEmailVerification = (token = '') => {
  return [...token]
    .reverse()
    .reduce((a, c) => a + (/[aeiou]/i.test(c) ? c.toLowerCase() : c), '')
}

export const error = (error) => {
  if (
    typeof error.response.data === 'object' &&
    error.response.data !== null &&
    !Array.isArray(error.response.data)
  ) {
    return message.error(
      error.response.data.error + ' - ' + error.response.status
    )
  }
  if (error.response.status !== 403) {
    return message.error(error.response.data + ' - ' + error.response.status)
  }
}

/* eslint-disable */
export const clone = (obj) => {
  if (null == obj || 'object' != typeof obj) {
    return obj
  }
  var copy = obj.constructor()
  for (var attr in obj) {
    const prop = obj[attr]
    if ('object' === typeof prop) {
      copy[attr] = clone(prop)
    } else if (Array.isArray(prop)) {
      copy[attr] = prop.map(clone)
    } else {
      copy[attr] = prop
    }
  }
  return copy
}
/* eslint-enable */

export const toMonthName = (monthNumber) => {
  const language = localStorage.getItem('i18nextLng')
  if (monthNumber == null) return undefined

  const date = new Date()
  date.setMonth(monthNumber - 1)

  return date.toLocaleString(language, {
    month: 'short',
  })
}

export const ligaPalavras =
  (separador = '') =>
  (...palavras) =>
    (palavras || []).filter((e) => !!e).join(separador)

export const concatenando = (arrayPalavras = [], divisor = ' ') => {
  return ligaPalavras(divisor)(...arrayPalavras)
}

export const hex2rgba = (hex, alpha = 1) => {
  const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16))
  return `rgba(${r},${g},${b},${alpha})`
}

export const removeAccentsString = (text = '') => {
  return text.normalize('NFD').replace(/\p{Diacritic}/gu, '')
}

export const ordinalSuffixOfInternalization = (i) => {
  const language = localStorage.getItem('i18nextLng')
  const j = i % 10
  const k = i % 100

  if (language === 'pt-BR' || language === 'pt') {
    return i + '°'
  } else if (language === 'en' || language === 'en-US') {
    if (j == 1 && k != 11) {
      return i + 'st'
    }
    if (j == 2 && k != 12) {
      return i + 'nd'
    }
    if (j == 3 && k != 13) {
      return i + 'rd'
    }
    return i + 'th'
  }
  return i
}
