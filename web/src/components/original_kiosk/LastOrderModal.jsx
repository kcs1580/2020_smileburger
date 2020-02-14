import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from "@material-ui/core";
import { Fastfood, Storefront, CancelOutlined } from "@material-ui/icons";
import { red, grey } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  btnPosition: {
    textAlign: "center",
    paddingTop: 25
  },
  btnWhere: {
    background: grey[300],
    width: 300,
    height: 150,
    fontSize: 50
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    color: "white"
  },
  dialogText: {
    textAlign: "center",
    color: "black",
    margin: 20,
    fontSize: 25
  },
  dialogTitle: {
    backgroundColor: "red",
    width: "840px",
    height: 69,
    color: "white",
    padding: 0
  },
  iconStyle: {
    fontSize: 50,
    marginRight: 10
  },
  paper: {
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 180,
    marginRight: 180,
    height: 120,
    padding: theme.spacing(2)
  },
  paperContent: {
    textAlign: "center"
  },
  tableHeadCell: {
    textAlign: "center",
    fontSize: 25
  },
  titleCss: {
    position: "absolute",
    left: theme.spacing(2),
    margin: 0,
    fontSize: 35,
    padding: 5
  }
}));

const LastOrderModal = ({
  idx,
  lastOrder,
  setOrder,
  totalCntList,
  totalPriceList,
  orderShowList,
  orderDetailList
}) => {
  // console.log(orderDetailList);
  // console.log(orderDetailList[idx]);
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // 주문 하는 함수
  const orderDetail = () => {
    console.log("주문함수");
    console.log(orderDetailList[idx]);
    setOrder({
      contents: [],
      cnt: totalCntList[idx],
      price: totalPriceList[idx]
    });
    handleClose();
  };

  return (
    <>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Grid container>
            <Grid itme xs={2} className={classes.paperContent}>
              {lastOrder.odate}
            </Grid>
            <Grid itme xs={5}>
              {orderShowList[idx]}
            </Grid>
            <Grid itme xs={1} className={classes.paperContent}>
              {totalCntList[idx]}
            </Grid>
            <Grid itme xs={2} className={classes.paperContent}>
              {totalPriceList[idx]}
            </Grid>
            <Grid itme xs={2} className={classes.paperContent}>
              <Button variant="contained" color="secondary" size="large" onClick={handleClickOpen}>
                주문
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {/* 주문상세 정보보기 */}
      <Dialog open={open} onClose={handleClose} maxWidth="xl">
        <DialogTitle id="alert-dialog-title" className={classes.dialogTitle}>
          <Typography className={classes.titleCss}>상세보기</Typography>
          <IconButton className={classes.closeButton} onClick={handleClose}>
            <CancelOutlined style={{ fontSize: 45 }} />
          </IconButton>
        </DialogTitle>
        {/* 주문내역 확인 테이블 */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description" className={classes.dialogText}>
            주문하시려면 아래의 주문하기를 눌러주세요.
          </DialogContentText>
          <TableContainer
            style={{
              height: 500,
              borderTop: "2px solid",
              borderBottom: "2px solid"
            }}
          >
            <Table>
              <TableHead>
                <TableRow style={{ background: red[100] }}>
                  <TableCell style={{ minWidth: 390, fontSize: 25 }}>제품명</TableCell>
                  <TableCell style={{ minWidth: 200 }} className={classes.tableHeadCell}>
                    수량
                  </TableCell>
                  <TableCell style={{ minWidth: 200 }} className={classes.tableHeadCell}>
                    금액
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{orderDetailList[idx]}</TableCell>
                  <TableCell style={{ textAlign: "center" }}>{totalCntList[idx]}</TableCell>
                  <TableCell style={{ textAlign: "center" }}>{totalPriceList[idx]}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        {/* 주문하기 버튼 */}
        <Grid container style={{ height: 200 }}>
          <Grid item xs={12} className={classes.btnPosition}>
            <Button onClick={orderDetail} className={classes.btnWhere}>
              <Fastfood className={classes.iconStyle} />
              <div>주문하기</div>
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};

export default LastOrderModal;
