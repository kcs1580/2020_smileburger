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
        console.log("refresh싫애 중")
        setRefresh(!refresh);
    }
    useEffect(() => {
        axios
            .get("http://localhost:3001/base/adminOrderList")
            .then(res => {
                console.log("들어왔다.")
                console.log(res)
                setOrderListUnit(res.data)
                console.log(res.data[0].oid)
            })
            .catch(err => console.log(err + "\n Admin_BoardItem의 useEffect에서 에러가 나는군"))
        console.log("**#@Admin_BoardItem에서 useEffect가 작동했어!@#**");
    }, [refresh]);

    return (
        < div >

            {
                orderListUnit.map(order => (
                    <tr>
                        <tb>
                            {order.oid}
                        </tb>
                    </tr>
                ))
            }
            {
                orderListUnit.map(order => (
                    <tr>
                        <tb>
                            {order.otype}
                        </tb>
                    </tr>
                ))
            }
            {
                orderListUnit.map(order => (
                    <tr>
                        <tb>
                            {order.owaitingNum}
                        </tb>
                    </tr>
                ))
            }
            {
                orderListUnit.map(order => (
                    <tr>
                        <tb>
                            {order.ocontent}
                        </tb>
                    </tr>
                ))
            }
            {
                orderListUnit.map(order => (
                    <tr>
                        <tb>
                            {order.odate}
                        </tb>
                    </tr>
                ))
            }
        </div >
    );
};

export default BoardRow