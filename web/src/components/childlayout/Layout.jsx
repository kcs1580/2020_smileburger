import React, { Fragment, useContext } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Carousel from "../components/main/SectionCarousel";
import { CssBaseline, Container, makeStyles } from "@material-ui/core";
import { CommonContext } from "../context/CommonContext";

const useStyles = makeStyles(theme => ({
  content: {
    margin: "0 auto"
  },
  container: {
    marginTop: "120px",
    marginBottom: "30px"
  },
  adcontent: {
    width: 1080,
    height: 400
  }
}));

const Layout = props => {
  const classes = useStyles();
  const {} = useContext(CommonContext);

  return (
    <Fragment>
      <div>
        <CssBaseline />
        <Header />
        <Container className={classes.content} maxWidth="xl">
          <div className={classes.container} style={{ textAlign: "center" }}>
            {props.children}
          </div>
        </Container>
        <Container className={classes.adcontent}></Container>
        <Footer />
      </div>
    </Fragment>
  );
};

export default Layout;
