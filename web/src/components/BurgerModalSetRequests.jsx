import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Button
} from "@material-ui/core";
import check from "../img/burgerModal/check.png";
import checkNone from "../img/burgerModal/check-none.png";
import chips1 from "../img/burgerModal/chips1.png";
import chips2 from "../img/burgerModal/chips2.png";
import cheese from "../img/burgerModal/cheese.png";
import onion from "../img/burgerModal/onion.png";
import coke from "../img/burgerModal/coke.png";
import sprite from "../img/burgerModal/sprite.png";
import orange from "../img/burgerModal/orange.png";
import blackberry from "../img/burgerModal/blackberry.png";
import lemon from "../img/burgerModal/lemon.png";
import muscat from "../img/burgerModal/muscat.png";
import nothing from "../img/burgerModal/nothing.png";
import noPickle from "../img/burgerModal/n_pickle.png";
import noOnion from "../img/burgerModal/n_onion.png";
import noBoth from "../img/burgerModal/n_both.png";

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

const BurgerModalSetRequests = props => {
  const classes = useStyles();

  const [sides, setSides] = useState([
    {
      id: "side1",
      name: "양념감자(소)",
      check: true,
      addPrice: 0,
      img: check,
      back: chips1
    },
    {
      id: "side2",
      name: "양념감자(중)",
      check: false,
      addPrice: 1000,
      img: checkNone,
      back: chips2
    },
    {
      id: "side3",
      name: "치즈감자",
      check: false,
      addPrice: 1000,
      img: checkNone,
      back: cheese
    },
    {
      id: "side4",
      name: "어니언치즈감자",
      check: false,
      addPrice: 1000,
      img: checkNone,
      back: onion
    }
  ]);
  const [beverages, setBeverages] = useState([
    {
      id: "beverage1",
      name: "콜라",
      check: true,
      addPrice: 0,
      back: coke,
      img: check
    },
    {
      id: "beverage2",
      name: "사이다",
      check: false,
      addPrice: 0,
      back: sprite,
      img: checkNone
    },
    {
      id: "beverage3",
      name: "오렌지쥬스",
      check: false,
      addPrice: 400,
      back: orange,
      img: checkNone
    },
    {
      id: "beverage4",
      name: "블렉베리쥬스",
      check: false,
      addPrice: 400,
      back: blackberry,
      img: checkNone
    },
    {
      id: "beverage5",
      name: "레몬에이드",
      check: false,
      addPrice: 600,
      back: lemon,
      img: checkNone
    },
    {
      id: "beverage6",
      name: "청포도에이드",
      check: false,
      addPrice: 600,
      back: muscat,
      img: checkNone
    }
  ]);
  const [requests, setRequests] = useState([
    {
      id: "request1",
      name: "요청없음",
      check: true,
      back: nothing,
      img: check
    },
    {
      id: "request2",
      name: "피클제거",
      check: false,
      back: noPickle,
      img: checkNone
    },
    {
      id: "request3",
      name: "양파제거",
      check: false,
      back: noOnion,
      img: checkNone
    },
    {
      id: "request4",
      name: "피클, 양파제거",
      check: false,
      back: noBoth,
      img: checkNone
    }
  ]);

  const [sidePrice, setSidePrice] = useState(0);
  const [beveragePrice, setBeveragePrice] = useState(0);

  const pickSide = id => {
    let temp = [];
    sides.map(side => {
      if (side.id === id) {
        temp.push({
          id: side.id,
          name: side.name,
          check: true,
          addPrice: side.addPrice,
          back: side.back,
          img: check
        });

        setSidePrice(side.addPrice);
      } else {
        temp.push({
          id: side.id,
          name: side.name,
          check: false,
          addPrice: side.addPrice,
          back: side.back,
          img: checkNone
        });
      }
    });
    setSides(temp);
  };
  const pickBeverage = id => {
    let temp = [];
    beverages.map(beverage => {
      if (beverage.id === id) {
        temp.push({
          id: beverage.id,
          name: beverage.name,
          check: true,
          addPrice: beverage.addPrice,
          back: beverage.back,
          img: check
        });
        setBeveragePrice(beverage.addPrice);
      } else {
        temp.push({
          id: beverage.id,
          name: beverage.name,
          check: false,
          addPrice: beverage.addPrice,
          back: beverage.back,
          img: checkNone
        });
      }
    });
    setBeverages(temp);
  };
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

  const sidesHtml = sides.map(side => {
    return (
      <Grid item xs={3} style={{ margin: 0, textAlign: "center" }}>
        <Card className={classes.root} onClick={() => pickSide(side.id)}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={side.img}
              style={{
                height: 200,
                width: 200,
                backgroundImage: `url(${side.back})`
              }}
            />
            <CardContent style={{ padding: 0 }}>
              <Typography gutterBottom variant="h5" component="h2">
                <p style={{ marginTop: 10, marginBottom: 10 }}>{side.name}</p>
                <p style={{ marginTop: 10, marginBottom: 10 }}>
                  +{side.addPrice}
                </p>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    );
  });
  const beveragesHtml = beverages.map(beverage => {
    return (
      <Grid item xs={3} style={{ margin: 0, textAlign: "center" }}>
        <Card
          className={classes.root}
          onClick={() => pickBeverage(beverage.id)}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={beverage.img}
              style={{
                height: 200,
                width: 200,
                backgroundImage: `url(${beverage.back})`
              }}
            />
            <CardContent style={{ padding: 0 }}>
              <Typography gutterBottom variant="h5" component="h2">
                <p style={{ marginTop: 10, marginBottom: 10 }}>
                  {beverage.name}
                </p>
                <p style={{ marginTop: 10, marginBottom: 10 }}>
                  +{beverage.addPrice}
                </p>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    );
  });
  const requestsHtml = requests.map(request => {
    return (
      <Grid item xs={3} style={{ margin: 0, textAlign: "center" }}>
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
              <Typography gutterBottom variant="h5" component="h2">
                <p style={{ marginTop: 10, marginBottom: 10 }}>
                  {request.name}
                </p>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    );
  });

  const getTotalPrice = () => {
    return props.burger.price_set + sidePrice + beveragePrice;
  };
  props.priceChanger(getTotalPrice());

  const orderDetail = () => {
    let pickSide = "";
    let pickBeverage = "";
    let pickRequest = "";
    sides.map(side => {
      if (side.check) {
        pickSide = side.name;
      }
    });
    beverages.map(beverage => {
      if (beverage.check) {
        pickBeverage = beverage.name;
      }
    });
    requests.map(request => {
      if (request.check) {
        pickRequest = request.name;
      }
    });
    // 최종적으로 넘겨줄 데이터 ===============================
    props.setOrder({
      contents: {
        burger: props.burger.title,
        side: pickSide,
        beverage: pickBeverage,
        request: pickRequest
      },
      cnt: props.count,
      price: getTotalPrice()
    });
    // =====================================================
    props.handleCloseSet();
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={1} style={{ background: red[500] }}></Grid>
        <Grid item xs={11} style={{ background: red[100] }}>
          사이드
        </Grid>
      </Grid>
      <Grid container style={{ margin: 0, width: 900, padding: 20 }}>
        {sidesHtml}
      </Grid>
      {/* ==================================================== */}
      <Grid container>
        <Grid item xs={1} style={{ background: red[500] }}></Grid>
        <Grid item xs={11} style={{ background: red[100] }}>
          음료
        </Grid>
      </Grid>
      <Grid container style={{ margin: 0, width: 900, padding: 20 }}>
        {beveragesHtml}
      </Grid>
      {/* ==================================================== */}
      <Grid container>
        <Grid item xs={1} style={{ background: red[500] }}></Grid>
        <Grid item xs={11} style={{ background: red[100] }}>
          요청사항
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
            onClick={props.handleCloseSet}
          >
            <Typography variant="h5">취소</Typography>
          </Button>
        </Grid>
        <Grid item xs={6} className={classes.btnPosition}>
          <Button
            className={classes.btnCommit}
            variant="contained"
            onClick={orderDetail}
          >
            <Typography variant="h5">확인</Typography>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default BurgerModalSetRequests;
