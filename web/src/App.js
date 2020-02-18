import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { CommonContext } from "./context/CommonContext";

import NotFound from "./pages/NotFound";
import VoteMain from "./pages/VoteMain";
import Main from "./pages/Main";
import Auth from "./pages/auth/auth-go";
import Register from "./pages/auth/auth-register";
import Order from "./pages/customer/kiosk-order";
import Admin_order_list from "./pages/admin/Admin_order_list";
import Childkiosk from "./pages/customer/Childkiosk";
// import BugerList from "./components/BugerList";
import wBoard from "./pages/waitingboard/wMain";

import TestDB from "./pages/test/test1_db";
import "./index.css";

// manager
import ManagerMain from "./pages/manager/ManagerMain";
import sockettest from "./pages/sockettest";

const theme = createMuiTheme({
  drawerWidth: 320,
  typography: {
    fontFamily: ["yg-jalnan"].join(","),
    button: {
      fontFamily: "Noto Sans KR"
    },
    body1: {
      fontWeight: 500
    }
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundColor: "white"
        }
      }
    }
  }
});

const App = () => {
  return (
    <CommonContext.Provider value={{}}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Auth} />
            <Route path="/Main" component={Main} />
            <Route path="/Auth" component={Auth} />
            <Route path="/Register" component={Register} />
            <Route path="/Order" component={Order} />
            <Route path="/wBoard" component={wBoard} />
            <Route path="/TestDB" component={TestDB} />

            <Route path="/not-found" component={NotFound} />
            <Route path="/Admin" component={Admin_order_list} />
            <Route path="/sockettest" component={sockettest} />
            <Route path="/ManagerMain" component={ManagerMain} />
            <Route path="/Childkiosk" component={Childkiosk} />
            <Redirect to="/not-found" />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    </CommonContext.Provider>
  );
};

export default App;
