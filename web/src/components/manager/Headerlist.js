import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import BodyControl from './BodyControl'
import Container from '@material-ui/core/Container';

const useBtnStyles = makeStyles(theme => ({
    Button: {
        height: 200,
        width: 200,
    }
}))

const BtnLink = ({ idx, name, setState }) => {
    const classes = useBtnStyles()
    return (
        <div>
            <Button variant="outlined" className={classes.Button} onClick={() => { setState(idx) }}>
                <h3>{name}</h3>
            </Button>
        </div>

    )
}

const Headerlist = () => {
    const [state, setState] = useState(0)
    const arr = [["주문현황"], ["판매내역"], ["통계"], ["마감"]]

    const btnList = arr.map((name, idx) => {
        return (
            <BtnLink key={idx} idx={idx} name={name} setState={setState} />
        )
    })

    return (
        <div>

            <br />
            <br />
            <Container>
                <Grid container justify="space-between">
                    {btnList}
                </Grid>
            </Container>
            <br />
            <br />
            <br />
            <br />
            <br />
            <BodyControl idx={state} />
        </div >
    )
}

export default Headerlist