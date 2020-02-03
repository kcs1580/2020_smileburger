import React from 'react'
import Button from '@material-ui/core/Button';

const TestDownComponent = (props) => {

    const click = () => {
        const t = props.arr.concat({ abc: "123" })
        props.fn(t)
    }

    return (
        <Button variant="contained" color="primary" onClick={click}>
            Primary
        </Button>
    )

}
export default TestDownComponent