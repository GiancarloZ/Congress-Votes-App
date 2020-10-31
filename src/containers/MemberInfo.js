import React, { useState, useEffect } from 'react';
import config from '../config'

import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import {Accordion, Paper, Typography, List, ListItem} from '@material-ui/core';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';

import Headshot from '../containers/Headshot'
import MemberVotes from '../containers/MemberVotes'
import MemberStatements from '../containers/MemberStatements'
import MemberBills from '../containers/MemberBills'


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
      width: "100%",
      padding: 0,
      fontSize: 10,
      margin: 1,
      alignItems: "center",
    },
    summary: {
      margin: 0,
      marginTop: 0,
      marginBottom: 0,
      padding: 0,
      justifyContent: "space-evenly",
      alignItems: "center",
      textAlign: "center",
      maxHeight: 66,
      '&content': {
        margin: "0px 0"
      },
      "&:last-child":{
        margin: "0px 0"
      },
      overrides: {
        MuiAccordionSummary:{
          "&content":{
            margin: "0px 0",
            marginTop: 0,
            marginBottom: 0,
          }
        }
      },
    },
    details: {
      maxHeight: 520,
      overflow: "hidden",
      padding: 0
    },
    sum: {
      height: "100%",
      textAlign: 'flex-start'
    },
    paper: {
      overflow: "auto",
      height: 200,
      width: "100%",
      margin: 0,
      textAlign: "center",
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
    vote: {
      alignSelf: 'center'
    },
    grid: {
      textAlign: 'center'
    }
  }));

const MemberInfo = (prop) => {

    const [id, setId] = useState(prop['props']['id'])
    const [hasError, setErrors] = useState(false)
    const [member, setMember] = useState([])
    const membs = prop['props']

    console.log(id)
    console.log(prop)
    console.log(member)
 
    const classes = useStyles();

    async function fetchMember() {
        fetch(`https://api.propublica.org/congress/v1/members/${id}.json`, myInit)
        .then(res => res.json())
        .then(res => setMember(res['results'][0]))
        // .then(res => console.log(res['results'][0]))
        .catch(err => setErrors(err));      
    }
    
    useEffect(() => {
        fetchMember();
    }, []);
 
    return (
      <Accordion className={classes.root} >
            <AccordionSummary
              // expandIcon={<ExpandMoreIcon />}                      
              // aria-controls="panel1a-content"
              id={membs.id}       
              className={classes.summary}             
              // expandIcon={ <Headshot  member={member} />}
            >  
            <Grid container className={classes.sum} spacing={1} >
              <Grid item xs={2} sm={2}>
                  {/* oval icon animation  */}
              </Grid>   
              <Grid item className={classes.sum} xs={6} sm={6}>
                {membs.first_name + " " + membs.last_name} - ({membs.party})-{membs.state} 
                <br></br> {membs.title}
              </Grid>    
              <Grid item xs={2} sm={2}>
                <Headshot prop={id} />
              </Grid>    
              <Grid item xs={2} sm={2}>
                <b>Next <u>Election</u> {membs['next_election']}</b>
              </Grid>    
            </Grid>
            </AccordionSummary>
          
            <AccordionDetails className={classes.details}>

              {Object.keys(member).length > 0 &&  
                <Grid container className={classes.grid} spacing={1} >  
                  <Grid container className={classes.grid} spacing={1} > 
                    <Grid item className={classes.grid} xs={12} sm={8}>  
                    <Paper>                                   
                          <a href={membs.url} target="_blank" >Homepage</a><br></br>
                          <b>Address:</b> {member['roles'][0]['office']}<br></br>
                          <b>Phone:</b> {member['roles'][0]['phone']}<br></br>
                          <b>Current Role:</b> {member['roles'][0]['title']} {member['roles'][0]['congress']} - {member['roles'][0]['state']} {member['roles'][0]['district']}
                      </Paper>
                    </Grid>
                  
                    <Grid item xs={12} sm={4}className={classes.grid} >
                      <div style={{textAlign: 'center'}}><b><u>Vote %</u></b></div>
                      <Paper className={classes.vote}>
                        <b>Missed: {membs['missed_votes_pct']}%</b><br></br>
                        <b>w/ Party: {membs['votes_with_party_pct']}%</b><br></br>
                        <b> a/ Party: {membs['votes_against_party_pct']}</b>%<br></br>   
                      </Paper>                             
                    </Grid>
                  </Grid>

                  <Grid container className={classes.grid} spacing={1} > 

                    <Grid item xs={12} sm={6} className={classes.grid}>
                      <div><b>{member["first_name"]}'s Recent Bills</b><br></br></div>
                        <Paper className={classes.paper}>
                          <MemberBills prop={id} />
                        </Paper>
                    </Grid>  

                    <Grid item xs={12} sm={6}>
                      <div><b>{member["first_name"]}'s Recent Votes</b><br></br></div>
                        <Paper className={classes.paper}>
                          <MemberVotes prop={id} />
                        </Paper>
                    </Grid>   
                  </Grid>

                  <Grid container className={classes.grid} spacing={1} > 
                      <Grid item className={classes.grid} xs={12} sm={6}>
                      <div><b><u>Committees</u></b></div>
                      { member["roles"][0]["committees"] &&
                      <Paper className={classes.paper}>
                          {member["roles"][0]["committees"].map(comm => (                                                               
                            <List key={comm.code} component="body2" variant="p">
                              <ListItem>
                            {comm.name.replace(/&#39;/g,"'").replace(/&quot;/g,"'")}
                            </ListItem>
                            </List>
                                                             
                            ))}
                      </Paper>
                      }
                      </Grid>  
                      
                      <Grid item xs={12} sm={6}>  
                      <div><b><u> {member["first_name"]}'s Recent Statements</u></b></div>   
                      <Paper className={classes.paper}>                                                  
                          <MemberStatements prop={id} />
                      </Paper>                    
                      </Grid>
                  </Grid>

                </Grid>
              }

            </AccordionDetails>
    </Accordion> 

    )
} 
export default MemberInfo











