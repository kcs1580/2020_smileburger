import React, { useState, useEffect } from "react";
import { makeStyles, Grid } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import OrderList from "./OrderList";
import Payment from "./Payment";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  container: {
    flexGrow: 1,
    height: "620px",
    textAlign: "center",
    background: grey[400]
  },
  text: {
    color: "white",
    padding: "0 auto",
    margin: "0"
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center"
  },
  btnCancel: {
    color: "white",
    background: grey[700],
    height: 100,
    width: "100%"
  },
  btnPayment: {
    color: "white",
    background: "red",
    height: 100,
    width: "100%"
  },
  listPaper: {
    height: 600,
    paddingTop: 20,
    paddingLeft: 20
  }
}));

const BodyOrderChoiceList = ({ orderList, setOrderList, setState, waitingNum }) => {
  const classes = useStyles();
  // 기존의 주문정보를 먼저 확인
  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} style={{ background: grey[700], height: 20 }}></Grid>
      {/* 왼쪽 주문목록정보======================================== */}
      <OrderList orderList={orderList} setOrderList={setOrderList} />
      {/* 오른쪽 결제확인======================================== */}
      <Payment
        orderList={orderList}
        setOrderList={setOrderList}
        setState={setState}
        waitingNum={waitingNum}
      />
    </Grid>
  );
};

export default BodyOrderChoiceList;
