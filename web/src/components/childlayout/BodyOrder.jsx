import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles, Grid } from "@material-ui/core";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import image1 from "../../img/menuimg/burger.jpg";
import image2 from "../../img/menuimg/coke.jpg";
import image3 from "../../img/menuimg/french.jpg";

const useStyles = makeStyles(theme => ({
  Button: {
    width: "100%",
    height: "100%",
    fontSize: "100px"
  },
  buttongrid: {
    height: "470px",
    width: "470px",
    fontSize: "15px",
    border: "solid"
  },
  container: {},
  root: {
    display: "flex",
    flexWrap: "wrap",
    minWidth: 300,
    width: "1080px"
  },
  image: {
    position: "relative",
    height: 200,
    [theme.breakpoints.down("xs")]: {
      width: "100% !important", // Overrides inline-style
      height: 100
    },
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.15
      },
      "& $imageMarked": {
        opacity: 0
      },
      "& $imageTitle": {
        border: "4px solid currentColor"
      }
    }
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%"
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity")
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity")
  }
}));

const BodyOrder = ({ select, setSelect }) => {
  const classes = useStyles();
  const [orderList, setOrderList] = useState([]);

  return (
    <Grid container="container" className={classes.container}>
      <div className={classes.root}>
        <Grid item xs={5} className={classes.buttongrid}>
          <ButtonBase
            focusRipple="focusRipple"
            key="버거"
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
            onClick={() => {
              setSelect(1);
            }}
            style={{
              width: "100%",
              height: "100%"
            }}
          >
            <span
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${image1})`
              }}
            />
            <span className={classes.imageBackdrop} />
            <span className={classes.imageButton}>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                className={classes.imageTitle}
              >
                버거
                <span className={classes.imageMarked} />
              </Typography>
            </span>
          </ButtonBase>
        </Grid>
        <Grid item xs={4} className={classes.buttongrid}>
          <ButtonBase
            focusRipple="focusRipple"
            key="음료"
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
            onClick={() => {
              setSelect(1);
            }}
            style={{
              width: "100%",
              height: "100%"
            }}
          >
            <span
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${image2})`
              }}
            />
            <span className={classes.imageBackdrop} />
            <span className={classes.imageButton}>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                className={classes.imageTitle}
              >
                음료
                <span className={classes.imageMarked} />
              </Typography>
            </span>
          </ButtonBase>
        </Grid>
        <Grid item xs={3} className={classes.buttongrid}>
          <ButtonBase
            focusRipple="focusRipple"
            key="사이드"
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
            onClick={() => {
              setSelect(1);
            }}
            style={{
              width: "100%",
              height: "100%"
            }}
          >
            <span
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${image3})`
              }}
            />
            <span className={classes.imageBackdrop} />
            <span className={classes.imageButton}>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                className={classes.imageTitle}
              >
                사이드
                <span className={classes.imageMarked} />
              </Typography>
            </span>
          </ButtonBase>
        </Grid>
      </div>
    </Grid>
  );
};

export default BodyOrder;
