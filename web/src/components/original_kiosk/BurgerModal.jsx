import React, { useState, useMemo, useEffect } from "react";
import {
  makeStyles,
  CardMedia,
  Dialog,
  Button,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
  Grid,
  Paper
} from "@material-ui/core";
import { CancelOutlined, AddBox, IndeterminateCheckBox } from "@material-ui/icons";
import BurgerModalSingleRequests from "./BurgerModalSingleRequests";
import BurgerModalSetRequests from "./BurgerModalSetRequests";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  dialogTitle1: {
    backgroundColor: "#f50057",
    width: "840px",
    height: 69,
    color: "white",
    padding: 0
  },
  dialogBody1: {
    display: "flex",
    width: "840px",
    padding: 0
  },
  dialogTitle2: {
    backgroundColor: "#f50057",
    width: "900px",
    height: 69,
    color: "white",
    padding: 0
  },
  dialogBody2: {
    display: "flex",
    width: "900px",
    padding: 0
  },
  details: {
    display: "flex",
    flexDirection: "column",
    paddingRight: 20,
    paddingTop: 20
  },
  img: {
    marginLeft: 20,
    marginRight: 40,
    marginTop: 10,
    marginBottom: 10,
    width: 420,
    height: 240
  },
  btnGridHeight: {
    height: 180
  },
  btnSingle: {
    color: "white",
    background: "#f50057",
    height: 100,
    width: 200
  },
  btnSet: {
    color: "white",
    background: "yellow",
    height: 100,
    width: 200
  },
  btnPosition: {
    textAlign: "center",
    paddingTop: 50
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    color: "white"
  },
  titleCss: {
    position: "absolute",
    left: theme.spacing(2),
    margin: 0,
    fontSize: 35,
    padding: 5
  }
}));

const BurgerMoal = ({
  burger,
  burgerSetId,
  burgerSetName,
  burgerSetPrice,
  burgerSetDesc,
  burgerSetImgurl,
  sides,
  beverages,
  requests,
  setOrder
}) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(0);
  const onClickIncCnt = () => {
    setCount(() => count + 1);
  };
  const onClickDecCnt = () => {
    setCount(() => {
      if (count > 2) {
        return count - 1;
      } else {
        return 1;
      }
    });
  };

  const getTotal = () => price * count;
  const total = useMemo(() => getTotal(), [count, price]);

  const [openSingle, setOpenSingle] = useState(false);
  const handleClickOpenSingle = () => {
    setOpen(false);
    setOpenSingle(true);
    setCount(1);
    setPrice(burger.pprice);
  };
  const handleCloseSingle = () => {
    setOpenSingle(false);
  };

  const [openSet, setOpenSet] = useState(false);
  const handleClickOpenSet = () => {
    setOpen(false);
    setOpenSet(true);
    setCount(1);
    setPrice(burgerSetPrice);
  };
  const handleCloseSet = () => {
    setOpenSet(false);
  };

  return (
    <div>
      <CardMedia
        className={classes.cardMedia}
        image={burger.pimgurl}
        title={burger.pname}
        onClick={handleClickOpen}
      />

      {/* 메뉴선택 모달 ----------------------------------------------------------------------------*/}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xl"
      >
        <DialogTitle id="alert-dialog-title" className={classes.dialogTitle1} onClose={handleClose}>
          <Typography className={classes.titleCss}>{burger.pname}</Typography>
          <IconButton className={classes.closeButton} onClick={handleClose}>
            <CancelOutlined style={{ fontSize: 45 }} />
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.dialogBody1}>
          <img src={burger.pimgurl} alt={burger.pname} className={classes.img} />
          <Typography component="h6" variant="h4" className={classes.details}>
            {burger.pdesc}
          </Typography>
        </DialogContent>
        <Grid container className={classes.btnGridHeight}>
          <Grid item xs={6} className={classes.btnPosition}>
            <Button
              className={classes.btnSingle}
              variant="contained"
              onClick={handleClickOpenSingle}
            >
              <Typography variant="h4">단품: {burger.pprice}</Typography>
            </Button>
          </Grid>
          <Grid item xs={6} className={classes.btnPosition}>
            <Button className={classes.btnSet} variant="contained" onClick={handleClickOpenSet}>
              <Typography variant="h4">세트: {burgerSetPrice}</Typography>
            </Button>
          </Grid>
        </Grid>
      </Dialog>

      {/* 단품선택 모달 ----------------------------------------------------------------------------*/}
      <Dialog
        open={openSingle}
        onClose={handleCloseSingle}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xl"
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          className={classes.dialogTitle2}
        >
          <Typography className={classes.titleCss}>단품선택</Typography>
          <IconButton className={classes.closeButton} onClick={handleCloseSingle}>
            <CancelOutlined style={{ fontSize: 45 }} />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers className={classes.dialogBody2}>
          <img src={burger.pimgurl} alt={burger.pname} className={classes.img} />
          <Typography component="h6" variant="h4" className={classes.details}>
            {/* <p>조리시간: {burger.cooking_time}분</p> */}
            {burger.pdesc}
          </Typography>
        </DialogContent>
        <Grid container>
          <Grid item xs={6}>
            <Paper elevation={0} style={{ textAlign: "center" }}>
              <IndeterminateCheckBox onClick={onClickDecCnt} style={{ color: "red" }} />
              {count}
              <AddBox onClick={onClickIncCnt} style={{ color: "red" }} />
            </Paper>
          </Grid>
          <Grid item xs={5}>
            <Paper elevation={0} style={{ textAlign: "Right" }}>
              <Typography variant="h4">{total}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={1} />
        </Grid>
        <BurgerModalSingleRequests
          burger={burger}
          handleCloseSingle={handleCloseSingle}
          setOrder={setOrder}
          count={count}
          total={total}
          requests={requests}
        />
      </Dialog>

      {/* 세트선택 모달 ----------------------------------------------------------------------------*/}
      <Dialog
        open={openSet}
        onClose={handleCloseSet}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xl"
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          className={classes.dialogTitle2}
        >
          <Typography className={classes.titleCss}>세트선택</Typography>
          <IconButton className={classes.closeButton} onClick={handleCloseSet}>
            <CancelOutlined style={{ fontSize: 45 }} />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers className={classes.dialogBody2}>
          <img src={burgerSetImgurl} alt={burgerSetName} className={classes.img} />
          <Typography component="h6" variant="h4" className={classes.details}>
            {burgerSetDesc}
          </Typography>
        </DialogContent>
        <Grid container>
          <Grid item xs={6}>
            <Paper elevation={0} style={{ textAlign: "center" }}>
              <IndeterminateCheckBox onClick={onClickDecCnt} style={{ color: "red" }} />
              {count}
              <AddBox onClick={onClickIncCnt} style={{ color: "red" }} />
            </Paper>
          </Grid>
          <Grid item xs={5}>
            <Paper elevation={0} style={{ textAlign: "Right" }}>
              <Typography variant="h4">{total}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={1} />
        </Grid>
        <BurgerModalSetRequests
          burgerSetId={burgerSetId}
          burgerSetName={burgerSetName}
          burgerSetPrice={burgerSetPrice}
          burgerSetDesc={burgerSetDesc}
          burgerSetImgurl={burgerSetImgurl}
          priceChanger={setPrice}
          handleCloseSet={handleCloseSet}
          setOrder={setOrder}
          count={count}
          total={total}
          sides={sides}
          beverages={beverages}
          requests={requests}
        />
      </Dialog>
    </div>
  );
};

export default BurgerMoal;
