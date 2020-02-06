import React, { useState, Fragment, useEffect, useMemo } from "react";
import BodyOrderChoiceList from "./BodyOrderChoiceList";
import BurgerListt from "../components/BurgerList";
import SideList from "../components/SideList";
import BeverageList from "../components/BeverageList";
import { makeStyles, AppBar, Toolbar, Grid, Paper } from "@material-ui/core";

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

  const [order, setOrder] = useState({});
  const [orderList, setOrderList] = useState([]);
  const [nextId, setNextId] = useState(0);

  useEffect(() => {
    if (order.contents) {
      const newOrderList = orderList.concat({
        id: order.id,
        contents: order.contents,
        cnt: order.cnt,
        price: order.price
      });
      setOrderList(newOrderList);
    }
  }, [order]);

  const BodyControl = () => {
    switch (list) {
      case 0:
        return (
          <BurgerListt
            nextId={nextId}
            setNextId={setNextId}
            setOrder={setOrder}
          />
        );
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
      <AppBar
        position="fixed"
        className={classes.appBar}
        style={{ backgroundColor: "yellow" }}
      >
        <Toolbar style={{ height: "120px" }}>
          <Grid container spacing={4} justify="center">
            {menuList}
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.menuContext}>
        <BodyControl></BodyControl>
      </div>
      {/* 주문확인 및 결제 컴포넌트=================================================== */}
      <BodyOrderChoiceList
        // order={order}
        orderList={orderList}
        setOrderList={setOrderList}
      />
    </Fragment>
  );
};

export default BodyOrder;
