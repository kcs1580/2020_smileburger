import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles, Typography, AppBar, Toolbar, Fab } from "@material-ui/core";
import topImg from "../components/slick/topBanner2.jpg";

const useStyles = makeStyles(theme => ({
  appBar: {
    height: "120px"
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
      <Toolbar style={{ height: "120px", padding: 0 }}>
        <img src={topImg} />
      </Toolbar>
    </AppBar>
  );
};

export default HeaderOrder;
