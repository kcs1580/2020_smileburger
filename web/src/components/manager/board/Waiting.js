import React, { useEffect } from 'react';


const Waiting = ({ orderlist }) => {

    const list = orderlist.map((num) => {
        return (<div>{num}</div>)
    })

    console.log(list)

    return (
        <div>
            {list}
        </div>
    );

};

export default Waiting;
