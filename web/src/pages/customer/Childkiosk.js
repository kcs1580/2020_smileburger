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
        zIndex: 1
    }


}))


const Childkiosk = props => {
    const classes = useStyles();
    const [select, setSelect] = useState(0)
    const [order, setOrder] = useState({});
    const [orderList, setOrderList] = useState([]);
    const [nextId, setNextId] = useState(0);
    const { } = useContext(CommonContext);

    const [burgers, setBurgers] = useState([]);
    const [sides, setSides] = useState([]);
    const [beverages, setBeverages] = useState([]);
    const [burgerSets, setBurgerSets] = useState([]);


    useEffect(() => {
        axios
            .get("http://localhost:3001/base/getProducts", {
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
            .get("http://localhost:3001/base/getProducts", {
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
            .get("http://localhost:3001/base/getProducts", {
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
            .get("http://localhost:3001/base/getProducts", {
                params: {
                    pcategory: 3
                }
            })
            .then(res => {
                console.log(res.data);
                setBurgerSets(res.data);
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


    const SelectPage = () => {
        switch (select) {
            case 0:
                return <BurgerList
                    burgers={burgers}
                    burgerSets={burgerSets}
                    sides={sides}
                    beverages={beverages}
                    setOrder={setOrder}
                />

            case 1:
                return <SideList sides={sides} setOrder={setOrder} />;
            case 2:
                return <BeverageList beverages={beverages} setOrder={setOrder} />
            case 4:
                return <h1>기타페이지</h1>
            default:
                return <BurgerList
                    burgers={burgers}
                    burgerSets={burgerSets}
                    sides={sides}
                    beverages={beverages}
                    setOrder={setOrder}
                />

        }

    }

    return (
        <Fragment>
            <CssBaseline />
            <HeaderOrder />
            <div className={classes.body}>
                {/* <BottomNav select={select} setSelect={setSelect} /> */}

                <SelectPage className={classes.selpage} />
                <Menutap select={select} setSelect={setSelect} />
                <BodyOrderChoiceListDrawer
                    className={classes.btnorder}
                    orderList={orderList}
                    setOrderList={setOrderList}
                    style={{ marginRight: 20 }}
                />

            </div>
        </Fragment>
    );
};

export default Childkiosk;
