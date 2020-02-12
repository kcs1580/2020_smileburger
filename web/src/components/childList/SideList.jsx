import React, {useEffect, useState, Fragment} from "react";
import axios from "axios";
import {
    makeStyles,
    Container,
    GridList,
    GridListTile,
    CardContent,
    Typography
} from "@material-ui/core";
import SideModal from "./SideModal";
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles(theme => ({
    root: {},
    gridList: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'auto',
        backgroundColor: theme.palette.background.paper,
        height: '1000px'
    },
    cardContent: {
        flexGrow: 1,
        textAlign: "center",
        overflow: 'hidden'

    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
}));

const SideList = ({nextId, setNextId, setOrder}) => {
    const classes = useStyles();
    const [sides, setSides] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3001/test")
            .then(({data}) => setSides(data))
            .catch(err => console.log(err));
    }, []);

    return (
        <Fragment>
            <Container className={classes.root}>

                <GridList className={classes.gridList}>

                    {
                        sides.map(side => (
                            <GridListTile
                                key={side.id}
                                cols={2}
                                style={{
                                    height: 'auto',
                                    width: '50%'
                                }}>

                                <SideModal
                                    burger={side}
                                    setOrder={setOrder}
                                    nextId={nextId}
                                    setNextId={setNextId}/>
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom="gutterBottom" variant="h5" component="h2">
                                        {side.title}
                                    </Typography>
                                    <Typography>
                                        <span
                                            style={{
                                                marginRight: "10px"
                                            }}>
                                            단품: {side.price_single}
                                        </span>

                                    </Typography>
                                </CardContent>
                            </GridListTile>
                        ))
                    }
                </GridList>

            </Container>
        </Fragment>

    );
};

export default SideList;
