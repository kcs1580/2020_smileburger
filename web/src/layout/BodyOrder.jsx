import React, { useState, Fragment, useEffect } from "react";
import BodyOrderChoiceList from "./BodyOrderChoiceList";
import LastOrderLists from "../components/original_kiosk/LastOrderLists";
import BurgerList from "../components/original_kiosk/BurgerList";
import SideList from "../components/original_kiosk/SideList";
import BeverageList from "../components/original_kiosk/BeverageList";
import { makeStyles, AppBar, Toolbar, Grid, Paper } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  appBar: {
    marginTop: "120px",
    height: "120px"
  },
  menuButton: {
    marginLeft: theme.spacing(2),
    height: "80px",
    width: "80px"
  },
  paper: {
    textAlign: "center",
    fontSize: "50px"
  },
  menuContext: {
    marginTop: "240px",
    height: "1060px"
  }
}));

const BodyOrder = () => {
  const classes = useStyles();
  const [list, setList] = useState(1);
  const menus = [
    { id: 0, text: "MyPage" },
    { id: 1, text: "버거" },
    { id: 2, text: "사이드" },
    { id: 3, text: "음료" }
  ];

  const [order, setOrder] = useState({});
  const [orderList, setOrderList] = useState([]);
  const [nextId, setNextId] = useState(0);
  const [burgers, setBurgers] = useState([]);
  const [sides, setSides] = useState([]);
  const [beverages, setBeverages] = useState([]);
  const [burgerSets, setBurgerSets] = useState([]);
  const [waitingNum, setWaitingNum] = useState(101);
  const [registered, setRegisterd] = useState("defaultUser"); // 페이스 인식에서 인증된 사용자 인지 아닌지 넘겨 받을 값
  const [lastOrderLists, setLastOrderLists] = useState([]);

  // 제품 정보가져오기
  useEffect(() => {
    axios
      .get("http://localhost:3001/base/getProducts", {
        params: {
          pcategory: 0
        }
      })
      .then(res => {
        // console.log(res.data);
        setBurgers(res.data);
      })
      .catch(err => console.log(err));
    axios
      .get("http://localhost:3001/base/getProducts", {
        params: {
          pcategory: 1
        }
      })
      .then(res => {
        // console.log(res.data);
        setSides(res.data);
      })
      .catch(err => console.log(err));
    axios
      .get("http://localhost:3001/base/getProducts", {
        params: {
          pcategory: 2
        }
      })
      .then(res => {
        // console.log(res.data);
        setBeverages(res.data);
      })
      .catch(err => console.log(err));
    axios
      .get("http://localhost:3001/base/getProducts", {
        params: {
          pcategory: 3
        }
      })
      .then(res => {
        // console.log(res.data);
        setBurgerSets(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  // 기존의 주문정보를 먼저 확인
  useEffect(() => {
    axios
      .get("http://localhost:3001/base/getLatestOrder")
      .then(res => {
        if (res.data.length !== 0) {
          console.log(res.data.length);
          console.log(res.data);
          setWaitingNum(res.data[0].owaitingNum + 1);
        }
      })
      .catch(err => console.log(err));
  }, []);

  // 오더 리스트를 추가하는 부분
  useEffect(() => {
    if (order.contents) {
      // =======================================================
      let check = true;
      let checkIdx = 0;
      let editOrder = {};
      // console.log("before: ", check);
      orderList.map((ord, idx) => {
        if (ord.contents.length === order.contents.length) {
          let cntCheck = 0;
          ord.contents.map((content, contentIdx) => {
            if (content === order.contents[contentIdx]) {
              cntCheck += 1;
            }
          });
          if (order.contents.length === cntCheck) {
            check = false;
            checkIdx = idx;
            editOrder = {
              id: ord.id,
              contents: ord.contents,
              cnt: ord.cnt + order.cnt,
              price: ord.price + order.price
            };
          }
        }
      });
      // console.log("after: ", check);
      if (check) {
        const newOrderList = orderList.concat({
          id: "list" + nextId,
          contents: order.contents,
          cnt: order.cnt,
          price: order.price
        });
        setOrderList(newOrderList);
        setNextId(nextId + 1);
      } else {
        const newOrderList = [];
        orderList.map((ord, idx) => {
          if (idx === checkIdx) {
            newOrderList.push(editOrder);
          } else {
            newOrderList.push({
              id: ord.id,
              contents: ord.contents,
              cnt: ord.cnt,
              price: ord.price
            });
          }
        });
        setOrderList(newOrderList);
      }
      // =======================================================
    }
  }, [order]);

  // 인증된 사용자일 경우 사용자의 데이터 가져오기
  // (데이터 넣기 수정 필요)
  useEffect(() => {
    if (registered) {
      setList(0);
      axios
        .get("http://localhost:3001/base/getLastOrderLists", {
          params: {
            faceid: registered // 나중에 인증된 사용자의 faceid를 넘겨 받아 그 값으로 바꿔준다.
          }
        })
        .then(res => {
          console.log(res);
          console.log(res.data[0].odate);
          console.log(typeof res.data);
          setLastOrderLists(res.data);
        })
        .catch(err => console.log(err));
    }
  }, []);

  const BodyControl = () => {
    switch (list) {
      case 0:
        return <LastOrderLists lastOrderLists={lastOrderLists} setOrder={setOrder} />;
      case 1:
        return (
          <BurgerList
            burgers={burgers}
            burgerSets={burgerSets}
            sides={sides}
            beverages={beverages}
            setOrder={setOrder}
          />
        );
      case 2:
        return <SideList sides={sides} setOrder={setOrder} />;
      case 3:
        return <BeverageList beverages={beverages} setOrder={setOrder} />;
    }
  };

  const menuList = menus.map(menu => {
    // MyPage 는 인증된 사용자만 보여준다.
    if (menu.id === 0) {
      if (registered) {
        return (
          <Grid item xs={2} key={menu.id}>
            <Paper
              className={classes.paper}
              onClick={() => {
                setList(menu.id);
              }}
            >
              {menu.text}
            </Paper>
          </Grid>
        );
      }
    } else {
      return (
        <Grid item xs={2} key={menu.id}>
          <Paper
            className={classes.paper}
            onClick={() => {
              setList(menu.id);
            }}
          >
            {menu.text}
          </Paper>
        </Grid>
      );
    }
  });

  return (
    <Fragment>
      <AppBar position="fixed" className={classes.appBar} style={{ backgroundColor: "yellow" }}>
        <Toolbar style={{ height: "120px" }}>
          <Grid container spacing={4} justify="center">
            {menuList}
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.menuContext}>
        <BodyControl></BodyControl>
      </div>
      {/* 주문확인 및 결제 컴포넌트=================================================== */}
      <BodyOrderChoiceList
        // order={order}
        orderList={orderList}
        setOrderList={setOrderList}
        waitingNum={waitingNum}
      />
    </Fragment>
  );
};

export default BodyOrder;
