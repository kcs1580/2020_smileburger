import React, { Fragment, useContext } from "react";
import Header from "./Header";
import Footer from "./Footer";

import { CssBaseline, Container, makeStyles } from "@material-ui/core";
import { CommonContext } from "../context/CommonContext";

const useStyles = makeStyles(theme => ({
  content: {
    margin: "0 auto"
  },
  container: {
    marginTop: "120px",
    marginBottom: "30px"
  }
}));

const Layout = props => {
  const classes = useStyles();
  const {} = useContext(CommonContext);

  return (
    <Fragment>
      <CssBaseline />
      <Header />
      <div className={classes.content} style={{ width: "100%" }}>
        <div style={{ textAlign: "center" }}>{props.children}</div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Layout;
