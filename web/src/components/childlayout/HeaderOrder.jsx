import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles, Typography, AppBar, Toolbar, Fab } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "fixed",
    top: ""
  },
  menuButton: {
    marginLeft: theme.spacing(2),
    height: "6rem",
    width: "6rem",
    fontSize: "30px",
    color: "#3f51b5",
    backgroundColor: "whitesmoke"
  },
  title: {
    flexGrow: 1
  }
}));

const HeaderOrder = props => {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar}>
      <Toolbar
        style={{
          height: "130px"
        }}
      >
        <Typography
          variant="h3"
          className={classes.title}
          style={{
            textAlign: "center"
          }}
        >
          안녕하세요 스마일 버거 입니다.
        </Typography>
        <Link
          to="/auth"
          style={{
            textDecoration: "none"
          }}
        >
          <Fab className={classes.menuButton}>첫화면</Fab>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderOrder;
