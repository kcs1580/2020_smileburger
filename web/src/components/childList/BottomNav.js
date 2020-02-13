import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles({
    root: {
        width: 500,
        fontSize: '40px',
    },
    nav: {
        width: '50px',
        height: '50px',
        fontSize: '40px',
        height: '40px',

    }
});

const BottomNav = ({ select, setSelect }) => {
    const classes = useStyles();

    return (
        <Grid container justify="center">
            <BottomNavigation
                value={select}
                onChange={(event, newValue) => {
                    setSelect(newValue);
                }}
                showLabels
                className={classes.root}
            >
                <BottomNavigationAction label="버거" className={classes.nav} icon={<RestoreIcon />} value={0} />
                <BottomNavigationAction label="사이드" className={classes.nav} icon={<FavoriteIcon />} value={1} />
                <BottomNavigationAction label="음료" className={classes.nav} icon={<LocationOnIcon />} value={2} />
            </BottomNavigation>
        </Grid>
    );
}
export default BottomNav