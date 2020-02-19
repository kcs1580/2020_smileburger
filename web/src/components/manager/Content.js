import React, { useState, Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Pagination from "material-ui-flat-pagination";
import socketio from "socket.io-client";
import axios from "axios";
import Badge from '@material-ui/core/Badge';
import Paper from '@material-ui/core/Paper';


// const socket = socketio.connect("http://i02c103.p.ssafy.io:3001");
const socket = socketio.connect("http://localhost:3001");

(() => {
  socket.emit("joinRoom", { roomName: "myroom" });
  socket.emit("Front2Back", { data: "data" });
  console.log("h2");
})();

const useStyles = makeStyles(theme => ({
  paper: {
    maxWidth: "100%",
    margin: "auto",
    overflow: "hidden"
  },
  block: {
    display: "block"
  },
  Card: {
    height: 360,
    width: 270,
    margin: "15px 0px"
  },
  numbering: {
    fontSize: "20px"
  }
}));

const Content = () => {
  const classes = useStyles();
  const [pageidx, setPageidx] = useState(0);
  const [orders, setOrder] = useState([]);

  socket.on("Back2Front", data => {
    const tempCntList = [];
    const tempOrderDetailList = [];
    const tempObj = []

    // console.log(data)

    data.map((order) => {
      let totalCnt = [];
      // 주문 수량
      order.ocontent.split("cnt").map((el, idx) => {
        if (idx !== 0) {
          totalCnt.push(Number(el.slice(el.indexOf(":") + 1, el.indexOf(","))));
        }

      });
      tempCntList.push(totalCnt);
      console.log(tempCntList)

      // 주문내용
      let eachOrderDetail = [];
      const tempList = order.ocontent.split("contents");
      tempList.map((el, idx) => {
        if (idx !== 0) {
          const tempString = el.slice(el.indexOf("[") + 1, el.indexOf("]")).split('"');

          let tempOrderDetail = [];
          tempString.map((string, sIdx) => {
            if (sIdx % 2 === 1) {
              tempOrderDetail.push(string);
            }
          });
          eachOrderDetail.push(tempOrderDetail);
        }
      });

      tempOrderDetailList.push(eachOrderDetail);
    })

    console.log(tempCntList)
    console.log(tempOrderDetailList)
    const ord = data.map((order, idx) => {

      tempObj.push({
        orderNum: order.owaitingNum,

      })
    })
    // setOrder(data);
    // const ord = data.map((order) => {
    //   console.log(order)
    // })
  });

  const readychange = order => {
    if (order.isready === "0") {
      order.isready = "1";
      axios
        // .get("http://i02c103.p.ssafy.io:3001/ready2complete", { params: { oid: order.oid } })
        .get("http://localhost:3001/ready2complete", { params: { oid: order.oid } })
        .then(res => {
          socket.emit("Front2Back", { data: "data" });
          socket.emit("recMsg", { data: "data" });
          // console.log("update success")
          // console.log(res);
        });
    } else if (order.isready === "1") {
      order.isready = "2";
      axios
        .get("http://localhost:3001/complete2out", { params: { oid: order.oid } })
        .then(res => {
          socket.emit("Front2Back", { data: "data" });
          socket.emit("recMsg", { data: "data" });
          // console.log(res);
        });
    }

    // console.log(order);
    // console.log(order.oid);
  };

  let temporder = [0, 0, 0, 0, 0, 0, 0, 0];
  const arrmake = () => {
    for (let i = 1; i < orders.length / 8; i++) {
      temporder.push(0, 0, 0, 0, 0, 0, 0, 0);
    }
    for (let j = 0; j < orders.length; j++) {
      temporder[j] = orders[j];
    }
  };
  arrmake();

  // 데이터 전부를 받아 전부 card로 만듬
  const orderCard = temporder.map((order, idx) => {
    if (order === 0) {
      return <Card className={classes.Card} variant="outlined" display="inline" key={idx} />;
    } else {
      const MenuHTML = order.contents.map((menuidx, idx) => {
        return (
          <h5 key={idx}>
            {menuidx.menu} X {menuidx.cnt}
          </h5>
        );
      });
      if (order.is)
        if (order.isready === "1") {
          return (
            <Badge color="secondary" overlap="rectangle" badgeContent="포" key={idx}>
              <Card
                className={classes.Card}
                variant="outlined"
                display="inline"
                style={{ backgroundColor: "yellow" }}
                onClick={() => {
                  readychange(order);
                }}
              >
                <CardContent>
                  <Typography variant="h2" color="textSecondary" align="center">
                    {order.orderNum}
                  </Typography>
                  <hr />
                  {MenuHTML}
                  {/* <h3>{order.itemList.menu}</h3> */}
                  {/* <h4>{order.itemList.ea}</h4> */}
                </CardContent>
              </Card>
            </Badge>

          );
        } else {
          return (
            <Card
              className={classes.Card}
              variant="outlined"
              display="inline"
              key={idx}
              onClick={() => {
                readychange(order);
              }}
            >
              <CardContent>
                <Typography variant="h2" color="textSecondary" align="center">
                  {order.orderNum}
                </Typography>
                <hr />
                {MenuHTML}
                {/* <h3>{order.itemList.menu}</h3> */}
                {/* <h4>{order.itemList.ea}</h4> */}
              </CardContent>
            </Card>
          );
        }
    }
  });
  // orderCard 중 8개를 받아 하나의 페이지에 출력할 데이터만 뽑음
  const orderList = idx => {
    return (
      <>
        <Grid container justify="space-between">
          {orderCard.slice((idx - 1) * 8 + 0, (idx - 1) * 8 + 4)}
        </Grid>
        <br />
        <Grid container justify="space-between">
          {orderCard.slice((idx - 1) * 8 + 4, (idx - 1) * 8 + 8)}
        </Grid>
      </>
    );
  };

  const pageClick = isForward => {
    if (isForward) {
      if (pageidx + 1 < parseInt(orderCard.length / 8)) {
        setPageidx(pageidx + 1);
      } else {
        setPageidx(0);
      }
    } else {
      if (pageidx - 1 >= 0) {
        setPageidx(pageidx - 1);
      } else {
        setPageidx(parseInt(orderCard.length / 8) - 1);
      }
    }
  };

  return (
    <Fragment>
      <Grid container>
        <Grid item xs={1} container justify="center" alignItems="center">
          <Button
            variant="contained"
            onClick={() => {
              pageClick(false);
            }}
          >
            <ArrowBackIcon />
          </Button>
        </Grid>
        <Grid item xs={10}>
          {orderList(pageidx + 1)}
        </Grid>
        <Grid item xs={1} container justify="center" alignItems="center">
          <Button
            variant="contained"
            onClick={() => {
              pageClick(true);
            }}
          >
            <ArrowForwardIcon />
          </Button>
        </Grid>
      </Grid>
      <Grid container justify="center">
        {/* <Button variant="contained" onClick={() => { testinput() }}> 데이터 삽입</Button> */}
        <Pagination
          limit={1}
          offset={pageidx}
          total={orderCard.length / 8}
          onClick={(e, offset) => setPageidx(offset)}
        />
      </Grid>
    </Fragment>
  );
};

export default Content;
