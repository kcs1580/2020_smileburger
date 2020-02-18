import React, { Fragment, useContext, useState, useEffect } from "react";
import HeaderOrder from "../../components/childlayout/HeaderOrder";
import Menutap from "../../components/childList/Menutap"
import BottomNav from "../../components/childList/BottomNav"

import { makeStyles } from "@material-ui/core";
import { CssBaseline, } from "@material-ui/core";
import { CommonContext } from "../../context/CommonContext";

import BurgerList from "../../components/childList/BurgerList";
import BeverageList from "../../components/childList/BeverageList";
import SideList from "../../components/childList/SideList";

import BodyOrderChoiceListDrawer from "../../components/childList/BodyOrderChoiceListDrawer"

import axios from "axios";
const useStyles = makeStyles(theme => ({
    body: {
        position: "fixed",
        top: "835px",
        width: "100%",
        position: "relative",
        zIndex: 1

    },
    btnorder: {
        position: "relative",

    },



}))


const Childkiosk = props => {
    const classes = useStyles();
    const [select, setSelect] = useState(1)
    const [order, setOrder] = useState({});
    const [orderList, setOrderList] = useState([]);
    const [nextId, setNextId] = useState(0);
    const { } = useContext(CommonContext);

    const [burgers, setBurgers] = useState([]);
    const [sides, setSides] = useState([]);
    const [beverages, setBeverages] = useState([]);
    const [burgerSets, setBurgerSets] = useState([]);

    const [requests, setRequests] = useState([]);
    const [waitingNum, setWaitingNum] = useState(101);
    const [registered, setRegisterd] = useState(false); // 페이스 인식에서 인증된 사용자 인지 아닌지 넘겨 받을 값
    const [lastOrderLists, setLastOrderLists] = useState([]);

    // 제품 정보가져오기
    useEffect(() => {
        axios
            .get("http://localhost:3001/getProducts", {
                // .get("http://i02c103.p.ssafy.io:3001/getProducts", {
                params: {
                    pcategory: 0
                }
            })
            .then(res => {
                console.log(res.data);
                setBurgers(res.data);
            })
            .catch(err => console.log(err));
        axios
            .get("http://localhost:3001/getProducts", {
                // .get("http://i02c103.p.ssafy.io:3001/getProducts", {
                params: {
                    pcategory: 1
                }
            })
            .then(res => {
                console.log(res.data);
                setSides(res.data);
            })
            .catch(err => console.log(err));
        axios
            // .get("http://i02c103.p.ssafy.io:3001/getProducts", {
            .get("http://localhost:3001/getProducts", {
                params: {
                    pcategory: 2
                }
            })
            .then(res => {
                console.log(res.data);
                setBeverages(res.data);
            })
            .catch(err => console.log(err));
        axios
            // .get("http://i02c103.p.ssafy.io:3001/getProducts", {
            .get("http://localhost:3001/getProducts", {
                params: {
                    pcategory: 3
                }
            })
            .then(res => {
                console.log(res.data);
                setBurgerSets(res.data);
            })
            .catch(err => console.log(err));
        axios
            .get("http://localhost:3001/getProducts", {
                params: {
                    pcategory: 4
                }
            })
            .then(res => {
                console.log(res.data);
                setRequests(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    // 기존의 주문정보를 먼저 확인
    useEffect(() => {
        axios
            // .get("http://i02c103.p.ssafy.io:3001/getLatestOrder")
            .get("http://localhost:3001/getLatestOrder")
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
            console.log("before: ", check);
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
            console.log("after: ", check);
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
    useEffect(() => {
        if (localStorage.getItem("FaceID")) {
            setRegisterd(true);
            setSelect(0);
            axios
                // .get("http://i02c103.p.ssafy.io:3001/getLastOrderLists", {
                .get("http://localhost:3001/getLastOrderLists", {
                    params: {
                        faceid: localStorage.getItem("FaceID") // 나중에 인증된 사용자의 faceid를 넘겨 받아 그 값으로 바꿔준다.
                    }
                })
                .then(res => {
                    // console.log(res);
                    // console.log(res.data[0].odate);
                    // console.log(typeof res.data);
                    setLastOrderLists(res.data);
                })
                .catch(err => console.log(err));
        } else {
            console.log("비회원!!!!!!!!!!");
        }
    }, []);


    const SelectPage = () => {
        switch (select) {
            case 0:
                // return <LastOrderLists lastOrderLists={lastOrderLists} setOrder={setOrder} />;
                return <h1>test</h1>
            case 1:
                return (
                    <BurgerList
                        burgers={burgers}
                        burgerSets={burgerSets}
                        sides={sides}
                        beverages={beverages}
                        requests={requests}
                        setOrder={setOrder}
                    />
                );
            case 2:
                return <SideList sides={sides} setOrder={setOrder} />;
            case 3:
                return <BeverageList beverages={beverages} setOrder={setOrder} />;
        }

    }

    return (
        <Fragment>
            <CssBaseline />
            <HeaderOrder />

            <div className={classes.body}>
                {/* <BottomNav select={select} setSelect={setSelect} /> */}
                <Menutap select={select} setSelect={setSelect} className={classes.Menutap} />
                <SelectPage className={classes.selpage} />

                <BodyOrderChoiceListDrawer
                    className={classes.btnorder}
                    orderList={orderList}
                    setOrderList={setOrderList}
                    waitingNum={waitingNum}
                    style={{ marginRight: 20 }}
                />

            </div>
        </Fragment>
    );
};

export default Childkiosk;
