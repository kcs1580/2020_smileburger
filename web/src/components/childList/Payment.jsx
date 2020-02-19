import React, { useMemo } from "react";
import { makeStyles, Grid, Paper, Typography, Button } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import PaymentModal from "./PaymentModal";
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles(theme => ({
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
  }
}));

const Payment = ({ orderList, setOrderList, waitingNum, setState }) => {
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
      <Typography>주문수량</Typography>
      <Paper className={classes.paper}>{totalCnt}</Paper>
      <Typography>주문금액</Typography>
      <Paper className={classes.paper}>{totalPrice}</Paper>
      <div>
        <Button className={classes.btnCancel} onClick={cancelAll}>
          전체취소
        </Button>
      </div>
      <PaymentModal className={classes.btnPayment} orderList={orderList} waitingNum={waitingNum} />
      <Grid contatiner="contatiner" style={{ marginTop: 10, fontSize: 40 }}>
        <Grid item xs={12}>
          장바구니
          <br />
          닫기
        </Grid>
        <Grid item xs={12}>
          <Icon style={{ top: 0, fontSize: 100 }}>cancel</Icon>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Payment;
