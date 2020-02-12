import React, { Fragment, useContext, useState, useEffect } from "react";
import HeaderOrder from "../../components/childlayout/HeaderOrder";
import BodyOrder from "../../components/childlayout/BodyOrder";

import { makeStyles } from "@material-ui/core";
import { CssBaseline, } from "@material-ui/core";
import { CommonContext } from "../../context/CommonContext";

import BurgerList from "../../components/childList/BurgerList";
import BeverageList from "../../components/childList/BeverageList";
import SideList from "../../components/childList/SideList";

import BodyOrderChoiceListDrawer from "../../components/childList/BodyOrderChoiceListDrawer"
const useStyles = makeStyles(theme => ({
    body: {
        position: "fixed",
        top: "835px"

    },


}))


const Childkiosk = props => {
    const classes = useStyles();
    const [select, setSelect] = useState(0)
    const [order, setOrder] = useState({});
    const [orderList, setOrderList] = useState([]);
    const [nextId, setNextId] = useState(0);

    const { } = useContext(CommonContext);

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
            case 1:
                return <BurgerList nextId={nextId} setNextId={setNextId} setOrder={setOrder} />
            case 2:
                return <SideList />
            case 3:
                return <BeverageList />
            case 4:
                return <h1>기타페이지</h1>
            default:
                return <BodyOrder select={select} setSelect={setSelect} />

        }

    }

    return (
        <Fragment>

            <CssBaseline />
            <HeaderOrder />
            <div className={classes.body}>
                <SelectPage className={classes.selpage} />
                <BodyOrderChoiceListDrawer orderList={orderList} setOrderList={setOrderList} />
            </div>
        </Fragment>
    );
};

export default Childkiosk;
