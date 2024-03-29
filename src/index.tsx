import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import store from "./services/store";
import { BrowserRouter as Router, useLocation } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLDivElement
);

root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
