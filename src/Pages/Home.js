import React, { useState, useEffect, Suspense } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, Grid, AppBar, Toolbar, Typography} from '@material-ui/core';


import Signup from './Signup';
import LoginPage from './Login';
import Profile from '../components/Profile';
const SenateComponent = React.lazy(() => import('../actions/SenateMemberActions'));
const HouseComponent = React.lazy(() => import('../actions/HouseMemberActions'));
const BillsComponent = React.lazy(() => import('../actions/BillsActions'));

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    margin: theme.spacing(0),
    
  },
  paper: {
    padding: theme.spacing(1),

  },
  header: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    textAlign: 'center',
    fontSize: 18,
    width: "100%",
    alignSelf: 'center'
  },
  grid: {
    padding: 1,
    display: "flex"
  },
  login: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    textAlign: 'left',
    fontSize: 18,
    width: "100%",
    alignSelf: 'center'
  },
  profile: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    textAlign: 'end',
    fontSize: 18,
    width: "100%",
    alignSelf: 'center'
  },
}));

const Home = (props) => {
  const classes = useStyles();
  const {match, history } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (

    <div className={"body"}>
   
      <AppBar position={'inherit'} color={'white'} className={classes.grid} spacing={1} >
        <Toolbar disableGutters >
          <Grid container  >
            <Grid item  xs={12} sm={3} className={classes.login}>
              <Signup  history={history}/>
              <LoginPage  history={history}/>
            </Grid>
            <Grid item  xs={12} sm={6}className={classes.header}>
                <b><u>116th Congress</u></b>
            </Grid>
            <Grid  xs={12} sm={3} className={classes.profile} >
              <Profile handleClose={handleClose} handleMenu={handleMenu} anchorEl={anchorEl} open={open} />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>


      <Grid container className={classes.grid} spacing={1} >
          <Grid item xs={12} sm={3}>
              <Paper className={classes.header}><b><u>Senate</u></b><br></br></Paper>
                <Suspense fallback={<div>Loading...</div>}  >     
                    <SenateComponent/>
                </Suspense>   
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper  className={classes.header}><b><u>Bills</u></b><br></br></Paper>
                <Suspense fallback={<div>Loading...</div>}  >     
                    <BillsComponent/>
                </Suspense>   
          </Grid>
          
          <Grid item xs={12} sm={3}>
            <Paper className={classes.header}><b><u>House</u></b><br></br></Paper>
                <Suspense fallback={<div>Loading...</div>}  >     
                    <HouseComponent/>
                </Suspense>   
          </Grid>

      </Grid>
    </div>

  )

}

export default Home;
