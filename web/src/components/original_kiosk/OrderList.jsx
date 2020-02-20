import React, { useState, useEffect, useMemo } from "react";
import {
  makeStyles,
  Grid,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";
import { AddBox, IndeterminateCheckBox, Close } from "@material-ui/icons";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  text: {
    color: "white",
    padding: "0 auto",
    margin: "0"
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center"
  },
  listPaper: {
    height: 600,
    paddingTop: 20,
    paddingLeft: 20
  },
  tableHeadCell: {
    textAlign: "center",
    fontSize: 30
  }
}));

const OrderList = ({ orderList, setOrderList }) => {
  const classes = useStyles();

  const incCnt = ordId => {
    let temp = [];
    orderList.map(order => {
      if (order.id === ordId) {
        temp.push({
          id: order.id,
          contents: order.contents,
          cnt: order.cnt + 1,
          price: (order.price / order.cnt) * (order.cnt + 1)
        });
      } else {
        temp.push({
          id: order.id,
          contents: order.contents,
          cnt: order.cnt,
          price: order.price
        });
      }
    });
    setOrderList(temp);
  };
  const decCnt = ordId => {
    let temp = [];
    orderList.map(order => {
      if (order.id === ordId && order.cnt > 1) {
        temp.push({
          id: order.id,
          contents: order.contents,
          cnt: order.cnt - 1,
          price: (order.price / order.cnt) * (order.cnt - 1)
        });
      } else {
        temp.push({
          id: order.id,
          contents: order.contents,
          cnt: order.cnt,
          price: order.price
        });
      }
    });
    setOrderList(temp);
  };
  const deleteList = ordId => {
    let temp = [];
    orderList.map(order => {
      if (order.id !== ordId) {
        temp.push({
          id: order.id,
          contents: order.contents,
          cnt: order.cnt,
          price: order.price
        });
      }
    });
    setOrderList(temp);
  };

  useEffect(() => {
    // console.log("OrderList.jsx 의 orderList");
    console.log(orderList);
  }, [orderList]);

  return (
    <Grid item xs={9} className={classes.listPaper}>
      <Paper style={{ height: 560 }}>
        <TableContainer style={{ height: 560 }}>
          <Table>
            <TableHead>
              <TableRow style={{ background: grey[400] }}>
                <TableCell style={{ minWidth: 390 }} className={classes.tableHeadCell}>
                  제품명
                </TableCell>
                <TableCell style={{ minWidth: 200 }} className={classes.tableHeadCell}>
                  수량
                </TableCell>
                <TableCell style={{ minWidth: 200 }} className={classes.tableHeadCell}>
                  금액
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderList.map(order => {
                // console.log(typeof order.contents);
                // console.log(order.contents);
                return (
                  <TableRow key={order.id}>
                    {/* 제품목록 보여주는 cell */}
                    <TableCell style={{ fontSize: 25 }}>
                      {order.contents.map((content, idx) => {
                        if (idx === order.contents.length - 1) {
                          return content;
                        } else {
                          return content + ", ";
                        }
                      })}
                    </TableCell>
                    {/* 제품수량 보여주는 cell */}
                    <TableCell style={{ textAlign: "center", fontSize: 25 }}>
                      <IndeterminateCheckBox
                        style={{ color: "red" }}
                        onClick={() => decCnt(order.id)}
                      />
                      {order.cnt}
                      <AddBox style={{ color: "red" }} onClick={() => incCnt(order.id)} />
                    </TableCell>
                    {/* 제품가격 보여주는 cell */}
                    <TableCell style={{ textAlign: "center", fontSize: 25 }}>
                      {order.price}
                      <Close style={{ color: "red" }} onClick={() => deleteList(order.id)} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Grid>
  );
};

export default OrderList;
