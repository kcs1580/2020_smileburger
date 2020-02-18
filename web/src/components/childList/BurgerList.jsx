import React, { useEffect, useState, Fragment } from "react";

import {
    makeStyles,
    Container,
    Grid,
    Card,
    CardContent,
    Typography
} from "@material-ui/core";
import BurgerModal from "./BurgerModal";

const useStyles = makeStyles(theme => ({
    root: {


    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8)
    },

    gridList: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'auto',
        backgroundColor: theme.palette.background.paper,
        height: '900px'
    },
    cardContent: {
        flexGrow: 1,
        textAlign: "center",
        overflow: 'hidden',

    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },

}));

const BurgerList = ({ setOrder, burgers, burgerSets, sides, beverages, requests }) => {
    const classes = useStyles();

    let burgerSetId = [];
    let burgerSetName = [];
    let burgerSetPrice = [];
    let burgerSetDesc = [];
    let burgerSetImgurl = [];

    burgerSets.map(burgerSet => {
        burgerSetId.push(burgerSet.pid);
        burgerSetName.push(burgerSet.pname);
        burgerSetPrice.push(burgerSet.pprice);
        burgerSetDesc.push(burgerSet.pdesc);
        burgerSetImgurl.push(burgerSet.pimgurl);
    });

    return (
        <Container
            className={classes.cardGrid}
            maxWidth="md"
            style={{ height: "850px", overflow: "auto" }}
        >
            <Grid container spacing={4}>
                {/* Server 에 저장된 버거 정보만큼 반복하며 생성 */}
                {burgers.map((burger, idx) => (
                    <Grid item xs={12} sm={6} md={6} key={burger.pid}>
                        <Card className={classes.card}>
                            <BurgerModal
                                burger={burger}
                                burgerSetId={burgerSetId[idx]}
                                burgerSetName={burgerSetName[idx]}
                                burgerSetPrice={burgerSetPrice[idx]}
                                burgerSetDesc={burgerSetDesc[idx]}
                                burgerSetImgurl={burgerSetImgurl[idx]}
                                sides={sides}
                                beverages={beverages}
                                requests={requests}
                                setOrder={setOrder}
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {burger.pname}
                                </Typography>
                                <Typography>
                                    <span style={{ marginRight: "10px" }}>단품: {burger.pprice}</span>
                                    <span>세트: {burgerSetPrice[idx]} </span>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );

};

export default BurgerList;
