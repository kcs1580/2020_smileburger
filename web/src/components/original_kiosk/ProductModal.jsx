import React, { useState, useMemo } from "react";
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

const useStyles = makeStyles(theme => ({
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  dialogTitle1: {
    backgroundColor: "red",
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
    backgroundColor: "red",
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
    paddingRight: 20
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
    background: "red",
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
  },
  btnCommit: {
    color: "white",
    background: "red",
    height: 100,
    width: 200
  },
  btnCancel: {
    color: "white",
    background: "grey",
    height: 100,
    width: 200
  }
}));

const ProductModal = ({ product, setOrder }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [count, setCount] = useState(1);
  // const [price, setPrice] = useState(product.pprice);
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

  const getTotal = () => product.pprice * count;
  const total = useMemo(() => getTotal(), [count]);

  // 주문 들어가는 함수
  const orderDetail = () => {
    setOrder({
      contents: [product.pname],
      cnt: count,
      price: total
    });
    handleClose();
  };

  return (
    <div>
      <CardMedia
        className={classes.cardMedia}
        image={product.pimgurl}
        title={product.pname}
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
          <Typography className={classes.titleCss}>{product.pname}</Typography>
          <IconButton className={classes.closeButton} onClick={handleClose}>
            <CancelOutlined style={{ fontSize: 45 }} />
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.dialogBody1}>
          <img src={product.pimgurl} alt={product.pname} className={classes.img} />
          <Typography component="h6" variant="h4" className={classes.details}>
            {/* <p>조리시간: {product.cooking_time}분</p> */}
            {product.pdesc}
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
              <Typography variant="h3">{total}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={1} />
        </Grid>
        <Grid container className={classes.btnGridHeight}>
          <Grid item xs={6} className={classes.btnPosition}>
            <Button className={classes.btnCancel} variant="contained" onClick={handleClose}>
              <Typography variant="h3">취소</Typography>
            </Button>
          </Grid>
          <Grid item xs={6} className={classes.btnPosition}>
            <Button className={classes.btnCommit} variant="contained" onClick={orderDetail}>
              <Typography variant="h3">확인</Typography>
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
};

export default ProductModal;
