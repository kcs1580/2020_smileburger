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




function Content() {
  const classes = useStyles();
  const [orders, setOrder] = useState([{
    orderNum: 101,
    itemList: {
      menu: "hamberger",
      ea: 2
    }
  },
    0, 0, 0, 0, 0, 0, 0])

  // 데이터 전부를 받아 전부 card로 만듬
  const orderCard = orders.map((order, idx) => {
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
  const orderList = (orderCard) => {
    return (
      <>

        <Grid container justify="space-between">
          {orderCard.slice(0, 4)}
        </Grid>
        <br />
        <Grid container justify="space-between">
          {orderCard.slice(4, 8)}
        </Grid>

      </>

    )
  }

  return (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item xs={1} container justify="center" alignItems="center">
          <Button variant="contained"><ArrowBackIcon /></Button>
        </Grid>
        <Grid item xs={10}>
          {orderList(orderCard)}
        </Grid>
        <Grid item xs={1} container justify="center" alignItems="center">
          <Button variant="contained"><ArrowForwardIcon /></Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Content