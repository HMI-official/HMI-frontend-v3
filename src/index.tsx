import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "../node_modules/normalize.css/normalize.css";
import { AccountProvider } from "./contexts/AccountContext";
import GlobalStyles from "./styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { light } from "./styles/Themes";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";

ReactDOM.render(
  <AccountProvider>
    <ThemeProvider theme={light}>
      <Router>
        <App />
      </Router>
      <GlobalStyles />
    </ThemeProvider>
  </AccountProvider>,

  document.getElementById("root")
);
