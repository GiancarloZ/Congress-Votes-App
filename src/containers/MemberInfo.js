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
import MemberVotes from '../containers/MemberVotes'
import Grid from '@material-ui/core/Grid'

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
    // container: {
    //   display: 'grid',
    //   gridTemplateColumns: 'repeat(12, 1fr)',
    //   gridGap: theme.spacing(0),
    // },
    // paper: {
    //   padding: theme.spacing(0),
    //   textAlign: 'left',
    //   color: theme.palette.text.secondary,
    //   whiteSpace: 'nowrap',
    //   marginBottom: theme.spacing(0),
    // },
    paper: {
      padding: 0,
    //   color: theme.palette.text.secondary,
    //   textAlign: 'left',
    },
    head: {
      textAlign: 'left',
    },
    
  }));

const MemberInfo = (prop) => {

    const [id, setId] = useState(prop['props']['id'])
    const [hasError, setErrors] = useState(false)
    const [member, setMember] = useState([])
    const membs = prop['props']

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
        margin: 1,
        alignItems: 'left',
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
        // width:'auto',
        // padding: 0,
        // fontSize: 12,
        // margin: 0,
        // alignItem: 'cemter'
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
                          
                           

                      {Object.keys(member).length > 0 &&   
                          <Grid container spacing={1}> 
                                  <Grid item xs={12} sm={8}>
                                    
                                  
                                    <a href={membs.url} target="_blank" >{membs.url}</a><br></br>
                                   <b>Address:</b> {member['roles'][0]['office']}<br></br>
                                   <b>Phone:</b> {member['roles'][0]['phone']}<br></br>
                                   <b>Current Role:</b> {member['roles'][0]['title']}{member['roles'][1]['congress'] === member['roles'][0]['congress'] ? ', ' + member['roles'][1]['title']: ''} - {member['roles'][0]['state']} {member['roles'][0]['district'] ? member['roles'][0]['district'] : ''}
                                
                              
                              </Grid>

                                <Grid item xs={12} sm={4}>
                                    
                                      <b>Next Election: {membs['next_election']}</b><br></br>
                                      Missed: {membs['missed_votes_pct']}%<br></br>
                                      w/ Party: {membs['votes_with_party_pct']}%<br></br>
                                      a/ Party: {membs['votes_against_party_pct']}%<br></br>  
                                  
                                  </Grid>
                                  


                              <Grid item xs={12} sm={6}>
                                    <div className={classes.head}><b>Committees:</b></div>
                                    <ul className={classes.ul}>{member["roles"][0]["committees"].map(comm => (
                                      
                                        <li key={comm.code}>
                                          {comm.name.replace(/&#39;/g,"'").replace(/&quot;/g,"'")}
                                        </li>
                                      ))}
                                    </ul>
                                    <Grid item xs={12} sm={6}>                            
                                      <div className={classes.root}><b>Recent Statements by {member["first_name"]}  </b>     </div>                                    
                                    {/* <RecentStatements statements={statements}/> */}                        
                                    </Grid>
                              </Grid>

                              <Grid item xs={12} sm={6}>
                                <b>{member["first_name"]}'s Recent Voting History</b><br></br>
                                {/* <CongressPersonVoteList votes={votes} /> */}
     
                                    <MemberVotes prop={id} />
                                
                              </Grid>        
                             
                              
                           
                          </Grid>
                      
                        }
                        

                                                     
                   
                    </ExpansionPanelDetails>
            
                  </ExpansionPanel>  
      
        </div>
    )

} 
export default MemberInfo











