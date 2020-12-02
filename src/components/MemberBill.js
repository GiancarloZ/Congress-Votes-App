import React from 'react'
import { Paper, Typography, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      width:  "100%",
      margin: 0,
      padding: 0,
      paddingBottom: 0,
    },
    content:{
        padding: 0,
        paddingBottom: 0,
        '&:last-child': {
            paddingBottom: 0
        }
    },
}))
const MemberBill = (bill) => {
    const classes = useStyles();
    console.log(bill)
    const dateConv = (date) => {
        let dateTime = date.split("-")
        let year = dateTime[0]
        let day = dateTime[2]
        let month = dateTime[1]
        
        let newDate = month + "-" + day + "-" + year
        return newDate
    }
    return (
    <>
        <Card raised key={bill.bill.bill_id} className={classes.root}>
            <CardContent className={classes.content}>        
            <Typography Wrap className={classes.heading}  variant="p">
            <b><u>{bill.bill.number}</u> </b><br></br>
            {dateConv(bill.bill.introduced_date)}<br></br>
            Co-sponsors:<br></br>
            D: {bill.bill.cosponsors_by_party.D ? bill.bill.cosponsors_by_party.D : 0} <br></br>
            R: {bill.bill.cosponsors_by_party.R ? bill.bill.cosponsors_by_party.R : 0} 
            </Typography>
            </CardContent>

        </Card>
    </>
    )
}
export default MemberBill