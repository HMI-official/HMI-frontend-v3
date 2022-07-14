import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "../node_modules/normalize.css/normalize.css";
import { AccountProvider } from "./contexts/AccountContext";
import GlobalStyles from "./styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { light } from "./styles/Themes";
import { BrowserRouter, Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./index.css";
import ReactGA from "react-ga";

ReactGA.initialize(process.env.REACT_APP_ANALYTICS_ID!, { debug: true });
const history = createBrowserHistory();
history.listen((location: any) => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});

ReactDOM.render(
  <AccountProvider>
    <ThemeProvider theme={light}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <GlobalStyles />
    </ThemeProvider>
  </AccountProvider>,

  document.getElementById("root")
);
