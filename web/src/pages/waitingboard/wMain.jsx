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
    height: "1050px",
    width: "1900spx",
    padding: "15px"
  },
  container: {
    margin: "auto auto"
  },
  done: {
    border: "solid",
    borderColor: "white",
    fontSize: "40px",
    color: "yellow",
    textAlign: "center",
    fontWeight: "bold",
    height: "1050px"
  },
  waiting: {
    border: "solid",
    borderColor: "white",
    fontSize: "40px",
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    height: "1050px"
  },
  paper: {
    backgroundColor: "#f50057",
    color: "white",
    padding: "20px"
  },

  des: {
    fontSize: "25px"
  },
  title: {
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
      <Grid className={classes.container} container spacing={1} style={{}}>
        <Grid item xs={5} className={classes.done}>
          <Paper className={classes.paper} color="secondary">
            <div className={classes.title}>준비완료 | Ready</div>
            <div className={classes.des}>영수증 상단의 주문번호를 확인하세요.</div>
          </Paper>
          <Done />
        </Grid>

        <Grid item xs={7} className={classes.waiting}>
          <Paper className={classes.paper}>
            <div className={classes.title}>준비중 | Preparing</div>
            <div className={classes.des}>음식이 준비중이예요!</div>
          </Paper>
          <Waiting />
        </Grid>
      </Grid>
    </div>
  );
}
