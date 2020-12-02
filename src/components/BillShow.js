import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
  root: {
    width:580,
    padding: 0,
    fontSize: 10,
    margin: 0,
  },
  paper:{
    maxHeight: 275,
    overflow: "auto", 
    '&::-webkit-scrollbar': {
      width: '0.5em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey'
    }
  },
  heading: {
    // textOverflow: "ellipsis", 
    // width: '100%'
    // height: "100%",
    
  },
  
});

const BillShow = ({bill, bills}) => {
  const classes = useStyles();
  const dateConv = (date) => {
    let dateTime = date.split("-")
    let year = dateTime[0]
    let day = dateTime[2]
    let month = dateTime[1]
    
    let newDate = month + "-" + day + "-" + year
    return newDate
}
  return (
  <Grid container spacing={1}> 
      <Grid item  xs={2} sm={2} >  
        <Card style={{width: "100%"}} > 
          <CardContent style={{padding: 0}}>
            <Typography component="body2">
              <b><u>Bill #:</u></b><br></br>
              <b>{bills.number}</b> 
            </Typography>
            <Divider />
            <Typography component="body2">
            <b><u>Date</u></b><br></br>   
            {dateConv(bills.introduced_date)}
            </Typography>
            <Divider />
            <Typography component="body2">
            <b><u>Votes</u></b><br></br> 
            There have been {bill.votes ? <b>{bill.votes.length}</b> : ''} vote(s)
            <Divider />
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item  xs={8} sm={8} style={{height: "100%"}}> 
        <Paper elevation={0} className={classes.paper} > 
          <Typography Wrap className={classes.heading}>
            <b><u>Summary</u></b> <br></br>
            {bills.summary}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={2} sm={2}>    
        <Paper className={classes.paper}>
        <Typography component="body2">
          <b><u>Sponsor:</u></b> <br></br>
            {bills.sponsor_name} ({bills.sponsor_party}) - {bills.sponsor_state} {bills.sponsor_title}
          <Divider />
          <b><u>Actions</u></b><br></br>
          There have been {bill.actions ? <b>{bill.actions.length}</b> : ''} action(s)<br></br>
        <Divider />
        </Typography>
        </Paper>
      </Grid>
    </Grid>
  )
}
export default BillShow