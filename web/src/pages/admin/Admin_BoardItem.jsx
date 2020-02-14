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

    useEffect(() => {
        axios
            .get("http://localhost:3001/base/BASE.SELECT.admin_order_list")
            .then(res => {
                console.log(res)
                setOrderListUnit(orderListUnit)
            })
            .catch(err => console.log(err + "\n Admin_BoardItem의 useEffect에서 에러가 나는군"))
        console.log("**#@Admin_BoardItem에서 useEffect가 작동했어!@#**");
    }, []);

    return (
        /*
       <tr>
           <td>{props.row.brdno}</td>
           <td>{props.row.brdstore}</td>
           <td><a onClick={handleSelectRow}>{props.row.brdtitle}</a></td>
           <td>{props.row.brdwriter}</td>
           <td>{props.row.brdcost}</td>
           <td>{props.row.brddate.toLocaleString('ko-KR')}</td>
           <td><button onClick={handleRemove}>X</button></td>
       </tr>
       */
        <tr>
            {orderListUnit.map(order => (
                <tb>
                    {order}
                </tb>
            ), console.log("order 불렀는데!"))}
        </tr>
    );
};

export default BoardRow