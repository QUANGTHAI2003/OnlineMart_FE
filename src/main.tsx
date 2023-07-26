/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { store } from "@app/store/store";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./i18n";
import '@fortawesome/fontawesome-free/css/all.min.css';

import "@app/app/assets/styles/styles.scss";

import App from "./App";
import CustomLoading from "./utils/Loading/CustomLoading";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.Suspense fallback={<CustomLoading />}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.Suspense>
);
