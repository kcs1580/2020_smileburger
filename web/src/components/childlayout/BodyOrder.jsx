import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import { makeStyles, Grid } from "@material-ui/core";
const useStyles = makeStyles(theme => ({

    Button: {
        width: '100%',
        height: '100%',
        fontSize: '100px'
    },
    buttongrid: {
        height: "470px",
        width: "470px",
        fontSize: "15px",
        border: 'solid'

    },
    container:{
        marginTop:'70px'
    }


}))


const BodyOrder = ({ select, setSelect }) => {
    const classes = useStyles();
    const [orderList, setOrderList] = useState([]);

    return (
        <Grid container className={classes.container}>
            <Grid item xs={6} className={classes.buttongrid}>
                <Button
                    className={classes.Button}
                    onClick={() => {
                        setSelect(1)
                    }}>
                    버거
                    </Button>
            </Grid>
            <Grid item xs={6} className={classes.buttongrid}>
                <Button
                    className={classes.Button}
                    onClick={() => {
                        setSelect(2)
                    }}>
                    사이드
                    </Button>
            </Grid>
            <Grid item xs={6} className={classes.buttongrid}>
                <Button
                    className={classes.Button}
                    onClick={() => {
                        setSelect(3)
                    }}>
                    음료
                    </Button>
            </Grid>
            <Grid item xs={6} className={classes.buttongrid}>
                <Button
                    className={classes.Button}
                    onClick={() => {
                        setSelect(4)
                    }}>
                    뭐
                    </Button>
            </Grid>
        </Grid>

    )

};

export default BodyOrder;
