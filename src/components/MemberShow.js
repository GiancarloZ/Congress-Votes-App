import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import MemberDetail from './MemberDetail'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import AllMemberInfo from '../containers/AllMemberInfo'
import Headshot from '../containers/AllMemberInfo'
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Button from '@material-ui/core/Button';
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

const MemberShow = ({members}) => {
  console.log(members)
  const classes = useStyles();
  // let twitter
  // let facebook
  // if (member && votes) {
  //   const middle = member.middle_name ? " " + member.middle_name + " " : " "
  //   if (member.twitter_account) {
  //     twitter = <span><Icon name="twitter"/><a href={`https://twitter.com/${member.twitter_account}`} >@{member.twitter_account}</a><br></br></span>
  //   }
  //   if (member.facebook_account) {
  //     facebook = <span><Icon name="facebook"/><a href={`https://facebook.com/${member.facebook_account}`} >{member.facebook_account}</a><br></br></span>
  //   } 
  // const [expanded, setExpanded] = React.useState(false);

  // const handleChange = (panel) => (event, isExpanded) => {
  //   setExpanded(isExpanded ? panel : false);
  // };
  const ExpansionPanel = withStyles({
    root: {
      width:265,
      padding: 0,
      fontSize: 10,
      margin: 0,
      
    //   border: '1px solid rgba(0, 0, 0, .125)',
    //   boxShadow: 'none',
    //   '&:not(:last-child)': {
    //     borderBottom: 0,
    //   },
    //   '&:before': {
    //     display: 'none',
    //   },
    //   '&$expanded': {
    //     margin: 'auto',
    //   },
    },
  
  })(MuiExpansionPanel);
  
  const ExpansionPanelSummary = withStyles({
    root: {
      width:265,
      padding: 0,
      fontSize: 10,
      margin: 0,
    
      // alignItems: 'center'
    //   backgroundColor: 'rgba(0, 0, 0, .03)',
    //   borderBottom: '1px solid rgba(0, 0, 0, .125)',
    //   marginBottom: -1,
    //   minHeight: 56,
    //   '&$expanded': {
    //     minHeight: 56,
    //   },
    },
    content: {

      width:265,
      padding: 0,
      fontSize: 12,
      margin: 0,
      height: 48,
      alignItem: 'cemter'
    },
    label: {
      alignItems: 'right',
    },
   
  })(MuiExpansionPanelSummary);
  
  const ExpansionPanelDetails = withStyles((theme) => ({
    root: {
        // display: 'contents',
        width:265,
        padding: 0,
        margin: 0,
        minHeight: 48,
        textAlign: "left",
        fontSize: 9,
    },
   
  }))(MuiExpansionPanelDetails);

  return (

    <div  className={classes.root}>

        {members.map((member) => 
           

                  <ExpansionPanel  >
                    <ExpansionPanelSummary
                      // expandIcon={<ExpandMoreIcon />}
                      
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                      // expandIcon={ <Headshot  member={member} />}
                    >    
                      {/* <Icon classes={{root: classes.iconRoot}}> */}
                        <Button 
                            href="/Empty Oval.jpg">
                       
                        </Button> 
                                      {/* <img alt='oval'  src="/Empty Oval.jpg" /> */}
                        {/* <img className={classes.imageIcon} src="/Empty Oval.jpg"/>
                      </Icon> */}
                      {member.first_name + " " + member.last_name} - ({member.party})-{member.state} 
                      <br></br> {member.title}  
                      {/* {Headshot(member)} */}
            
 
                    </ExpansionPanelSummary>
                  
                    <ExpansionPanelDetails>
                     
                          Missed: {member['missed_votes_pct']}%<br></br>
                          w/ Party: {member['votes_with_party_pct']}%<br></br>
                          a/ Party: {member['votes_against_party_pct']}%<br></br>    
                           <AllMemberInfo  member={member}/>
                    </ExpansionPanelDetails>
            
                  </ExpansionPanel>
                  
            
        )}
  
    </div>

  )
  
}

export default MemberShow

    
