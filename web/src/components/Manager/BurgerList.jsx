import React, {useEffect, useState, Fragment} from "react";
import axios from "axios";
import {
    makeStyles,
    Container,
    GridList,

    GridListTileBar,
    ListSubheader,
    IconButton,
    GridListTile,

    Grid,
    Card,
    CardContent,
    Typography
} from "@material-ui/core";
import BurgerModal from "./BurgerModal";
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles(theme => ({
    root: {
     
      
    },
    gridList: {  
      display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'auto',
    backgroundColor: theme.palette.background.paper,
      height:'900px'
    },
    cardContent: {
        flexGrow: 1,
        textAlign: "center",
        overflow:'hidden'
     
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    
}));

const BurgerList = ({nextId, setNextId, setOrder}) => {
    const classes = useStyles();
    const [burgers, setBurgers] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3001/test")
            .then(({data}) => setBurgers(data))
            .catch(err => console.log(err));
    }, []);

    return (
        <Fragment>
            <Container className={classes.root}>

                <GridList className={classes.gridList} >

                    {
                        burgers.map(burger => (
                            <GridListTile
                                key={burger.id}
                                cols={2}
                                style={{
                                    height: 'auto',
                                    width: '50%'
                                }}>

                               
                                <BurgerModal
                                    burger={burger}
                                    setOrder={setOrder}
                                    nextId={nextId}
                                    setNextId={setNextId}/>
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom="gutterBottom" variant="h5" component="h2">
                                        {burger.title}
                                    </Typography>
                                    <Typography>
                                        <span
                                            style={{
                                                marginRight: "10px"
                                            }}>
                                            단품: {burger.price_single}
                                        </span>
                                        <span>세트: {burger.price_set}</span>
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

export default BurgerList;
