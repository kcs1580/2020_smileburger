import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        //backgroundColor:'#3f51b5',
        width: '100%',
        margin: '5px'
    },
    tabs: {
        maxWidth: 500,
        margin: '0 auto'

    },
    tab: {
        color: '#3f51b5',
        fontSize: '40px',
        height: '100px',

    }
});

export default function Menutap({ select, setSelect }) {
    const classes = useStyles();
    // const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setSelect(newValue);
    };

    return (
        <Paper square="square" className={classes.root}>
            <Tabs
                value={select}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="secondary"
                aria-label="icon label tabs example"
                className={classes.tabs}>
                <Tab label="버거" className={classes.tab} value={1} />
                <Tab label="사이드" className={classes.tab} value={2} />
                <Tab label="음료" className={classes.tab} value={3} />
            </Tabs>
        </Paper>
    );
}