import React, { useState, useEffect, Suspense } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SenateMembers from '../actions/SenateMemberActions'
import HouseMembers from '../actions/HouseMemberActions'
import Bills from '../actions/BillsActions'

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
  },
  grid: {
    padding: 0,
  }
}));

const Home = () => {
  const classes = useStyles();
  

  return (

    <div className={"body"}>
   
      <Grid container className={classes.grid}  spacing={1} >
        
          <Grid  item xs={12}>
            <Paper className={classes.header}><b><u>116th Congress</u></b></Paper>
          </Grid>
      </Grid>


      <Grid container className={classes.grid} spacing={1} >
          <Grid item xs={12} sm={3}>
              <Paper   className={classes.header}><b><u>Senate</u></b><br></br></Paper>
              <Grid item xs={12} sm={12}>  
                <Suspense fallback={<div>Loading...</div>}  >     
                 <SenateComponent/>
                </Suspense>   
              </Grid>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper  className={classes.header}><b><u>Bills</u></b><br></br></Paper>
            <Grid item xs={12} sm={12}>
             <Suspense fallback={<div>Loading...</div>}  >     
                 <BillsComponent/>
                </Suspense>   
            </Grid>
          </Grid>
          
          <Grid item xs={12} sm={3}>
            <Paper className={classes.header}><b><u>House</u></b><br></br></Paper>
            <Grid item xs={12} sm={12}>
            <Suspense fallback={<div>Loading...</div>}  >     
                 <HouseComponent/>
                </Suspense>   
            </Grid>
          </Grid>

      </Grid>
    </div>

  )

}

export default Home;
