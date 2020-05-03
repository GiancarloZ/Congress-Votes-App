import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SenateMembers from './actions/SenateMemberActions'
import HouseMembers from './actions/HouseMemberActions'
import Bills from './actions/BillsActions'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
// import PostToDb from './actions/PostToDb'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  header: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    textAlign: 'center',
    fontSize: 18,
  },
}));

const TestApp = () => {
  const classes = useStyles();
  

  return (
    <Router>
   
   
    <div className={classes.root}>
    <Route exact path="/" component={Home} />
      <Grid container spacing={1}>
        
          <Grid item xs={12}>
            <Paper className={classes.header}><b><u>116th Congress</u></b></Paper>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Paper className={classes.header}>
            <b><u>Senate</u></b><br></br>
             
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper className={classes.header}><b><u>Bills</u></b><br></br></Paper>
          </Grid>
          
          <Grid item xs={12} sm={3}>
            <Paper className={classes.header}><b><u>House</u></b><br></br></Paper>
          </Grid>
    
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper}>
            <SenateMembers/>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Bills/>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper}>
            <HouseMembers/>
          </Paper>
        </Grid>
      
      </Grid>
    </div>
    </Router>
  )

}

export default TestApp;
