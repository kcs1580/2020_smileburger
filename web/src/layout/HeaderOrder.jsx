import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles, Typography, AppBar, Toolbar, Fab } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  appBar: {
    height: "120px"
  },
  menuButton: {
    marginLeft: theme.spacing(2),
    height: "80px",
    width: "80px",
    fontSize: "25px"
  },
  title: {
    flexGrow: 1
  }
}));

const HeaderOrder = props => {
  const classes = useStyles();
  function reset() {
    localStorage.clear();
  }
  return (
    <AppBar position="fixed" className={classes.appBar} style={{ backgroundColor: "#f50057" }}>
      <Toolbar style={{ height: "120px" }}>
        <Typography variant="h6" className={classes.title} style={{ textAlign: "center" }}>
          Head-Order
        </Typography>
        <Link to="/Auth" style={{ textDecoration: "none" }}>
          <Fab onClick={reset} className={classes.menuButton}>
            첫화면
          </Fab>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderOrder;
