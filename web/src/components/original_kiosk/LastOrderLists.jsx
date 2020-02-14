import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Container, Grid, Typography } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import LastOrderModal from "./LastOrderModal";

const useStyles = makeStyles(theme => ({
  title: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 30
  },
  orderHeader: {
    textAlign: "center",
    borderTop: "2px solid black",
    borderBottom: "2px solid black",
    height: 50
    // align: "center"
  }
}));

const LastOrderLists = ({ lastOrderLists, setOrder, waitingNum, orderList }) => {
  const classes = useStyles();
  const [totalCntList, setTotalCntList] = useState([]);
  const [totalPriceList, setTotalPriceList] = useState([]);
  const [orderShowList, setOrderShowList] = useState([]);
  const [orderDetailList, setOrderDetailList] = useState([]);

  useEffect(() => {
    const tempCntList = [];
    const tempPriceList = [];
    const tempOrderList = [];
    const tempOrderDetailList = [];
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
      // let tempOrderDetail = "";
      // let tempOrderDetail = [];
      const tempList = lastOrder.ocontent.split("contents");
      tempList.map((el, idx) => {
        if (idx !== 0) {
          const tempString = el.slice(el.indexOf("[") + 1, el.indexOf("]")).split('"');
          tempString.map((string, sIdx) => {
            if (sIdx === 1 && idx !== tempList.length - 1) {
              orderSummary += string + ", ";
            } else if (sIdx === 1 && idx === tempList.length - 1) {
              orderSummary += string;
            }
          });
          // tempString.map((string, sIdx) => {
          //   // if (sIdx % 2 === 1 && sIdx !== tempString.length - 2) {
          //   //   tempOrderDetail += string + ", ";
          //   // } else if (sIdx === tempString.length - 2) {
          //   //   tempOrderDetail += string;
          //   // }
          //   if
          // });
        }
      });
      tempOrderList.push(orderSummary);
      // tempOrderDetailList.push(tempOrderDetail);
    });
    setTotalCntList(tempCntList);
    setTotalPriceList(tempPriceList);
    setOrderShowList(tempOrderList);
    // setOrderDetailList(tempOrderDetailList);
  }, []);

  return (
    <Grid container style={{ height: 1060, overflow: "auto" }}>
      <Grid item xs={12}>
        <Typography variant="h3" className={classes.title}>
          최근 주문 내역
        </Typography>
      </Grid>
      <Grid container style={{ marginLeft: 180, marginRight: 180 }}>
        <Grid itme xs={2} className={classes.orderHeader}>
          날짜
        </Grid>
        <Grid itme xs={5} className={classes.orderHeader}>
          내용
        </Grid>
        <Grid itme xs={1} className={classes.orderHeader}>
          수량
        </Grid>
        <Grid itme xs={2} className={classes.orderHeader}>
          금액
        </Grid>
        <Grid itme xs={2} className={classes.orderHeader}>
          주문
        </Grid>
      </Grid>
      {lastOrderLists.map((lastOrder, idx) => {
        return (
          <LastOrderModal
            key={lastOrder.oid}
            idx={idx}
            lastOrder={lastOrder}
            setOrder={setOrder}
            orderList={orderList}
            totalCntList={totalCntList}
            totalPriceList={totalPriceList}
            orderShowList={orderShowList}
            orderDetailList={orderDetailList}
          />
        );
      })}
    </Grid>
  );
};

export default LastOrderLists;
