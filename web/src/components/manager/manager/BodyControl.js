import React from 'react';
import Orderdetail from './Orderdetail';
import Salesdetail from './Salesdetail'

const BodyControl = (props) => {
    switch (props.idx) {
        case 0:
            return (<Orderdetail orderlist={props.order} />)
        case 1:
            return (<Salesdetail />)
        case 2:
            return (<Orderdetail orderlist={props.order} />)
        case 3:
            return (<Orderdetail orderlist={props.order} />)
        default:
            return (<Orderdetail orderlist={props.order} />)
    }

}

export default BodyControl