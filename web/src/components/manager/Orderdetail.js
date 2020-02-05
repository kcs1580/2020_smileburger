import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import io from 'socket.io-client';

const useStyles = makeStyles(theme => ({
    Card: {
        height: 300,
        width: 200,
    },
    numbering: {
        fontSize: 30,
    }
}))



const Orderdetail = () => {
    const socket = io.connect('http://localhost:3001')
    const [orders, setOrder] = useState([0, 0, 0, 0, 0, 0, 0, 0])
    const classes = useStyles();

    (() => {
        socket.on("welcome", msg => {
            console.log(msg)
        });
    })();
    const orderCard = orders.map((order, idx) => {
        if (order === 0) {
            return (
                <Card className={classes.Card} variant="outlined" display="inline" key={idx} />

            )
        }
        else {
            return (
                <Card className={classes.Card} variant="outlined" display="inline" key={idx} onClick={() => { console.log("aa") }}>
                    <CardContent>
                        <Typography className={classes.numbering} color="textSecondary" align="center">
                            {order.orderNum}
                        </Typography>
                        <h3>{order.itemList.menu}</h3>
                        <h4>{order.itemList.ea}</h4>
                    </CardContent>
                </Card>
            )
        }
    })
    const orderList = (orderCard) => {
        return (
            <>
                <Grid container justify="space-between">
                    {orderCard.slice(0, 4)}
                </Grid>
                <br />
                <Grid container justify="space-between">
                    {orderCard.slice(4, 8)}
                </Grid>

            </>

        )
    }


    return (
        <Container>
            {orderList(orderCard)}
        </Container>
    )
}

export default Orderdetail