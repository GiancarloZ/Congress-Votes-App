import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SenateMembers from './actions/SenateMemberActions'
import HouseMembers from './actions/HouseMemberActions'
import Bills from './actions/BillsActions'
import './index.css'

// import {
//   BrowserRouter as Router,
//   Route
// } from 'react-router-dom';



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
  
}));

const App = () => {
  const classes = useStyles();
  

  return (
  
   
   
    <div className={"body"}>
   
      <Grid container spacing={1} >
        
          <Grid  item xs={12}>
            <Paper className={classes.header}><b><u>116th Congress</u></b></Paper>
          </Grid>
      </Grid>


      <Grid container spacing={1} >
          <Grid item xs={12} sm={3}>
              <Paper   className={classes.header}><b><u>Senate</u></b><br></br></Paper>
              <Grid item xs={12} sm={12}>            
                 <SenateMembers/>
              </Grid>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper  className={classes.header}><b><u>Bills</u></b><br></br></Paper>
            <Grid item xs={12} sm={12}>
            <Bills/>
            </Grid>
          </Grid>
          
          <Grid item xs={12} sm={3}>
            <Paper className={classes.header}><b><u>House</u></b><br></br></Paper>
            <Grid item xs={12} sm={12}>
              <HouseMembers/>
            </Grid>
          </Grid>

      </Grid>
    </div>

  )

}

export default App;
