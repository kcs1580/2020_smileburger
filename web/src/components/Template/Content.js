import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Pagination from "material-ui-flat-pagination";
import socketio from "socket.io-client";

const socket = socketio.connect("http://localhost:3001");

(() => {
  socket.emit("joinRoom", { roomName: "myroom" });
  console.log("h2");
})();

const useStyles = makeStyles(theme => ({
  paper: {
    maxWidth: 1800,
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: '40px 16px',
  },
  Card: {
    height: 250,
    width: 250,
    margin: '20px 0px'
  },
}))

const Content = () => {
  const classes = useStyles();
  const [pageidx, setPageidx] = useState(0)
  const [orders, setOrder] = useState([])

  socket.on("recMsg", data => {
    console.log(data);
    const or = {
      orderNum: data.oid,
      itemList: {
        menu: data.oproducts,
        ea: data.ostore
      }
    }
    setOrder(orders.concat(or))
  });

  let temporder = [0, 0, 0, 0, 0, 0, 0, 0]
  const arrmake = () => {
    for (let i = 1; i < orders.length / 8; i++) {
      temporder.push(0, 0, 0, 0, 0, 0, 0, 0)
    }
    for (let j = 0; j < orders.length; j++) {
      temporder[j] = orders[j]
    }
  }
  arrmake()

  // 데이터 전부를 받아 전부 card로 만듬
  const orderCard = temporder.map((order, idx) => {
    if (order === 0) {
      return (
        <Card className={classes.Card} variant="outlined" display="inline" key={idx} />

      )
    }
    else {
      return (
        <Card className={classes.Card} variant="outlined" display="inline" key={idx} onClick={() => { console.log("aa") }}>
          <CardContent>
            <Typography className={classes.numbering} color="textSecondary" align="center">
              {order.orderNum}
            </Typography>
            <h3>{order.itemList.menu}</h3>
            <h4>{order.itemList.ea}</h4>
          </CardContent>
        </Card>
      )
    }
  })
  // orderCard 중 8개를 받아 하나의 페이지에 출력할 데이터만 뽑음
  const orderList = (idx) => {
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
    )
  }

  const testinput = () => {
    const or = {
      orderNum: 114,
      itemList: {
        menu: "감자튀김",
        ea: 5
      }
    }
    setOrder(orders.concat(or))
  }

  const pageClick = (isForward) => {
    if (isForward) {
      if (pageidx + 1 < parseInt(orderCard.length / 8)) {
        setPageidx(pageidx + 1)
      } else {
        setPageidx(0)
      }
    } else {
      if (pageidx - 1 >= 0) {
        setPageidx(pageidx - 1)
      } else {
        setPageidx(parseInt(orderCard.length / 8) - 1)
      }
    }

  }

  return (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item xs={1} container justify="center" alignItems="center">
          <Button variant="contained" onClick={() => { pageClick(false) }}><ArrowBackIcon /></Button>
        </Grid>
        <Grid item xs={10}>
          {orderList(pageidx + 1)}
        </Grid>
        <Grid item xs={1} container justify="center" alignItems="center">
          <Button variant="contained" onClick={() => { pageClick(true) }}><ArrowForwardIcon /></Button>
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Button variant="contained" onClick={() => { testinput() }}> 데이터 삽입</Button>
        <Pagination
          limit={1}
          offset={pageidx}
          total={orderCard.length / 8}
          onClick={(e, offset) => setPageidx(offset)}
        />
      </Grid>
    </Paper >
  );
}


export default Content