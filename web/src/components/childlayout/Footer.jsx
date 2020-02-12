import React, { useContext } from "react";
import { makeStyles, Typography, AppBar, Toolbar } from "@material-ui/core";

import { CommonContext } from "../context/CommonContext";

const useStyles = makeStyles(theme => ({
  appBarFooter: {
    top: "auto",
    bottom: 0
  },
  toolbar: {
    minHeight: 30
  }
}));

const Footer = props => {
  const {} = useContext(CommonContext);

  const classes = useStyles();
  return (
    <AppBar
      position="fixed"
      className={classes.appBarFooter}
      style={{ backgroundColor: "red" }}
    >
      <Toolbar
        className={classes.toolbar}
        style={{ alignSelf: "center", height: "40px", fontWeight: "bold" }}
      >
        <Typography variant="body2">Footer</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
