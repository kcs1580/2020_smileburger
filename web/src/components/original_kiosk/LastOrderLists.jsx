import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Container, Grid, Typography } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  title: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 30
  },
  paper: {
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 180,
    marginRight: 180,
    height: 150,
    padding: theme.spacing(2)
  }
}));

const LastOrderLists = ({ lastOrderLists, setOrder }) => {
  const classes = useStyles();

  const [totalCntList, setTotalCntList] = useState([]);
  const [totalPriceList, setTotalPriceList] = useState([]);
  const [orderDetailList, setOrderDetailList] = useState([]);
  // const [tempNum, setTempNum] = useState(0);

  useEffect(() => {
    const tempCntList = [];
    const tempPriceList = [];
    const tempOrderList = [];
    lastOrderLists.map(lastOrder => {
      // 주문수량
      let totalCnt = 0;
      lastOrder.ocontent.split("cnt").map((el, idx) => {
        if (idx !== 0) {
          totalCnt += Number(el.slice(el.indexOf(":") + 1, el.indexOf(",")));
        }
      });
      tempCntList.push(totalCnt);

      // 주문가격
      let totalPrice = 0;
      lastOrder.ocontent.split("price").map((el, idx) => {
        if (idx !== 0) {
          totalPrice += Number(el.slice(el.indexOf(":") + 1, el.indexOf("}")));
        }
      });
      tempPriceList.push(totalPrice);

      // 주문내용
      let orderSummary = "";
      const asdf = lastOrder.ocontent.split("contents");
      asdf.map((el, idx) => {
        if (idx !== 0) {
          const tempString = el.slice(el.indexOf("[") + 1, el.indexOf("]")).split('"');
          tempString.map((string, sIdx) => {
            if (sIdx === 1 && idx !== asdf.length - 1) {
              orderSummary += string + ", ";
            } else if (sIdx === 1 && idx === asdf.length - 1) {
              orderSummary += string;
            }
          });
        }
      });
      tempOrderList.push(orderSummary);
    });
    setTotalCntList(tempCntList);
    setTotalPriceList(tempPriceList);
    setOrderDetailList(tempOrderList);
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h3" className={classes.title}>
          최근 주문 내역
        </Typography>
      </Grid>
      {lastOrderLists.map((lastOrder, idx) => {
        console.log(typeof orderDetailList[idx]); // object 타입
        return (
          <Grid key={lastOrder.oid} item xs={12}>
            <Paper className={classes.paper}>
              <Typography>{lastOrder.odate}</Typography>
              <p>주문수량: {totalCntList[idx]}</p>
              <p>주문가격: {totalPriceList[idx]}</p>
              <p>주문내용: {orderDetailList[idx]}</p>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default LastOrderLists;
