import React, { useState, useEffect } from 'react';
import config from '../config'

import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
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

const MemberInfo = (prop) => {

    const [id, setId] = useState(prop['props']['id'])
    const [hasError, setErrors] = useState(false)
    const [member, setMember] = useState([])
    const membs = prop['props']

    console.log(id)
    console.log(prop)
    console.log(member)
 
    const classes = useStyles();
 
    const ExpansionPanel = withStyles({
      root: {
        width:'auto',
        padding: 0,
        fontSize: 10,
        margin: 1,
        alignItems: 'center',
        aligntContent: 'center',

      },
    })(MuiExpansionPanel);
    
    const ExpansionPanelSummary = withStyles({
      root: {
        width:'auto',
        padding: 0,
        fontSize: 12,
        margin: 0,
        alignItems: 'center',
        height: 48,
      },
      content: {
        display: 'contents',
      },
    })(MuiExpansionPanelSummary);
    
    const ExpansionPanelDetails = withStyles((theme) => ({
      root: {
          width:'auto',
          padding: 0,
          margin: 1,
          minHeight: 48,
          textAlign: "left",
          fontSize: 10,
      },
    }))(MuiExpansionPanelDetails);

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
        <div>
          <ExpansionPanel  >
            <ExpansionPanelSummary
              // expandIcon={<ExpandMoreIcon />}                      
              aria-controls="panel1bh-content"
              id="panel1bh-header"                     
              // expandIcon={ <Headshot  member={member} />}
            >  
            <Grid container className={classes.sum} spacing={1} >
              <Grid item xs={2} sm={2}>
                    {/* <Icon classes={{root: classes.iconRoot}}> */}
                    {/* <AllMemberInfo  member={member}/> */}
                    {/* <img alt='oval'  src="/Empty Oval.jpg" /> */}
                    {/* <img className={classes.imageIcon} src="/Empty Oval.jpg"/>
                    </Icon> */}
              </Grid>   
              <Grid item xs={6} sm={6}>
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
            </ExpansionPanelSummary>
          
            <ExpansionPanelDetails>

              {Object.keys(member).length > 0 &&  
                <Grid container className={classes.grid} spacing={1} >  
                  <Grid container className={classes.grid} spacing={1} > 
                      <Grid item className={classes.head} xs={12} sm={8}>                                     
                          <a href={membs.url} target="_blank" >{membs.url}</a><br></br>
                          <b>Address:</b> {member['roles'][0]['office']}<br></br>
                          <b>Phone:</b> {member['roles'][0]['phone']}<br></br>
                          <b>Current Role:</b> {member['roles'][0]['title']} {member['roles'][0]['congress']} - {member['roles'][0]['state']} {member['roles'][0]['district']}
                      </Grid>
                  
                      <Grid item xs={12} sm={4}>
                          {/* <br></br> */}
                          Missed: {membs['missed_votes_pct']}%<br></br>
                          w/ Party: {membs['votes_with_party_pct']}%<br></br>
                          a/ Party: {membs['votes_against_party_pct']}%<br></br>                                  
                      </Grid>
                  </Grid>

                  <Grid container className={classes.grid} spacing={1} >   
                      <Grid item xs={12} sm={6}>
                          <div><b>{member["first_name"]}'s Recent Bills</b><br></br></div>
                          <MemberBills prop={id} />
                      </Grid>  

                      <Grid item xs={12} sm={6}>
                          <div><b>{member["first_name"]}'s Recent Voting History</b><br></br></div>
                          <MemberVotes prop={id} />
                      </Grid>   
                  </Grid>

                  <Grid container className={classes.grid} spacing={1} > 
                      <Grid item className={classes.com} xs={12} sm={6}>
                          <div><b><u>Committees</u></b></div>
                            { member["roles"][0]["committees"] &&
                              <ul className={classes.ul}>
                                {member["roles"][0]["committees"].map(comm => (                                                               
                                      <li key={comm.code}>
                                      {comm.name.replace(/&#39;/g,"'").replace(/&quot;/g,"'")}
                                    </li>                                        
                                  ))}
                              </ul>
                            }
                      </Grid>  
                      
                      <Grid item xs={12} sm={6}>                            
                          <div><b><u>Recent Statements by {member["first_name"]}</u></b></div>                                    
                          <MemberStatements prop={id} />                       
                      </Grid>
              
                  </Grid>
                </Grid>
              }

            </ExpansionPanelDetails>
          </ExpansionPanel>  
        </div>
    )

} 
export default MemberInfo











