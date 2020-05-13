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
  grid: {
    alignContent: 'center',
    alignItems: 'flex-start',
    textAlign: 'center',
    margin: 0,
    width: '100%',
  },
  com: {
    alignSelf: 'flex-start',
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
          alignItems: 'center',
          alignContent: 'center',
        },
      })(MuiExpansionPanel);
      
      const ExpansionPanelSummary = withStyles({
        root: {
          width:'auto',
          padding: 0,
          fontSize: 11,
          margin: 0,
          alignItems: 'center',
          textAlign: 'center',
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
              <Grid container className={classes.grid} spacing={1}> 
                  <Grid item className={classes.grid} xs={12} sm={1}  >    
                    <b><u>Bill #:</u></b><br></br>
                    <b>{bills.number}</b> 
                  </Grid>
                  <Grid item className={classes.grid} xs={12} sm={8}>  
                    {bills.summary_short}
                  </Grid>
                  <Grid item className={classes.grid} xs={12} sm={3}>    
                    <b><u>Sponsor:</u></b> <br></br>
                    <Paper>
                      {bills.sponsor_name} ({bills.sponsor_party}) - {bills.sponsor_state} {bills.sponsor_title}
                    </Paper>
                  </Grid>
              </Grid>
            </ExpansionPanelSummary>
                    
            <ExpansionPanelDetails>
              <Grid container className={classes.grid} spacing={1}> 
                
                <Grid container className={classes.grid} spacing={1}>  
                  <Grid item xs={12} sm={1}>  
                    <b><u>Introduced</u></b><br></br>   
                    {bills.introduced_date}  
                  </Grid>
                  <Grid item xs={12} sm={8}>  
                    <b><u>Summary</u></b> <br></br>
                    {bills.summary}<br></br>
                  </Grid>
  
                  <Grid item xs={12} sm={3}>  
                    <b><u>Actions</u></b><br></br>
                    {bills.latest_major_action}<br></br>                  
                  </Grid>  
              
                </Grid>  

                <Grid container className={classes.grid} spacing={1} justify={"space-between"}>  
            
                  <Grid item xs={12} sm={3}>  
                    <b><u>Committee</u></b><br></br>
                    {bills.committees} <br></br>
                  </Grid> 
                   <Grid item xs={12} sm={3}>  
                    <b><u>Primary Subject</u></b><br></br>
                    {bills.primary_subject}   <br></br>          
                  </Grid>
                </Grid>

              </Grid> 

          </ExpansionPanelDetails>
        </ExpansionPanel>
   
        </div>
    )
}
export default BillInfo