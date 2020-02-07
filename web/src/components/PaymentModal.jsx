import React, { useState } from "react";
import {
  makeStyles,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from "@material-ui/core";
import { red, grey } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  btnPayment: {
    color: "white",
    background: "red",
    height: 100,
    width: "100%"
  },
  dialogTitle: {
    backgroundColor: "red",
    width: "840px",
    height: 69,
    color: "white",
    padding: 0
  },
  dialogBody: {
    width: "840px"
  },
  // tableHei: {
  //   height: 500
  // },
  titleCss: {
    position: "absolute",
    left: theme.spacing(2),
    margin: 0,
    fontSize: 35,
    padding: 5
  },
  tableHeadCell: {
    textAlign: "center",
    fontSize: 25
  }
}));

const PaymentModal = ({ orderList }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [openOrderFirst, setOpenOrderFirst] = useState(false);
  const handleClickOpenOrderFirst = () => {
    setOpenOrderFirst(true);
  };
  const handleCloseOrderFirst = () => {
    setOpenOrderFirst(false);
  };

  const handleClick = () => {
    if (orderList.length === 0) {
      handleClickOpenOrderFirst();
    } else {
      handleClickOpen();
    }
    console.log(orderList);
  };

  return (
    <div>
      <Button className={classes.btnPayment} onClick={handleClick}>
        결제하기
      </Button>
      {/* 주문 확인 및 식사 장소 선택 모달*/}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xl"
      >
        <DialogTitle id="alert-dialog-title" className={classes.dialogTitle}>
          <p className={classes.titleCss}>결제하기</p>
        </DialogTitle>
        <DialogContent
        // className={classes.dialogBody}
        >
          <DialogContentText id="alert-dialog-description">
            주문내역을 확인 후 식사 장소를 선택하세요.
          </DialogContentText>
          <TableContainer>
            <TableHead>
              <TableRow style={{ background: red[100] }}>
                <TableCell style={{ minWidth: 390, fontSize: 25 }}>
                  제품명
                </TableCell>
                <TableCell
                  style={{ minWidth: 200 }}
                  className={classes.tableHeadCell}
                >
                  수량
                </TableCell>
                <TableCell
                  style={{ minWidth: 200 }}
                  className={classes.tableHeadCell}
                >
                  금액
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderList.map(order => {
                return (
                  <TableRow key={order.id}>
                    {/* 제품목록 보여주는 cell */}
                    <TableCell>
                      {order.contents.map((content, idx) => {
                        if (idx === order.contents.length - 1) {
                          return content;
                        } else {
                          return content + ", ";
                        }
                      })}
                    </TableCell>
                    {/* 제품수량 보여주는 cell */}
                    <TableCell style={{ textAlign: "center" }}>
                      {/* <IndeterminateCheckBox
                      style={{ color: "red" }}
                      onClick={() => decCnt(order.id)}
                    /> */}
                      {order.cnt}
                      {/* <AddBox
                      style={{ color: "red" }}
                      onClick={() => incCnt(order.id)}
                    /> */}
                    </TableCell>
                    {/* 제품가격 보여주는 cell */}
                    <TableCell style={{ textAlign: "center" }}>
                      {order.price}
                      {/* <Close
                      style={{ color: "red" }}
                      // onClick={() => deleteList(order.id)}
                    /> */}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </TableContainer>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions> */}
      </Dialog>
      {/* 주문내역이 없을 떄 보여주는 모달 */}
      <Dialog
        open={openOrderFirst}
        onClose={handleCloseOrderFirst}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            제품을 선택해 주세요.
          </DialogContentText>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
};

export default PaymentModal;
