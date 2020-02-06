import React from "react";
import {
  makeStyles,
  Grid,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import OrderList from "../components/OrderList";

const useStyles = makeStyles(theme => ({
  container: {
    flexGrow: 1,
    height: "620px",
    textAlign: "center",
    background: grey[400]
  },
  text: {
    color: "white",
    padding: "0 auto",
    margin: "0"
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center"
  },
  btnCancel: {
    color: "white",
    background: grey[700],
    height: 100,
    width: "100%"
  },
  btnPayment: {
    color: "white",
    background: "red",
    height: 100,
    width: "100%"
  },
  listPaper: {
    height: 600,
    paddingTop: 20,
    paddingLeft: 20
  }
}));

const BodyOrderChoiceList = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Grid container>
        <Grid item xs={12} style={{ background: grey[700], height: 20 }}></Grid>
        {/* 왼쪽 상태정보======================================== */}
        {/* <Grid item xs={9} className={classes.listPaper}>
          <Paper style={{ height: 560 }}>
            <TableContainer>
              <TableHead>
                <TableRow style={{ background: grey[400] }}>
                  <TableCell
                    style={{ minWidth: 390, textAlign: "center", fontSize: 30 }}
                  >
                    제품명
                  </TableCell>
                  <TableCell
                    style={{ minWidth: 200, textAlign: "center", fontSize: 30 }}
                  >
                    수량
                  </TableCell>
                  <TableCell
                    style={{ minWidth: 200, textAlign: "center", fontSize: 30 }}
                  >
                    금액
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>싸이버거세트</TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    1번줄 셀2
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    1번줄 셀3
                  </TableCell>
                </TableRow>
                <TableRow>2번줄</TableRow>
                <TableRow>
                  <TableCell>3번줄 셀1</TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    3번줄 셀2
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    3번줄 셀3
                  </TableCell>
                </TableRow>
                <TableRow>4번줄</TableRow>
              </TableBody>
            </TableContainer>
          </Paper>
        </Grid> */}
        <OrderList />
        {/* 오른쪽 결제확인======================================== */}
        <Grid item xs={3} style={{ height: 600, padding: 20 }}>
          <Typography>주문수량</Typography>
          <Paper className={classes.paper}>0</Paper>
          <Typography>주문금액</Typography>
          <Paper className={classes.paper}>0</Paper>
          <div>
            <Button className={classes.btnCancel}>전체취소</Button>
          </div>
          <div>
            <Button className={classes.btnPayment}>결제하기</Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default BodyOrderChoiceList;
