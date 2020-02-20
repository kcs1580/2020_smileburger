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
    <Grid item xs={3} style={{ height: 500, padding: 20 }}>
      <Typography variant="h4" style={{ margin: 20 }}>
        주문수량
      </Typography>
      <Paper className={classes.paper}>
        <Typography variant="h3" style={{ margin: 10 }}>
          {totalCnt}
        </Typography>
      </Paper>
      <Typography variant="h4" style={{ margin: 20 }}>
        주문금액
      </Typography>

      <Paper className={classes.paper}>
        <Typography variant="h3" style={{ margin: 10 }}>
          {" "}
          {totalPrice}
        </Typography>
      </Paper>
      <div style={{ marginTop: 20, marginBottom: 20 }}>
        <Button className={classes.btnCancel} onClick={cancelAll}>
          <Typography variant="h4" style={{ margin: 10 }}>
            전체취소
          </Typography>
        </Button>

        <PaymentModal
          className={classes.btnPayment}
          orderList={orderList}
          waitingNum={waitingNum}
        />
      </div>
    </Grid>
  );
};

export default Payment;
