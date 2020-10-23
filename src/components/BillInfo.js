import React, { useState, useEffect } from 'react';
import config from '../config'

import { makeStyles } from '@material-ui/core/styles';
// import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider';
const myHeaders = {
    'X-API-Key': config.PP_KEY
}
  
const myInit = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default'
}

const useStyles = makeStyles((theme) => ({
  expanded: {},
  root: {
    width:'100%',
    padding: 0,
    fontSize: 10,
    margin: 1,
    height: 75,
    display: "grid",
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    textAlign: "center",
    "&$expanded": {
      height: "auto",
    },
  },
  summary:{
    width:'auto',
    padding: 0,
    margin: 0,
    height: 'auto',
    // noWrap: "true",
    expanded: {},
    "& > :last-child": {
      margin: 0,
      "&$expanded": {
        height: 100,
      },
    },
  },
  details: {
    padding: 0,
    margin: 0,
    height: 'auto',
    width: 'auto',
  },
  paper: {
    // display: "contents",
  },
  grid: {
    width: 'auto',
    height: 'auto',
    display: "contents",
    paddng: 0.5,
  },
  com: {
    alignItems: 'flex-start',
    textAlign:  "center",
    height: "100%",
    width: "100%",
    fontSize: 10,
  },
  sum: {
    alignItems: 'center',
    width: '100%',
  },
  
  
}));


const BillInfo = (prop) => {
    const [id, setId] = useState(prop['props']['bill_slug'])
    const [hasError, setErrors] = useState(false)
    const [bill, setBill] = useState([])
    const bills = prop['props']

    console.log(id)
    console.log(prop)
    console.log(bill)
 
    const classes = useStyles();

    async function fetchBill() {
        fetch(`https://api.propublica.org/congress/v1/116/bills/${id}.json`, myInit)
        .then(res => res.json())
        .then(res => setBill(res['results'][0]))
        // .then(res => console.log(res['results'][0]))
        .catch(err => setErrors(err));      
    }
    
    useEffect(() => {
        fetchBill();
    }, []);
 
    return (
       
        <ExpansionPanel key={bill['bill_id']} classes={classes} >

          <ExpansionPanelSummary
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                className={classes.summary}
          >
          <Grid container  className={classes.grid} direction={"column"} wrap={'wrap'}  spacing={1}> 
          <br></br>
            <Grid container wrap="wrap" spacing={0}> 
              
              <Grid item  xs={2} sm={2} >   
                  {/* <Paper> */}
                    <b><u>Bill #:</u></b><br></br>
                    <b>{bills.number}</b> 
                  {/* </Paper> */}
         
                  <Divider />
                    
                  
                      <b><u>Date</u></b><br></br>   
                      {bills.introduced_date} 
          
              </Grid>
        
              <Grid item  xs={8} sm={8}> 
               {/* <Paper> */}
                 <b><u>Summary</u></b> <br></br> 
                 <Paper className={classes.paper} >
                 {bills.summary}
                 </Paper>
                 {/* </Paper> */}
              </Grid>
  
                <Grid item xs={2} sm={2}>    
                    
                    <b><u>Sponsor:</u></b> <br></br>
                    <Paper className={classes.paper}>
                      {bills.sponsor_name} ({bills.sponsor_party}) - {bills.sponsor_state} {bills.sponsor_title}
                     
                    </Paper>
                </Grid>
        
           
              </Grid>
              <br></br> 
            </Grid> 
            </ExpansionPanelSummary>
                    
            <ExpansionPanelDetails className={classes.details}>

            <Grid container direction={"column"} className={classes.grid} spacing={1}> 
            <br></br>
            <Grid container  spacing={1}> 
              
              <Grid item  xs={2} sm={2} >   
              {Object.keys(bill).length > 0 &&
              <div>
                <b><u>Votes</u></b><br></br> 
                <Divider />
                There have been {bill.votes ? <b>{bill.votes.length}</b> : ''} vote(s)
                <Divider />
                  <br></br>
                  {bill.votes.map(vote => (
                    <Paper className={classes.paper}>
                      <b><u>{vote.chamber} Vote</u> </b>
                      <p>{vote.question} ({vote.date})</p>
                      <p><u>Result: {vote.result}</u><br></br>
                        Y: {vote.total_yes}<br></br>
                        N: {vote.total_no}<br></br>
                        DNV: {vote.total_not_voting}</p>
                    </Paper>
                  ))}
              
                </div>
              }
                 
              </Grid>
        
              <Grid item  xs={8} sm={8}> 
              {/* {bills.summary} */}
              </Grid>
  
                <Grid item xs={2} sm={2}>    
                    
                  <b><u>Actions</u></b><br></br>
                  <Divider />
                  There have been {bill.actions ? <b>{bill.actions.length}</b> : ''} action(s)<br></br>
                  <Divider />
                    {Object.keys(bill).length > 0 &&
                      <div>
                          {bill.actions.map(action => (
                            <Paper>
                            <b><u>{action.chamber} Action</u></b> <br></br>
                            <p>{action.action_type} ({action.datetime})</p>
                            <p>{action.description}</p>
                            </Paper>
                          ))}
                      
                      </div>
                    }
                </Grid>
        
           
              </Grid>
              <br></br> 
            </Grid> 

          </ExpansionPanelDetails>
        </ExpansionPanel>
   
   
    )
}
export default BillInfo