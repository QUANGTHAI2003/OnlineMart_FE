/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { store } from "@app/store/store";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./i18n";

import "@app/app/assets/styles/styles.scss";

import App from "./App";
import AuthMiddleware from "./store/middlewares/AuthMiddleware";
import CustomLoading from "./utils/Loading/CustomLoading";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.Suspense fallback={<CustomLoading />}>
    <Provider store={store}>
      <BrowserRouter>
        <CookiesProvider>
          <AuthMiddleware>
            <App />
          </AuthMiddleware>
        </CookiesProvider>
      </BrowserRouter>
    </Provider>
  </React.Suspense>
);
