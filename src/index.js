// import Component
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

// import
import App from "./app";
import "./index.css";

// setup redux
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux"; //Provider sebagai penghubung redux action dgn reducer, menghubungkan pake connect
import ReduxThunk from 'redux-thunk'
import Reducers from "./reducers";

//setelah diimport, harus dibuatkan variable sebagai penyimpan
let globalStore = createStore(Reducers, {}, applyMiddleware(ReduxThunk)); //penyimpanan global
globalStore.subscribe(() =>
  console.log("global storage : ", globalStore.getState())
);

ReactDOM.render(
  <Provider store={globalStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
