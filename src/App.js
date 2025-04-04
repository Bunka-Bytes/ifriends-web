import React, { Suspense, useState, Fragment, useEffect } from 'react'
// ------- STYLES -----
import 'bootstrap/dist/css/bootstrap.min.css'
import 'antd/dist/antd.min.css'
import './styles/main.css'
import './styles/antd-overriden.css'

// ------- COMPONENTS -----
// Antd and Bootstrap
import { BackTop, Layout } from 'antd'

import { BrowserRouter as Router } from 'react-router-dom'
import Routing from './routes'
import SessionTimeout from './components/auth/session-timeout'
import Loading from './components/Loading'
// ------ LOCALE -------
import i18n from './i18n'
import LocaleContext from './LocaleContext'
import moment from 'moment/moment'
import ErrorBoundary from 'components/error-boundary'
import FloatingButton from 'components/common/floating-menu'
// Created
const MenuSup = React.lazy(() => import('./components/menus/menu-sup'))
const Contato = React.lazy(() => import('./components/contato'))

function App() {
  // ------- STATES ------
  const [locale, setLocale] = useState(i18n.language)
  // ------- VARIABLES ------

  // ------- FUNCTIONS ------
  i18n.on('languageChanged', (_lng) => setLocale(i18n.language))

  useEffect(() => {
    if (locale.indexOf('pt') === 0) {
      // require('moment/locale/pt-br.js')
      moment.locale('pt-br')
    } else {
      moment.locale('en')
    }
  }, [locale])

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <Suspense fallback={<Loading />}>
        <Router>
          <ErrorBoundary>
            <SessionTimeout />
            <Layout style={{ minHeight: '100vh' }}>
              <MenuSup />
              <Layout>
                <Fragment>
                  <FloatingButton />
                  <Routing />
                </Fragment>
                <Contato />
              </Layout>
            </Layout>
          </ErrorBoundary>
        </Router>
      </Suspense>
    </LocaleContext.Provider>
  )
}

export default App
