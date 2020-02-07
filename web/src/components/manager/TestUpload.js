import React from 'react'
import TestButton from './testButton'
import io from 'socket.io-client';

const TestUpload = () => {
    const socket = io.connect("http://localhost:3001")
    const ppp = {
        menu: "상하이 스파이시",
        cost: 4000,
        ea: 1
    }
    // (() => {
    //     socket.emit("init", { name: onum });
    //     socket.on("welcome", msg => {
    //         num = msg;
    //         console.log(num);
    //         setLi(num);
    //     });
    // })();
    const click = () => {
        socket.emit("send", { ppp });
    }


    return (
        <TestButton click={click} />

    )
}

export default TestUpload




// const TestUpload = () => {
//     
// }

// export default TestUpload