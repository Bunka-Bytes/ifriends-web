import React from 'react'

const defaultValue = {
  locale: 'pt-BR',
  setLocale: () => {},
}

export default React.createContext(defaultValue)
