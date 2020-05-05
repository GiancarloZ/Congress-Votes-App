import React, { useState, useEffect } from 'react';
import config from '../config'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MemberInfoShow from '../components/MemberInfoShow';
import Button from '@material-ui/core/Button';
import MemberShow from '../components/MemberShow'
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { withStyles } from '@material-ui/core/styles';
import Headshot from '../containers/Headshot'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
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
      margin: 0,

    },
    paper: {
      padding: theme.spacing(1),
      color: theme.palette.text.secondary,
    },
    head: {
      textAlign: 'right',
    },
    
  }));

const MemberInfo = (prop) => {
    const [id, setId] = useState(prop['props'][0]['id'])
    const [hasError, setErrors] = useState(false)
    const [member, setMember] = useState([])
    const membs = prop['props'][0]
    console.log(id)
    console.log(prop)
    console.log(membs)
    console.log(member)
  
    const classes = useStyles();
 
    const ExpansionPanel = withStyles({
      root: {
        width:'auto',
        padding: 0,
        fontSize: 10,
        margin: 0,
        alignItems: 'center',
      },
    
    })(MuiExpansionPanel);
    
    const ExpansionPanelSummary = withStyles({
      root: {
        width:'auto',
        padding: 0,
        fontSize: 10,
        margin: 0,
        alignItems: 'center'
      },
      content: {
        display: 'contents',
        width:'auto',
        padding: 0,
        fontSize: 12,
        margin: 0,
        height: 48,
        alignItem: 'cemter'
      },
     
    })(MuiExpansionPanelSummary);
    
    const ExpansionPanelDetails = withStyles((theme) => ({
      root: {
          width:'auto',
          padding: 0,
          margin: 0,
          minHeight: 48,
          textAlign: "left",
          fontSize: 9,
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
                            {/* <Icon classes={{root: classes.iconRoot}}> */}
                            {/* <AllMemberInfo  member={member}/> */}
                                {/* <img alt='oval'  src="/Empty Oval.jpg" /> */}
                                {/* <img className={classes.imageIcon} src="/Empty Oval.jpg"/>
                            </Icon> */}
                            
                                        {membs.first_name + " " + membs.last_name} - ({membs.party})-{membs.state} 
                                        <br></br> {membs.title}
                                        <Headshot prop={id} />
                             

                    </ExpansionPanelSummary>
                  
                    <ExpansionPanelDetails>
                          
                            <Grid width={4}>
                                          <Paper className={classes.paper}>
                                            Next Election: {membs['next_election']}<br></br>
                                            Missed: {membs['missed_votes_pct']}%<br></br>
                                            w/ Party: {membs['votes_with_party_pct']}%<br></br>
                                            a/ Party: {membs['votes_against_party_pct']}%<br></br>  
                                            
                                            </Paper>
                            </Grid>

                      {Object.keys(member).length > 0 &&   
                          <div>            
                               
                                <Grid width={4}>
                                <Paper className={classes.paper}>
                                  Committees:
                                  <ul>{member["roles"][0]["committees"].map(comm => (
                                    <li key={comm.code}>
                                      {comm.name.replace(/&#39;/g,"'").replace(/&quot;/g,"'")}
                                    </li>
                                      ))}</ul>
                                      </Paper>
                                </Grid>
                            
                              <Grid width={8}>
                                <Paper className={classes.paper}>
                                  <a href={membs.url} >{membs.url}</a>
                                  <p>Address: {member['roles'][0]['office']}</p>
                                  <p>    Current Role: {member['roles'][0]['title']} {member['roles'][1]['congress'] === member['roles'][0]['congress'] ? ', ' + member['roles'][1]['title']: ''} - {member['roles'][0]['state']} {member['roles'][0]['district'] ? member['roles'][0]['district'] : ''} </p>
                                  <p>    In office until {member['roles'][0]['end_date'].substring(0,4)}</p>
                                  <p>    Address: {member['roles'][0]['office']}</p>
                                  <p>   Phone: {member['roles'][0]['phone']}</p>
                                  <p>  Current Role: {member['roles'][0]['title']}{member['roles'][1]['congress'] === member['roles'][0]['congress'] ? ', ' + member['roles'][1]['title']: ''} - {member['roles'][0]['state']} {member['roles'][0]['district'] ? member['roles'][0]['district'] : ''}</p>
                                  <p>  In office until {member['roles'][0]['end_date'].substring(0,4)}</p>
                                  <p>  Address: {member['roles'][0]['office']}</p>
                                  <p>  Phone: {member['roles'][0]['phone']}</p>
                                  </Paper>
                              </Grid>
                              <Grid width={8}>
                              
                                  Recent Statements by {member["first_name"]}

                                                
                                {/* <RecentStatements statements={statements}/> */}
                            
                            </Grid>
                         
                          
                            <Grid width={12}>

                                  {member["first_name"]}'s Recent Voting History
                                
                                {/* <CongressPersonVoteList votes={votes} /> */}
                      
                            </Grid>
                        
                          </div>
                        }
                        

                                                     
                   
                    </ExpansionPanelDetails>
            
                  </ExpansionPanel>  
      
        </div>
    )

} 
export default MemberInfo











