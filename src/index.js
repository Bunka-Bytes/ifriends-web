import 'react-app-polyfill/ie9'
import 'react-app-polyfill/stable'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

/* -= Redux =- */
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { ConfigProvider } from 'antd'

import i18n from './i18n'
import moment from 'moment/moment'
import localePtBr from 'antd/es/locale/pt_BR'
import localeEnUs from 'antd/es/locale/en_US'

const root = ReactDOM.createRoot(document.getElementById('root'))

const locale = localePtBr
// if (i18n?.language?.indexOf('pt') === 0) {
//   require('moment/locale/pt.js')
//   moment.locale('pt')
//   locale = localePtBr
// } else {
//   moment.locale('en')
//   locale = localeEnUs
// }
// console.log('index', i18n?.language)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider>
        <App />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
