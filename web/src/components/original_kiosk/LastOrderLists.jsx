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

const LastOrderLists = ({ lastOrderLists, setOrder }) => {
  const classes = useStyles();
  const [totalCntList, setTotalCntList] = useState([]);
  const [totalCntSumList, setTotalCntSumList] = useState([]);
  const [totalPriceList, setTotalPriceList] = useState([]);
  const [totalPriceSumList, setTotalPriceSumList] = useState([]);
  const [orderShowList, setOrderShowList] = useState([]);
  const [orderDetailList, setOrderDetailList] = useState([]);

  useEffect(() => {
    const tempCntList = [];
    const tempCntSumList = [];
    const tempPriceList = [];
    const tempPriceSumList = [];
    const tempOrderList = [];
    const tempOrderDetailList = [];
    lastOrderLists.map(lastOrder => {
      // 주문수량
      let totalCnt = [];
      let totalCntSum = 0;
      lastOrder.ocontent.split("cnt").map((el, idx) => {
        if (idx !== 0) {
          totalCnt.push(Number(el.slice(el.indexOf(":") + 1, el.indexOf(","))));
          totalCntSum += Number(el.slice(el.indexOf(":") + 1, el.indexOf(",")));
        }
      });
      tempCntList.push(totalCnt);
      tempCntSumList.push(totalCntSum);

      // 주문가격
      let totalPrice = [];
      let totalPriceSum = 0;
      lastOrder.ocontent.split("price").map((el, idx) => {
        if (idx !== 0) {
          totalPrice.push(Number(el.slice(el.indexOf(":") + 1, el.indexOf("}"))));
          totalPriceSum += Number(el.slice(el.indexOf(":") + 1, el.indexOf("}")));
        }
      });
      tempPriceList.push(totalPrice);
      tempPriceSumList.push(totalPriceSum);

      // 주문내용
      let orderSummary = "";
      let eachOrderDetail = [];
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
          let tempOrderDetail = [];
          tempString.map((string, sIdx) => {
            if (sIdx % 2 === 1) {
              tempOrderDetail.push(string);
            }
          });
          console.log(tempOrderDetail);
          console.log(typeof tempOrderDetail);
          eachOrderDetail.push(tempOrderDetail);
        }
      });

      tempOrderList.push(orderSummary);
      tempOrderDetailList.push(eachOrderDetail);
    });
    setTotalCntList(tempCntList);
    setTotalCntSumList(tempCntSumList);
    setTotalPriceList(tempPriceList);
    setOrderShowList(tempOrderList);
    setOrderDetailList(tempOrderDetailList);
    setTotalPriceSumList(tempPriceSumList);
  }, []);

  return (
    <Grid container style={{ height: 1060, overflow: "auto" }}>
      <Grid item xs={12}>
        <Typography variant="h3" className={classes.title}>
          최근 주문 내역
        </Typography>
      </Grid>
      <Grid container style={{ marginLeft: 180, marginRight: 180 }}>
        <Grid item xs={2} className={classes.orderHeader}>
          날짜
        </Grid>
        <Grid item xs={5} className={classes.orderHeader}>
          내용
        </Grid>
        <Grid item xs={1} className={classes.orderHeader}>
          수량
        </Grid>
        <Grid item xs={2} className={classes.orderHeader}>
          금액
        </Grid>
        <Grid item xs={2} className={classes.orderHeader}>
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
            totalCntList={totalCntList}
            totalCntSumList={totalCntSumList}
            totalPriceList={totalPriceList}
            totalPriceSumList={totalPriceSumList}
            orderShowList={orderShowList}
            orderDetailList={orderDetailList}
          />
        );
      })}
    </Grid>
  );
};

export default LastOrderLists;
