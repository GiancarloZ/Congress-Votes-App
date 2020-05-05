import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import MemberInfo from '../containers/MemberInfo'
import MemberBills from '../containers/MemberBills'
import MemberStatements from '../containers/MemberStatements'
import MemberVotes from '../containers/MemberVotes'
import Headshot from '../containers/Headshot'
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Button from '@material-ui/core/Button';
import MemberInfoShow from './MemberInfoShow';

const useStyles = makeStyles({
    root: {
      width:265,
      padding: 0,
      fontSize: 10,
      margin: 0,

    },
    head: {
      textAlign: 'right',
    },
    
});

const MemberShow = (member) => {
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

  return (

    <div >

        {/* {members.map((member) =>  */}
                 
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
                      {member.first_name + " " + member.last_name} - ({member.party})-{member.state} 
                      <br></br> {member.title}  
                      <Headshot prop={member}/>
                      <MemberInfo member={member} />
                    </ExpansionPanelSummary>
                  
                    <ExpansionPanelDetails>
                         
                          Next Election: {member['next_election']}<br></br>
                          Missed: {member['missed_votes_pct']}%<br></br>
                          w/ Party: {member['votes_with_party_pct']}%<br></br>
                          a/ Party: {member['votes_against_party_pct']}%<br></br>    

                          <MemberInfoShow prop={member}/>
                         
                    </ExpansionPanelDetails>
            
                  </ExpansionPanel>
                  
            
        )
  
    </div>

  )
  
}

export default MemberShow

    
