import React from 'react';
import Orderdetail from './Orderdetail';
import TestUpload from './TestUpload';


const BodyControl = (props) => {
    switch (props.idx) {
        case 0:
            return (<Orderdetail />)
        case 1:
            return (<TestUpload />)
        case 2:
            return (<Orderdetail />)
        case 3:
            return (<Orderdetail />)
        default:
            return (<Orderdetail />)
    }

}

export default BodyControl