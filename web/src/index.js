import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./assets/scss/material-kit-react.scss";
ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
