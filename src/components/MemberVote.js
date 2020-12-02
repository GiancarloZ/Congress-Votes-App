import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      padding: 0,
      margin: 0
    },
}))
const MemberVote = (vote) => {
    const classes = useStyles();

    return (
        <Paper key={vote.vote.bill.bill_id} className={classes.root}>
        {vote.vote.bill.number}: {vote.vote.position}<br></br>
        Result: {vote.vote.result} <br></br>
        (Y: {vote.vote.total.yes} N: {vote.vote.total.no} NV: {vote.vote.total.not_voting})
         </Paper>
    )
}
export default MemberVote