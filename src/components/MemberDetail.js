import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
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
}));

const MemberDetail = ({member}) => {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
     
        <Typography className={classes.title}>
          {member.title}<br></br>
        </Typography>
        <Typography className={classes.sub}>
          Missed: {member.missed_votes_pct}%<br></br>
          w/ Party: {member.votes_with_party_pct}%<br></br>
          a/ Party: {member.votes_against_party_pct}%<br></br>       
        </Typography>
        
  
   
    </div>
  );
}
export default MemberDetail