import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SenateMembers from './actions/SenateMemberActions'
import HouseMembers from './actions/HouseMemberActions'

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
  },
}));

const TestApp = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        
          <Grid item xs={12}>
            <Paper className={classes.header}>116th Congress</Paper>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Paper className={classes.header}>Senate</Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.header}>Bills</Paper>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Paper className={classes.header}>House</Paper>
          </Grid>
    
        <Grid item xs={6} sm={3}>
        
            <SenateMembers/>
         
        </Grid>
        <Grid item xs={6} sm={6}>
          <Paper className={classes.paper}>
            {/* <Bills/> */}
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>
            <HouseMembers/>
          </Paper>
        </Grid>
      
      </Grid>
    </div>
  
  )

}

export default TestApp;
