import React, { useState, useEffect } from 'react';
import config from '../config'

import { makeStyles, withStyles } from '@material-ui/core/styles';
// import { withStyles } from '@material-ui/core/styles';
import {Accordion, Card, List} from '@material-ui/core';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
    textAlign: "center"
    // overflow: "hidden", 
    // textOverflow: "ellipsis",
    //   '&$expanded': {
    //     overflow: "scroll", textOverflow: "inherit",
    //   },
    //   expanded: {},
  },
  
  summary:{
    alignItems: "center",
    maxHeight: 200,  
    // textOverflow: "ellipsis",
    // '&$expanded':{
    //   overflow: "scroll",
    //   textOverflow: "inherit"
    // },
    
  },
  expanded: {},
  details: {
    maxHeight: 400,
  },
  paper: {
    // alignItems: "center",
  },
  heading: {
    overflow: "auto", 
    // textOverflow: "ellipsis", 
    // width: '100%'
    maxHeight: 195,
    '&::-webkit-scrollbar': {
      width: '0.1em'
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
  side: {
    margin: 1,
    overflow: "auto",
    maxHeight: 395,
    '&::-webkit-scrollbar': {
      width: '0.1em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey'
    }
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
    console.log(bills)
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
    
    const dateConv = (date) => {
        let dateTime = date.split("-")
        let year = dateTime[0]
        let day = dateTime[2]
        let month = dateTime[1]
        
        let newDate = month + "-" + day + "-" + year
        return newDate
    }
    return (
      <Accordion key={bill['bill_id']} className={classes.root}  >
        <AccordionSummary
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          className={classes.summary}   
        >
          <Grid container spacing={1}> 
            <Grid container spacing={1}> 
              <Grid item  xs={2} sm={2} >  
                <Paper> 
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
                </Paper>
              </Grid>
              <Grid item  xs={8} sm={8} style={{height: "100%"}}> 
                <Paper className={classes.paper} > 
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
          </Grid> 
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <Grid container  spacing={1}> 
          <Grid container  spacing={1}> 
            <Grid item xs={2} sm={2} style={{maxHeight: 400}}>        
              {Object.keys(bill).length > 0 &&
                <div className={classes.side}>
                  {bill.votes.map(vote => (
                    <Paper className={classes.side}>
                      <Typography component="body2">
                      <b><u>{vote.chamber} Vote</u> </b>
                      <p>{vote.question} {dateConv(vote.date)}</p>
                      <p><u>Result: {vote.result}</u><br></br>
                        Y: {vote.total_yes}<br></br>
                        N: {vote.total_no}<br></br>
                        DNV: {vote.total_not_voting}</p>
                      </Typography>
                    </Paper>
                  ))}
                </div>
              }
            </Grid>
            <Grid item  xs={8} sm={8}> 
            </Grid>
            <Grid item xs={2} sm={2} style={{maxHeight: 400}}>        
              {Object.keys(bill).length > 0 &&
                <div className={classes.side}>
                    {bill.actions.map(action => (
                      <Paper className={classes.side} >
                      <Typography component="body2" >
                      <b><u>{action.chamber} Action</u></b> <br></br>
                      <p>{action.action_type} <br></br>{dateConv(action.datetime)}</p>
                      <p>{action.description}</p>
                      </Typography>
                      </Paper>
                    ))}
                
                </div>
              }
            </Grid>
          </Grid>
          </Grid> 
        </AccordionDetails>
      </Accordion>
    )
}
export default BillInfo