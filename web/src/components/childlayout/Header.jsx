import React, { useContext } from "react";

import * as Colors from "material-ui/styles/colors";
import {
  makeStyles,
  Typography,
  AppBar,
  Toolbar,
  IconButton
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { CommonContext } from "../context/CommonContext";
import { blue } from "@material-ui/core/colors";
const useStyles = makeStyles(theme => ({
  appBar: {
    height: "120px"
    // padding: `0 calc(10px + 2vw)`
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    cursor: "pointer"
  }
}));

const Header = props => {
  const classes = useStyles();
  const {} = useContext(CommonContext);

  const onClickDrawerOpenHandler = () => {
    alert("open Drawer");
  };

  const onClickSignInDialogOpenHandler = () => {
    alert("open signIn Dialog");
  };

  return (
    <AppBar
      position="fixed"
      className={classes.appBar}
      style={{ backgroundColor: "red" }}
    >
      <Toolbar style={{ height: "120px" }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onClickDrawerOpenHandler}
          edge="start"
          className={classes.menuButton}
        >
          {/* <MenuIcon /> */}
        </IconButton>
        <Typography
          variant="h6"
          className={classes.title}
          style={{ textAlign: "center" }}
        >
          Head
        </Typography>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={onClickSignInDialogOpenHandler}
          color="inherit"
          size="medium"
        >
          {/* <AccountCircle /> */}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
