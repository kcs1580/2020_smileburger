import React, { useEffect, useState } from 'react';
import axios from 'axios';
//자 부르자 꼭
function BoardRow(props) {

    const handleRemove = () => {
        const { row, onRemove } = props;
        onRemove(row.brdno);
    };

    const handleSelectRow = () => {
        const { row, onSelectRow } = props;
        onSelectRow(row);
    };

    const [orderListUnit, setOrderListUnit] = useState([]);
    const [refresh, setRefresh] = useState(false);
    function refreshed() {
        console.log("refresh실행 중")
        setRefresh(!refresh);
    }
    useEffect(() => {
        axios
            .get("http://localhost:3001/adminOrderList")
            .then(res => {
                console.log("들어왔다.")
                console.log(res)
                setOrderListUnit(res.data)
                console.log(res.data[0].oid)
            })
            .catch(err => console.log(err + "\n Admin_BoardItem의 useEffect에서 에러가 나는군"))
        console.log("**#@Admin_BoardItem에서 useEffect가 작동했어!@#**");
    }, [refresh]);
    const tempOrderDetailList = [];

    // 주문내용
    for (var i = 0; i < orderListUnit.length; i++) {
        let eachOrderDetail = [];
        const tempList = orderListUnit[i].ocontent.split("contents");
        tempList.map((el, idx) => {
            if (idx !== 0) {
                const tempString = el.slice(el.indexOf("[") + 1, el.indexOf("]")).split('"');

                let tempOrderDetail = [];
                tempString.map((string, sIdx) => {
                    if (sIdx % 2 === 1) {
                        tempOrderDetail.push(string);
                    }
                });
                eachOrderDetail.push(tempOrderDetail);
            }
        });
        tempOrderDetailList.push(eachOrderDetail);
        // console.log(tempOrderDetailList)
    }

    const Tablelist = orderListUnit.map((order, idx) => {
        return (
            <tr>
                <td width="60">{order.oid}</td>
                <td width="60">{order.otype}</td>
                <td width="500">{tempOrderDetailList[idx].join(' / ')}</td>
                <td width="100">{order.price}</td>
                <td width="200">{order.odate}</td>
            </tr>
        )
    })

    return (
        <>
            {Tablelist}
        </>
        // <div>
        //     {
        //         orderListUnit.map(order => ({

        //         }
        //             <tr>
        //                 <tb>
        //                     {order.oid}
        //                 </tb>
        //             </tr>
        //             <tr>
        //                 <tb>
        //                     {order.otype}
        //                 </tb>
        //             </tr>
        //         ))
        //     }
        // </div>
    );
};

export default BoardRow