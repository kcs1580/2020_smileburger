import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const lightColor = 'rgba(255, 255, 255, 0.7)';

const useStyles = makeStyles(theme => ({
  secondaryBar: {
    zIndex: 0,
  },
  thirdBar: {
    zIndex: 0,
    alignItems: 'center',

  },
  menuButton: {
    marginLeft: -theme.spacing(1),
  },
  iconButtonAvatar: {
    padding: 4,
  },
  link: {
    textDecoration: 'none',
    color: lightColor,
    '&:hover': {
      color: theme.palette.common.white,
    },
  },
  button: {
    borderColor: lightColor,
  },
}))

const Header = ({ tapidx, setTapidx }) => {
  const classes = useStyles();

  return (
    <React.Fragment>

      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="secondary"
        position="static"
        elevation={0}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs >
              <Typography color="inherit" variant="h5" component="h1">
                POS
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        className={classes.thirdBar}
        color="secondary"
        position="static"
        elevation={0}
      >
        <Tabs value={tapidx} textColor="inherit">
          <Tab textColor="inherit" label="주문현황" onClick={() => { setTapidx(0) }} />
          <Tab textColor="inherit" label="판매목록" onClick={() => { setTapidx(1) }} />
          <Tab textColor="inherit" label="뭘넣지" onClick={() => { setTapidx(2) }} />
          <Tab textColor="inherit" label="뭘 넣을까" onClick={() => { setTapidx(3) }} />
        </Tabs>
      </AppBar>
    </React.Fragment>
  );
}

export default Header
