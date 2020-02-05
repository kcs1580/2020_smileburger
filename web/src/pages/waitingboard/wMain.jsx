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
    height: "540px"
  },
  done: {
    border: "solid",
    borderColor: "white",
    fontSize: "40px",
    color: "yellow",
    textAlign: "center",
    fontWeight: "bold"
  },
  waiting: {
    border: "solid",
    borderColor: "white",
    fontSize: "40px",
    color: "white",
    textAlign: "center",
    fontWeight: "bold"
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
      <Grid
        container="container"
        spacing={1}
        style={{
          padding: "1%"
        }}
      >
        <Grid item="item" xs={5} className={classes.done}>
          <Paper className={classes.paper1}>준비완료</Paper>
          <Done />
        </Grid>

        <Grid item="item" xs={7} className={classes.waiting}>
          <Paper className={classes.paper2}>준비중</Paper>
          <Waiting />
        </Grid>
      </Grid>
    </div>
  );
}
