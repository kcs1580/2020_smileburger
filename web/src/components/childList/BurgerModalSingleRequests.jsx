import React, { useState } from "react";
import { red } from "@material-ui/core/colors";
import {
  makeStyles,
  Grid,
  Typography,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  CardContent
} from "@material-ui/core";
import check from "../../img/burgerModal/check.png";
import checkNone from "../../img/burgerModal/check-none.png";

const useStyles = makeStyles({
  root: {
    width: 200,
    maxWidth: 345,
    boxShadow: 0
  },
  btnPosition: {
    textAlign: "center",
    paddingTop: 50
  },
  btnGridHeight: {
    height: 180
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
});

const BurgerModalSingleRequests = props => {
  const classes = useStyles();

  const [requests, setRequests] = useState(
    props.requests.map((request, idx) => {
      if (idx === 0) {
        return {
          id: request.pid,
          name: request.pname,
          check: true,
          addPrice: 0,
          img: check,
          back: request.pimgurl
        };
      } else {
        return {
          id: request.pid,
          name: request.pname,
          check: false,
          addPrice: request.pprice,
          img: checkNone,
          back: request.pimgurl
        };
      }
    })
  );

  const requestsHtml = requests.map((request, idx) => {
    return (
      <Grid key={idx} item xs={3} style={{ margin: 0, textAlign: "center" }}>
        <Card className={classes.root} onClick={() => pickRequest(request.id)}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={request.img}
              style={{
                height: 200,
                width: 200,
                backgroundImage: `url(${request.back})`
              }}
            />
            <CardContent style={{ padding: 0 }}>
              <Typography
                gutterBottom
                variant="h3"
                component="h2"
                style={{ marginTop: 10, marginBottom: 10 }}
              >
                {request.name}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    );
  });

  const pickRequest = id => {
    let temp = [];
    requests.map(request => {
      if (request.id === id) {
        temp.push({
          id: request.id,
          name: request.name,
          check: true,
          back: request.back,
          img: check
        });
      } else {
        temp.push({
          id: request.id,
          name: request.name,
          check: false,
          back: request.back,
          img: checkNone
        });
      }
    });
    setRequests(temp);
  };
  const orderDetail = e => {
    let pickRequest = "";

    requests.map(request => {
      if (request.check) {
        pickRequest = request.name;
      }
    });
    // BodyOrder의 state 변경 ===============================
    props.setOrder({
      contents: [props.burger.pname, pickRequest],
      cnt: props.count,
      price: props.total
    });
    // =====================================================
    props.handleCloseSingle();
  };
  return (
    <div>
      <Grid container>
        <Grid item xs={1} style={{ background: red[500] }}></Grid>
        <Grid item xs={11} style={{ background: red[100] }}>
          <Typography variant="h4">요청사항</Typography>
        </Grid>
      </Grid>
      <Grid container style={{ margin: 0, width: 900, padding: 20 }}>
        {requestsHtml}
      </Grid>
      {/* ==================================================== */}
      <Grid container className={classes.btnGridHeight}>
        <Grid item xs={6} className={classes.btnPosition}>
          <Button
            className={classes.btnCancel}
            variant="contained"
            onClick={props.handleCloseSingle}
          >
            <Typography variant="h3">취소</Typography>
          </Button>
        </Grid>
        <Grid item xs={6} className={classes.btnPosition}>
          <Button className={classes.btnCommit} variant="contained" onClick={orderDetail}>
            <Typography variant="h3">확인</Typography>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default BurgerModalSingleRequests;
