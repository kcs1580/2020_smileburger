import React from 'react';
import Button from '@material-ui/core/Button'


const TestButton = ({ click }) => {
    return (
        <Button variant="outlined" onClick={click} >
            <h3>test임</h3>
        </Button>

    )
}

export default TestButton