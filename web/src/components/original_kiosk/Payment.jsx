import React, { useMemo } from "react";
import { makeStyles, Grid, Paper, Typography, Button } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import PaymentModal from "./PaymentModal";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    height: 50,
    fontSize: 30,
    marginBottom: 20
  },
  btnCancel: {
    color: "white",
    background: grey[700],
    height: 100,
    width: "100%",
    fontSize: 35,
    borderRadius: 15,
    marginBottom: 15
  }
}));

const Payment = ({ orderList, setOrderList, waitingNum }) => {
  const classes = useStyles();

  const getTotalCnt = () => {
    let total = 0;
    orderList.map(order => {
      total += order.cnt;
    });
    return total;
  };
  const getTotalPrice = () => {
    let total = 0;
    orderList.map(order => {
      total += order.price;
    });
    return total;
  };

  const totalCnt = useMemo(() => getTotalCnt());
  const totalPrice = useMemo(() => getTotalPrice());

  const cancelAll = () => {
    setOrderList([]);
  };

  return (
    <Grid item xs={3} style={{ height: 600, padding: 20 }}>
      <Typography style={{ fontSize: 30, marginTop: 10 }}>주문수량</Typography>
      <Paper className={classes.paper}>{totalCnt}</Paper>
      <Typography style={{ fontSize: 30 }}>주문금액</Typography>
      <Paper className={classes.paper}>{totalPrice}</Paper>
      <div>
        <Button className={classes.btnCancel} onClick={cancelAll}>
          전체취소
        </Button>
      </div>
      <PaymentModal orderList={orderList} waitingNum={waitingNum} />
    </Grid>
  );
};

export default Payment;
