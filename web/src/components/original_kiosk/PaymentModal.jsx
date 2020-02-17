import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Button,
  IconButton,
  Typography,
  Grid,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from "@material-ui/core";
import { Fastfood, Storefront, CancelOutlined } from "@material-ui/icons";
import { red, grey } from "@material-ui/core/colors";
import axios from "axios";

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
  },
  btnWhere: {
    background: grey[300],
    width: 300,
    height: 150,
    fontSize: 50
  },
  iconStyle: {
    fontSize: 50,
    marginRight: 10
  },
  btnPosition: {
    textAlign: "center",
    paddingTop: 25
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
  }
}));

const PaymentModal = ({ orderList, waitingNum }) => {
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

  const [openWatingNum, setOpenWatingNum] = useState(false);
  const handleClickOpenWatingNum = () => {
    setOpenWatingNum(true);
  };
  const handleCloseWatingNum = () => {
    setOpenWatingNum(false);
  };

  // 결제하기 버튼 클릭시 주문내역이 있는지 없는지 확인 후 무엇을 보여줄지 결정
  const handleClick = () => {
    if (orderList.length === 0) {
      handleClickOpenOrderFirst();
    } else {
      handleClickOpen();
    }
    // console.log(orderList);
  };

  // const [waitingNum, setWaitingNum] = useState(101);
  const orderComplete = type => {
    handleClickOpenWatingNum();
    handleClose();
    // DB에 주문저장 하는 부분
    axios
      .get("http://localhost:3001/insertOrder", {
        params: {
          waitingNum: waitingNum,
          data: orderList,
          type: type
        }
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  const goHome = check => {
    if (check) {
      window.location.replace("http://localhost:3000/");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleCloseOrderFirst();
    }, 2000);
    return () => clearTimeout(timer);
  }, [openOrderFirst]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleCloseWatingNum();
      goHome(openWatingNum);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [openWatingNum]);

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
          <Typography className={classes.titleCss}>결제하기</Typography>
          <IconButton className={classes.closeButton} onClick={handleClose}>
            <CancelOutlined style={{ fontSize: 45 }} />
          </IconButton>
        </DialogTitle>
        {/* 주문내역 확인 테이블 */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description" className={classes.dialogText}>
            주문내역을 확인 후 식사 장소를 선택하세요.
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
                {orderList.map(order => {
                  return (
                    <TableRow key={order.id}>
                      <TableCell>
                        {order.contents.map((content, idx) => {
                          if (idx === order.contents.length - 1) {
                            return content;
                          } else {
                            return content + ", ";
                          }
                        })}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>{order.cnt}</TableCell>
                      <TableCell style={{ textAlign: "center" }}>{order.price}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        {/* 식사장소 선택 버튼 */}
        <Grid container style={{ height: 200 }}>
          <Grid item xs={6} className={classes.btnPosition}>
            <Button onClick={() => orderComplete("포장")} className={classes.btnWhere}>
              <Fastfood className={classes.iconStyle} />
              <div>포장</div>
            </Button>
          </Grid>
          <Grid item xs={6} className={classes.btnPosition}>
            <Button onClick={() => orderComplete("매장")} className={classes.btnWhere}>
              <Storefront className={classes.iconStyle} />
              <div>매장</div>
            </Button>
          </Grid>
        </Grid>
      </Dialog>

      {/* 주문내역이 없을 떄 보여주는 모달 */}
      <Dialog
        open={openOrderFirst}
        onClose={handleCloseOrderFirst}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xl"
      >
        <DialogContent>
          <Typography variant="h3">먼저 제품을 선택해 주세요.</Typography>
        </DialogContent>
      </Dialog>

      {/* 대기번호 모달 ======================= */}
      <Dialog
        open={openWatingNum}
        onClose={handleCloseWatingNum}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xl"
      >
        <DialogContent>
          <Typography variant="h3">대기번호: {waitingNum}</Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentModal;
