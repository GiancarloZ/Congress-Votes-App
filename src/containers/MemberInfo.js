import React, { useState, useEffect } from 'react';
import config from '../config'
import { makeStyles } from '@material-ui/core/styles';
import {Accordion, AccordionSummary, AccordionDetails, Grid, Paper, Typography, List, ListItem} from '@material-ui/core';
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
      "&$expanded":{
        margin: 0,
      },
   
    },
    expanded:{},
    details: {
      maxHeight: 520,
      overflow: "hidden",
      padding: 0,
      margin: 1,
      expanded:{
        display: "none"
      }
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
      alignSelf: 'center',
      height: "100%",
      margin: 1,
    },
    grid: {
      textAlign: 'center'
    },
    add: {
      padding: 2
    },
    heading: {
     fontSize: "0.875rem"
    },
   
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
      <Accordion classes={{root: classes.root, expanded: classes.expanded}} >
            <AccordionSummary
              id={membs.id}       
            >  
            <Grid container className={classes.sum} spacing={1} >
              {/* <Grid item xs={2} sm={2}>
              </Grid>    */}
              <Grid item className={classes.sum} xs={6} sm={6}>
              <Typography Wrap className={classes.heading}  variant="p">
                {membs.first_name + " " + membs.last_name} - ({membs.party})-{membs.state} 
                <br></br> {membs.title}
                </Typography>
              </Grid>    
              <Grid item xs={3} sm={3}>
                <Headshot prop={id} />
              </Grid>    
              <Grid item xs={3} sm={3}>
              <Typography Wrap className={classes.heading}  variant="p">
                <b>Next <u>Election</u> {membs['next_election']}</b>
                </Typography>
              </Grid>    
            </Grid>
            </AccordionSummary>
          
            <AccordionDetails className={classes.details}>

              {Object.keys(member).length > 0 &&  
                <Grid container className={classes.add} spacing={1} >  
                  <Grid container className={classes.add} spacing={1} > 
                    <Grid item className={classes.add} xs={8} sm={8}>  
                    <Paper style={{textAlign: 'flex-start'}}>    
                    <Typography Wrap className={classes.heading}  variant="p">                               
                          <a href={membs.url} target="_blank" rel="noreferrer">Homepage</a><br></br>
                          <b>Address:</b> {member['roles'][0]['office']}<br></br>
                          <b>Phone:</b> {member['roles'][0]['phone']}<br></br>
                          <b>Current Role:</b> {member['roles'][0]['title']} {member['roles'][0]['congress']} - {member['roles'][0]['state']} {member['roles'][0]['district']}
                          </Typography>
                      </Paper>
                    </Grid>
                  
                    <Grid item xs={4} sm={4} className={classes.grid} >            
                      <Paper className={classes.vote}>
                      <Typography Wrap className={classes.heading}  variant="p">
                      <div className={classes.grid}><b><u>Vote %</u></b><br></br></div>
                        <u>Missed:</u> <b> {membs['missed_votes_pct']}%</b><br></br>
                        <u>w/ Party:</u> <b> {membs['votes_with_party_pct']}%</b><br></br>
                        <u>a/ Party:</u>  <b>{membs['votes_against_party_pct']}</b>%<br></br>  
                        </Typography> 
                      </Paper>                             
                    </Grid>
                  </Grid>

                  <Grid container className={classes.grid} spacing={1} > 

                    <Grid item xs={12} xs={6} className={classes.grid}>
                        <Paper className={classes.paper}>
                          
                        <Typography Wrap className={classes.heading}  variant="p">
                          <div><b><u>{member["first_name"]}'s Bills</u></b><br></br></div>
                          <MemberBills prop={id} />
                          </Typography>
                        </Paper>
                    </Grid>  

                    <Grid item xs={12} xs={6}>
                        <Paper className={classes.paper}>
                        <Typography Wrap className={classes.heading}  variant="p">
                        <div><b><u>{member["first_name"]}'s Votes</u></b><br></br></div>
                          <MemberVotes prop={id} />
                          </Typography>
                        </Paper>
                    </Grid>   
                  </Grid>

                  <Grid container className={classes.grid} spacing={1} > 
                      <Grid item className={classes.grid} xs={12} sm={6} xs={6}>
                     
                      { member["roles"][0]["committees"] &&
                      <Paper variant="outlined" className={classes.paper}>
                         <Typography Wrap className={classes.heading}  variant="p">  
                            <b><u>Committees</u></b>
                          </Typography> 
                          {member["roles"][0]["committees"].map(comm => (        
                              <Typography Wrap className={classes.heading}  variant="p">                                           
                                <List key={comm.code} component="body2" variant="p">
                                  <ListItem>
                                {comm.name.replace(/&#39;/g,"'").replace(/&quot;/g,"'")}
                                </ListItem>
                                </List>
                              </Typography>                             
                            ))}
                      </Paper>
                      }
                      </Grid>  
                      
                      <Grid item xs={12} sm={6} xs={6}>  
                      <Paper variant="outlined" className={classes.paper}>       
                          <Typography Wrap className={classes.heading}  variant="p">    
                          <b><u> {member["first_name"]}'s Statements</u></b>                                       
                          <MemberStatements prop={id} />
                          </Typography>
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











