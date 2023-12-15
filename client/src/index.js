import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./assets/scss/style.scss";

import store from "./Reducer/store";
import { Provider } from 'react-redux';

import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

