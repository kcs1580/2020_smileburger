import React, { useState, Fragment, useEffect } from "react";
// import BodyOrderHedaer from "./BodyOrderHedaer";
import BodyOrderChoiceList from "./BodyOrderChoiceList";
import BurgerListt from "../components/BurgerList";
import SideList from "../components/SideList";
import BeverageList from "../components/BeverageList";
import { makeStyles, AppBar, Toolbar, Grid, Paper } from "@material-ui/core";
// import { BrowserRouter, Switch, Route } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  appBar: {
    marginTop: "120px",
    height: "120px"
  },
  menuButton: {
    marginLeft: theme.spacing(2),
    height: "80px",
    width: "80px"
  },
  paper: {
    textAlign: "center",
    fontSize: "50px"
  },
  menuContext: {
    marginTop: "240px",
    height: "1060px"
  }
}));

const BodyOrder = () => {
  const classes = useStyles();
  const [list, setList] = useState(0);
  const menus = [
    { id: 0, text: "버거" },
    { id: 1, text: "사이드" },
    { id: 2, text: "음료" }
  ];

  const [temp, setTemp] = useState({
    contents: {},
    cnt: 0,
    price: 0
  });

  useEffect(() => {
    if (temp.burger) console.log(temp);
  }, [temp]);

  const BodyControl = () => {
    switch (list) {
      case 0:
        return <BurgerListt setTemp={setTemp} />;
      case 1:
        return <SideList />;
      case 2:
        return <BeverageList />;
      default:
        return <BurgerListt />;
    }
  };

  const menuList = menus.map(menu => {
    return (
      <Grid item xs={2} key={menu.id}>
        <Paper
          className={classes.paper}
          onClick={() => {
            setList(menu.id);
          }}
        >
          {menu.text}
        </Paper>
      </Grid>
    );
  });

  return (
    <Fragment>
      <AppBar position="fixed" className={classes.appBar} style={{ backgroundColor: "yellow" }}>
        <Toolbar style={{ height: "120px" }}>
          <Grid container spacing={4} justify="center">
            {menuList}
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.menuContext}>
        <BodyControl></BodyControl>
      </div>
      {/* 결제 화면=================================================== */}
      <BodyOrderChoiceList />
    </Fragment>
  );
};

export default BodyOrder;
