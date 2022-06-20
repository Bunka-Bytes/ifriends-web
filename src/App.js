import React, { Suspense, useState } from "react";
// ------- STYLES -----
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "./styles/main.css";
import "./styles/antd-overriden.css";

// ------- COMPONENTS -----
// Antd and Bootstrap
import Container from "react-bootstrap/Container";
import { Layout } from "antd";

import { BrowserRouter as Router } from 'react-router-dom';

// Created
import MenuSup from "./components/menus/menu-sup";
import MenuSide from "./components/menus/menu-side";
import Contato from "./components/contato";
import Routing from "./routes";
import SessionTimeout from "./components/auth/session-timeout";
import Loading from "./components/Loading";
import { isAuthenticated, removeTokenOnLogout } from './services/auth';

// ------ LOCALE -------
import i18n from "./i18n";
import LocaleContext from "./LocaleContext";

// Destructuring
const { Content } = Layout;

function App() {
  // ------- STATES ------
  const [locale, setLocale] = useState(i18n.language);
  // ------- VARIABLES ------

  // ------- FUNCTIONS ------
  i18n.on("languageChanged", (lng) => setLocale(i18n.language));
   

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <Suspense fallback={<Loading />}>
        <Router>
          <SessionTimeout />
          <Layout style={{ minHeight: "100vh" }}>
            <MenuSide />
            <Layout>
              <MenuSup />
              <Container>
                <Content style={{ marginTop: "1.25rem" }}>
                  <Routing />
                </Content>
              </Container>
              <Contato />
            </Layout>
          </Layout>
        </Router>
      </Suspense>
    </LocaleContext.Provider>
  );
}

export default App;
