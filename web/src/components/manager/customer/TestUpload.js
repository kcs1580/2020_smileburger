import React from 'react'
import axios from 'axios';
import TestButton from './testButton'

const TestUpload = (props) => {

    const onClick = () => {
        axios
            .get('http://localhost:3001/test/', {
                params: {
                    menu: "상하이 스파이시",
                    cost: 4000,
                    ea: 1,
                    // allcost: 4000,
                    // isPack: true
                }
            })
            .then((res) => {
                const { data } = res;
                const temp = props.li.concat(data)
                props.fn(temp)

            })
            .catch((err) => {
                console.log(err)
            })

    }



    return (
        <TestButton click={onClick} />

    )
}

export default TestUpload




// const TestUpload = () => {
//     
// }

// export default TestUpload