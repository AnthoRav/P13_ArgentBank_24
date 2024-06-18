import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./style/main.scss";

// REDUX

import { Provider } from "react-redux";
import store from "./redux/store";

// Assurez-vous que l'élément 'root' existe avant de continuer

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
} else {
  console.error("L'élément 'root' n'a pas été trouvé dans le DOM.");
}

reportWebVitals();
