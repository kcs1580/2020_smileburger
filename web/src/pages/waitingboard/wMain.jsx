import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Done from "../../components/wBoard/Done";
import Waiting from "../../components/wBoard/Waiting";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "black",
    height: "500px",
    padding: "0.5%"
  },
  done: {
    border: "solid",
    borderColor: "white",
    fontSize: "40px",
    color: "yellow",
    textAlign: "center",
    fontWeight: "bold",
    height: "500px"
  },
  waiting: {
    border: "solid",
    borderColor: "white",
    fontSize: "40px",
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    height: "500px"
  },
  des1: {
    fontSize: "25px"
  },
  des2: {
    fontSize: "20px"
  },
  title1: {
    fontSize: "35px"
  },
  title2: {
    fontSize: "35px"
  }
}));

const initialState = {
  informaion: []
};
const id = 0;

export default function FullWidthGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1} style={{}}>
        <Grid item xs={5} className={classes.done}>
          <Paper className={classes.paper1}>
            <div className={classes.title1}>준비완료 | Ready</div>
            <div className={classes.des1}>영수증 상단의 주문번호를 확인하세요.</div>
          </Paper>
          <Done />
        </Grid>

        <Grid item xs={7} className={classes.waiting}>
          <Paper className={classes.paper2}>
            <div className={classes.title2}>준비중 | Preparing</div>
            <div className={classes.des2}>음식이 준비중이예요!</div>
          </Paper>
          <Waiting />
        </Grid>
      </Grid>
    </div>
  );
}
