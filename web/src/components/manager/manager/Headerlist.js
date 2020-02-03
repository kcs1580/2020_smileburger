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

const Headerlist = () => {
    const classes = useBtnStyles()
    const [state, setState] = useState(0)
    const arr = [["주문현황"], ["판매내역"], ["통계"], ["마감"]]

    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <Container>
                <Grid container justify="space-between">
                    <Button variant="outlined" className={classes.Button} onClick={() => { setState(0) }}>
                        <h3>{arr[0]}</h3>
                    </Button>

                    <Button variant="outlined" className={classes.Button} onClick={() => { setState(1) }}>
                        <h3>{[arr[1]]}</h3>
                    </Button>

                    <Button variant="outlined" className={classes.Button} onClick={() => { setState(2) }}>
                        <h3>{[arr[2]]}</h3>
                    </Button>

                    <Button variant="outlined" className={classes.Button} onClick={() => { setState(3) }}>
                        <h3>{[arr[3]]}</h3>
                    </Button>
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