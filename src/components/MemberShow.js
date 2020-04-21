import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import MemberDetail from './MemberDetail'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import AllMemberInfo from '../containers/AllMemberInfo'

const useStyles = makeStyles({
    root: {
      width:255,
      padding: 0,
      fontSize: 10,
    },
    title: {
        width: 170,
        textAlign: "left",
        fontSize: 11,

    },
    sub: {
        textAlign: "right",
        fontSize: 9,
    },
    pos: {
      marginBottom: 12,
    },
});

const MemberShow = ({members}) => {
  const classes = useStyles();
  // const [expanded, setExpanded] = React.useState(false);

  // const handleChange = (panel) => (event, isExpanded) => {
  //   setExpanded(isExpanded ? panel : false);
  // };
  return (

    <div >

        {members.map((member) => 
           
      
                  <ExpansionPanel >
                  <ExpansionPanelSummary
                    // expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >         
                    <Typography className={classes.root}>
                    
                    <Box className={classes.title} >
                    {member.first_name + " " + member.last_name} - ({member.party})-{member.state} 
                    </Box>
                    </Typography>

                    {/* <Typography >
                        <Box className={classes.sub}>
                        Missed: {member.missed_votes_pct}%<br></br>
                        w/ Party: {member.votes_with_party_pct}%<br></br>
                        a/ Party: {member.votes_against_party_pct}%<br></br>
                        </Box>  
                     
                    </Typography> */}
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <AllMemberInfo  member={member}/>
                   </ExpansionPanelDetails>
                  </ExpansionPanel>
 
            
        )}
  
    </div>

  )
  
}

export default MemberShow

    
