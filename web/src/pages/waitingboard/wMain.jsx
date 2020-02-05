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
    height: "502px"
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
        container
        spacing={1}
        style={{
          padding: "1%"
        }}
      >
        <Grid item xs={5} className={classes.done}>
          <Paper className={classes.paper1}>준비완료</Paper>
          <Done />
        </Grid>
 
        <Grid item xs={7} className={classes.waiting}>
          <Paper className={classes.paper2}>준비중</Paper>
          <Waiting />
        </Grid>
      </Grid>
    </div>
  );
}
