import React, {Suspense } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, Grid, AppBar, Toolbar} from '@material-ui/core';


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
    padding: 1,
    color: theme.palette.text.secondary,
    textAlign: 'center',
    fontSize: 18,
    width: "100%",
    alignSelf: 'center'
  },
  grid: {
    padding: 1,
    width: "100%",
  },
  login: {
    padding: 1,
    color: theme.palette.text.secondary,
    textAlign: 'left',
    fontSize: 18,
    width: "100%",
    alignSelf: 'center'
  },
  profile: {
    padding: 1,
    color: theme.palette.text.secondary,
    textAlign: 'end',
    fontSize: 18,
    width: "100%",
    alignSelf: 'center'
  },
}));

const Home = (props) => {
  const classes = useStyles();
  const { history } = props;
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
   
      <AppBar position={'relative'} color={'transparent'} className={classes.grid} spacing={1} >
        <Toolbar disableGutters >
          <Grid container  >
            <Grid item  xs={3} className={classes.login}>
              <Signup  history={history}/>
              <LoginPage  history={history}/>
            </Grid>
            <Grid item  xs={6} className={classes.header}>
                <b><u>116th Congress</u></b>
            </Grid>
            <Grid item  xs={3} className={classes.profile} >
              <Profile handleClose={handleClose} handleMenu={handleMenu} anchorEl={anchorEl} open={open} />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>


      <Grid container className={classes.grid} spacing={1} >
          <Grid item xs={12} sm={12} md={3} lg={3}>
              <Paper className={classes.header}><b><u>Senate</u></b><br></br></Paper>
                <Suspense fallback={<div>Loading...</div>}  >     
                    <SenateComponent/>
                </Suspense>   
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Paper  className={classes.header}><b><u>Bills</u></b><br></br></Paper>
                <Suspense fallback={<div>Loading...</div>}  >     
                    <BillsComponent/>
                </Suspense>   
          </Grid>
          
          <Grid item xs={12} sm={12} md={3} lg={3}>
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
