import React, { useState, useEffect } from 'react';
import config from '../config'
import { makeStyles } from '@material-ui/core/styles';
import {Accordion, AccordionDetails, AccordionSummary, Grid} from '@material-ui/core';
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
  },
  
  summary:{
    alignItems: "center",
    maxHeight: 275,  
    padding: 2
  },
  expanded: {},
  details: {
    height: 400,
    padding: 2
  },

  heading: {
    overflow: "auto", 
    height: '100%',
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