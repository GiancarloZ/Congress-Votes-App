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
import BillShow from '../components/BillShow'
import BillDetails from '../components/BillDetails'

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
    maxHeight: 275,  
    padding: 2
    // fontSize: 16
    // textOverflow: "ellipsis",
    // '&$expanded':{
    //   overflow: "scroll",
    //   textOverflow: "inherit"
    // },
    
  },
  expanded: {},
  details: {
    height: 400,
    padding: 2
  },
  paper: {
    // alignItems: "center",
  },
  heading: {
    overflow: "auto", 
    // textOverflow: "ellipsis", 
    height: '100%',
    // maxHeight: 195,
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
              <BillShow bill={bill} bills={bills}/>
          </Grid> 
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <Grid container  spacing={1}> 
            <BillDetails bill={bill} bills={bills}/>
          </Grid> 
        </AccordionDetails>
      </Accordion>
    )
}
export default BillInfo