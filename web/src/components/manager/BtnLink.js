import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'


const useBtnStyles = makeStyles(theme => ({
    Button: {
        height: 200,
        width: 200,
    }
}))

const BtnLink = (props) => {
    const classes = useBtnStyles()
    return (
        <div>
            <Button variant="outlined" className={classes.Button} >
                <h3>{[props.arr[1]]}</h3>
            </Button>
        </div>

    )
}

export default BtnLink