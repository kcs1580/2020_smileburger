import React from "react";
import { makeStyles, Grid, Paper, Typography, Button } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import OrderList from "../components/original_kiosk/OrderList";
import Payment from "../components/original_kiosk/Payment";

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

const BodyOrderChoiceList = ({ orderList, setOrderList, waitingNum }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Grid container>
        <Grid item xs={12} style={{ background: grey[700], height: 20 }}></Grid>
        {/* 왼쪽 주문목록정보======================================== */}
        <OrderList orderList={orderList} setOrderList={setOrderList} />
        {/* 오른쪽 결제확인======================================== */}
        <Payment orderList={orderList} setOrderList={setOrderList} waitingNum={waitingNum} />
      </Grid>
    </div>
  );
};

export default BodyOrderChoiceList;
