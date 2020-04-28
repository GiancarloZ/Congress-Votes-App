import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import BillDetail from './BillDetail'

const useStyles = makeStyles({
  root: {
    width:580,
    padding: 0,
    fontSize: 10,
    margin: 0,
  },
  head: {
    textAlign: 'right',
  },
  
});

const BillShow = ({bills}) => {
  const classes = useStyles();
  const ExpansionPanel = withStyles({
    root: {
      width:580,
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
      width: 580,
      padding: 0,
      fontSize: 10,
      margin: 0,
    },
    content: {
      width: 580,
      padding: 0,
      fontSize: 12,
      margin: 0,
      height: 'auto',
      textAlign: 'left'
    },
    label: {
      alignItems: 'right',
    },
   
  })(MuiExpansionPanelSummary);
  
  const ExpansionPanelDetails = withStyles((theme) => ({
    root: {
        width:580,
        padding: 0,
        margin: 0,
        minHeight: 48,
        textAlign: "left",
        fontSize: 11,
    },
   
  }))(MuiExpansionPanelDetails);
 

  return (
    <div className={classes.root}>

    {bills.map((bill) => 
        <ExpansionPanel  >
          <ExpansionPanelSummary
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          > 
            <b>{bill.number}</b>: {bill.title}<br></br>
            <b>Sponsor:</b> {bill.sponsor_name} ({bill.sponsor_party}) - {bill.sponsor_state} {bill.sponsor_title}
          </ExpansionPanelSummary>
                    
          <ExpansionPanelDetails>
                    
          <b>Summary:</b> {bill.summary}<br></br>
          <b>Committee:</b>{bill.committees}                
          </ExpansionPanelDetails>
            
        </ExpansionPanel>
    )}

    </div>
  )
}
export default BillShow