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
import { AddBox, IndeterminateCheckBox } from "@material-ui/icons";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  text: {
    color: "white",
    padding: "0 auto",
    margin: "0"
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center"
  },
  listPaper: {
    height: 600,
    paddingTop: 20,
    paddingLeft: 20
  }
}));

const OrderList = () => {
  const classes = useStyles();

  return (
    <Grid item xs={9} className={classes.listPaper}>
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
                <IndeterminateCheckBox style={{ color: "red" }} />
                1
                <AddBox style={{ color: "red" }} />
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>1번줄 셀3</TableCell>
            </TableRow>
            <TableRow>2번줄</TableRow>
            <TableRow>
              <TableCell>3번줄 셀1</TableCell>
              <TableCell style={{ textAlign: "center" }}>3번줄 셀2</TableCell>
              <TableCell style={{ textAlign: "center" }}>3번줄 셀3</TableCell>
            </TableRow>
            <TableRow>4번줄</TableRow>
          </TableBody>
        </TableContainer>
      </Paper>
    </Grid>
  );
};

export default OrderList;
