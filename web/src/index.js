import React from "react";
import ReactDOM from "react-dom";
import { ModalProvider } from "react-modal-hook";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import "./assets/scss/material-kit-react.scss";
ReactDOM.render(<App />, document.getElementById("root"));


// ReactDOM.render(
//   <ModalProvider>
//     <App />
//   </ModalProvider>,
//   document.getElementById("root")
// );
// >>>>>>> bc7c52e985761f2708702b4d9ef1da8195f07c93

serviceWorker.unregister();
