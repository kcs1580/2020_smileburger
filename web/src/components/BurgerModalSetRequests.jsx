import React, { useState } from "react";
import { red } from "@material-ui/core/colors";
import { Grid, Typography } from "@material-ui/core";
// import ToggleButton from "@material-ui/lab/ToggleButton";
// import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

const BurgerModalSetRequests = props => {
  const [sides, setSides] = useState([
    { id: "side1", name: "양념감자(소)", check: true, addPrice: 0 },
    { id: "side2", name: "양념감자(중)", check: false, addPrice: 1000 },
    { id: "side3", name: "치즈감자", check: false, addPrice: 1000 },
    { id: "side4", name: "어니언치즈감자", check: false, addPrice: 1000 }
  ]);
  const [beverages, setBeverages] = useState([
    { id: "beverage1", name: "콜라", check: true, addPrice: 0 },
    { id: "beverage2", name: "사이다", check: false, addPrice: 0 },
    { id: "beverage3", name: "오렌지쥬스", check: false, addPrice: 400 },
    { id: "beverage4", name: "블렉베리쥬스", check: false, addPrice: 400 },
    { id: "beverage5", name: "레몬에이드", check: false, addPrice: 600 },
    { id: "beverage6", name: "청포도에이드", check: false, addPrice: 600 }
  ]);
  const [sidePrice, setSidePrice] = useState(0);
  const [beveragePrice, setBeveragePrice] = useState(0);

  const getTotalPrice = () => {
    return props.defaultPrice + sidePrice + beveragePrice;
  };

  const pickSide = id => {
    let temp = [];
    sides.map(side => {
      if (side.id === id) {
        temp.push({
          id: side.id,
          name: side.name,
          check: true,
          addPrice: side.addPrice
        });
        setSidePrice(side.addPrice);
      } else {
        temp.push({
          id: side.id,
          name: side.name,
          check: false,
          addPrice: side.addPrice
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
          addPrice: beverage.addPrice
        });
        setBeveragePrice(beverage.addPrice);
      } else {
        temp.push({
          id: beverage.id,
          name: beverage.name,
          check: false,
          addPrice: beverage.addPrice
        });
      }
    });
    setBeverages(temp);
  };

  props.priceChanger(getTotalPrice());

  return (
    <div>
      <Grid container>
        <Grid item xs={1} style={{ background: red[500] }}></Grid>
        <Grid item xs={11} style={{ background: red[100] }}>
          사이드
        </Grid>
      </Grid>
      <Grid container style={{ margin: 0, width: 900, padding: 20 }}>
        <Grid item xs={3} style={{ margin: 0, textAlign: "center" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            onClick={() => pickSide(sides[0].id)}
          >
            <p>양념감자(소)</p>
          </Typography>
        </Grid>
        <Grid item xs={3} style={{ margin: 0, textAlign: "center" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            onClick={() => pickSide(sides[1].id)}
          >
            <p style={{ marginTop: 10, marginBottom: 10 }}>양념감자(중)</p>
            <p style={{ marginTop: 10, marginBottom: 10 }}>+1000</p>
          </Typography>
        </Grid>
        <Grid item xs={3} style={{ margin: 0, textAlign: "center" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            onClick={() => pickSide(sides[2].id)}
          >
            <p style={{ marginTop: 10, marginBottom: 10 }}>치즈감자</p>
            <p style={{ marginTop: 10, marginBottom: 10 }}>+1000</p>
          </Typography>
        </Grid>
        <Grid item xs={3} style={{ margin: 0, textAlign: "center" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            onClick={() => pickSide(sides[3].id)}
          >
            <p style={{ marginTop: 10, marginBottom: 10 }}>어니언치즈감자</p>
            <p style={{ marginTop: 10, marginBottom: 10 }}>+1000</p>
          </Typography>
        </Grid>
      </Grid>
      {/* ==================================================== */}
      <Grid container>
        <Grid item xs={1} style={{ background: red[500] }}></Grid>
        <Grid item xs={11} style={{ background: red[100] }}>
          음료
        </Grid>
      </Grid>
      <Grid container style={{ margin: 0, width: 900, padding: 20 }}>
        <Grid item xs={3} style={{ margin: 0, textAlign: "center" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            onClick={() => pickBeverage(beverages[0].id)}
          >
            <p>콜라</p>
          </Typography>
        </Grid>
        <Grid item xs={3} style={{ margin: 0, textAlign: "center" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            onClick={() => pickBeverage(beverages[1].id)}
          >
            <p>사이다</p>
          </Typography>
        </Grid>
        <Grid item xs={3} style={{ margin: 0, textAlign: "center" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            onClick={() => pickBeverage(beverages[2].id)}
          >
            <p style={{ marginTop: 10, marginBottom: 10 }}>오렌지쥬스</p>
            <p style={{ marginTop: 10, marginBottom: 10 }}>+400</p>
          </Typography>
        </Grid>
        <Grid item xs={3} style={{ margin: 0, textAlign: "center" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            onClick={() => pickBeverage(beverages[3].id)}
          >
            <p style={{ marginTop: 10, marginBottom: 10 }}>블렉베리쥬스</p>
            <p style={{ marginTop: 10, marginBottom: 10 }}>+400</p>
          </Typography>
        </Grid>
        <Grid item xs={3} style={{ margin: 0, textAlign: "center" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            onClick={() => pickBeverage(beverages[4].id)}
          >
            <p style={{ marginTop: 10, marginBottom: 10 }}>레몬에이드</p>
            <p style={{ marginTop: 10, marginBottom: 10 }}>+600</p>
          </Typography>
        </Grid>
        <Grid item xs={3} style={{ margin: 0, textAlign: "center" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            onClick={() => pickBeverage(beverages[5].id)}
          >
            <p style={{ marginTop: 10, marginBottom: 10 }}>청포도에이드</p>
            <p style={{ marginTop: 10, marginBottom: 10 }}>+600</p>
          </Typography>
        </Grid>
      </Grid>
      {/* ==================================================== */}
      <Grid container>
        <Grid item xs={1} style={{ background: red[500] }}></Grid>
        <Grid item xs={11} style={{ background: red[100] }}>
          요청사항
        </Grid>
      </Grid>
      <Grid container style={{ margin: 0, width: 900, padding: 20 }}>
        <Grid item xs={3} style={{ margin: 0, textAlign: "center" }}>
          <Typography gutterBottom variant="h5" component="h2">
            <p>요청없음</p>
          </Typography>
        </Grid>
        <Grid item xs={3} style={{ margin: 0, textAlign: "center" }}>
          <Typography gutterBottom variant="h5" component="h2">
            <p>피클제거</p>
          </Typography>
        </Grid>
        <Grid item xs={3} style={{ margin: 0, textAlign: "center" }}>
          <Typography gutterBottom variant="h5" component="h2">
            <p>양파제거</p>
          </Typography>
        </Grid>
        <Grid item xs={3} style={{ margin: 0, textAlign: "center" }}>
          <Typography gutterBottom variant="h5" component="h2">
            <p>피클,양파제거</p>
          </Typography>
        </Grid>
      </Grid>
      {/* ==================================================== */}
    </div>
  );
};

export default BurgerModalSetRequests;
