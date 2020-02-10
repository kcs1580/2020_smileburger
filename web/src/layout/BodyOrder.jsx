import React, { useState, Fragment, useEffect } from "react";
import BodyOrderChoiceList from "./BodyOrderChoiceList";
import BurgerListt from "../components/original_kiosk/BurgerList";
import SideList from "../components/original_kiosk/SideList";
import BeverageList from "../components/original_kiosk/BeverageList";
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

  // 오더 리스트를 추가하는 부분
  useEffect(() => {
    if (order.contents) {
      // =======================================================
      let check = true;
      let checkIdx = 0;
      let editOrder = {};
      console.log("before: ", check);
      orderList.map((ord, idx) => {
        if (ord.contents.length === order.contents.length) {
          let cntCheck = 0;
          ord.contents.map((content, contentIdx) => {
            if (content === order.contents[contentIdx]) {
              cntCheck += 1;
            }
          });
          if (order.contents.length === cntCheck) {
            check = false;
            checkIdx = idx;
            editOrder = {
              id: ord.id,
              contents: ord.contents,
              cnt: ord.cnt + order.cnt,
              price: ord.price + order.price
            };
          }
        }
      });
      console.log("after: ", check);
      if (check) {
        const newOrderList = orderList.concat({
          id: "list" + nextId,
          contents: order.contents,
          cnt: order.cnt,
          price: order.price
        });
        setOrderList(newOrderList);
        setNextId(nextId + 1);
      } else {
        const newOrderList = [];
        orderList.map((ord, idx) => {
          if (idx === checkIdx) {
            newOrderList.push(editOrder);
          } else {
            newOrderList.push({
              id: ord.id,
              contents: ord.contents,
              cnt: ord.cnt,
              price: ord.price
            });
          }
        });
        setOrderList(newOrderList);
      }
      // =======================================================
    }
  }, [order]);

  const BodyControl = () => {
    switch (list) {
      case 0:
        return <BurgerListt setOrder={setOrder} />;
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
