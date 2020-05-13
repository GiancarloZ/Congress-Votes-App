import React, { useState, useEffect } from 'react';
import config from '../config'

import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
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
  root: {
    width:265,
    padding: 0,
    fontSize: 10,
    margin: 1,

  },
  ul: {
    padding: 0,
    margin: theme.spacing(3),

  },
  paper: {
    padding: 0,
  },
  head: {
    textAlign: 'left',
  },
  side: {
    alignItems: 'flex-start',
  },
  grid: {
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    // justify: 'space-around',
    margin: 0,
    width: '100%',
  },
  com: {
    alignItems: 'center',
    textAlign:  "center",
    height: "100%",
    width: "100%"
  },
  sum: {
    alignItems: 'center',
    width: '100%',
  }
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
 
    const ExpansionPanel = withStyles({
        root: {
          width:'auto',
          padding: 0,
          fontSize: 10,
          margin: 1,
        },
      })(MuiExpansionPanel);
      
      const ExpansionPanelSummary = withStyles({
        root: {
          width:'auto',
          padding: 0,
          fontSize: 11,
          margin: 0,
          minHeight: 48,
          '&$expanded': {
             minHeight: 48,
      },
        },
        content: {
          '&$expanded': {
            margin: 1,
          },
          display: 'contents',
        },
      })(MuiExpansionPanelSummary);
      
      const ExpansionPanelDetails = withStyles((theme) => ({
        root: {
            width:'auto',
            padding: 0,
            margin: 1,
            minHeight: 48,
            textAlign: "center",
            fontSize: 10,
        },
      }))(MuiExpansionPanelDetails);

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
        <div>
        <ExpansionPanel key={bill['bill_id']} >

          <ExpansionPanelSummary
                aria-controls="panel1bh-content"
                id="panel1bh-header"
          >
          <Grid container direction={"column"} className={classes.com} spacing={1}> 
          <br></br>
            <Grid container  spacing={1}> 
              
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
                 {bills.summary_short}
                 {/* </Paper> */}
              </Grid>
  
                <Grid item xs={2} sm={2}>    
                    
                    <b><u>Sponsor:</u></b> <br></br>
                    <Paper>
                      {bills.sponsor_name} ({bills.sponsor_party}) - {bills.sponsor_state} {bills.sponsor_title}
                     
                    </Paper>
                </Grid>
        
           
              </Grid>
              <br></br> 
            </Grid> 
            </ExpansionPanelSummary>
                    
            <ExpansionPanelDetails>

            <Grid container direction={"column"} className={classes.com} spacing={1}> 
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
                    <Paper>
                      <b><u>{vote.chamber} Vote</u> </b>
                      <p>{vote.question} ({vote.date})</p>
                      <p><u>Result: {vote.result}</u></p>
                      <p>Y: {vote.total_yes}</p>
                      <p>N: {vote.total_no}</p>
                      <p>DNV: {vote.total_not_voting}</p>
                    </Paper>
                  ))}
              
                </div>
              }
                 
              </Grid>
        
              <Grid item  xs={8} sm={8}> 
              {bills.summary}
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
   
        </div>
    )
}
export default BillInfo