import React from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles({
    root: {
    //   width:580,
      padding: 0,
      fontSize: 10,
      margin: 0,
    },
    paper:{
      maxHeight: 395,
      padding:2,
      paddingBottom: 0,
      '&:last-child': {
        padding: 0,
        paddingBottom: 0,
      },
      overflow: "auto", 
      '&::-webkit-scrollbar': {
        width: '0.1em'
      },
      '&::-webkit-scrollbar-track': {
        boxShadow: 'inset 6px 6px 6px rgba(0,0,0,0.00)',
        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.1)',
        outline: '1px solid slategrey'
      },
      
    },
    heading: {
      // textOverflow: "ellipsis", 
      // width: '100%'
      // height: "100%",
      
    },
    side: {
        margin: 1,
        overflow: "auto",
        maxHeight: 395,
        '&::-webkit-scrollbar': {
          width: '0.1em'
        },
        '&::-webkit-scrollbar-track': {
          boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
          webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,.1)',
          outline: '1px solid slategrey'
        }
      }
  });
const BillDetails = ({bill, bills}) => {
    const classes = useStyles();
    const dateConv = (date) => {
        let dateTime = date.split("-")
        let year = dateTime[0]
        let day = dateTime[2]
        let month = dateTime[1]
        
        let newDate = month + "-" + day + "-" + year
        return newDate
    }
    return (
        <Grid container  spacing={0}> 
            <Grid item xs={6} style={{maxHeight: 395}}>        
              {Object.keys(bill).length > 0 &&
                <div className={classes.side}>
                  {bill.votes.map(vote => (
                    <Card variant="outlined" className={classes.paper}>
                        <CardContent style={{ paddingBottom: 0, padding: 1,  margin: 0}} >
                      <Typography component="p" variant="p">
                      <b><u>{vote.chamber} Vote</u> </b>
                      <p>{vote.question}<br></br> {dateConv(vote.date)}</p>
                      <p><b><u>Result: {vote.result}</u></b><br></br>
                        YES: {vote.total_yes}<br></br>
                        NO: {vote.total_no}<br></br>
                        DID NOT VOTE: {vote.total_not_voting}</p>
                      </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              }
            </Grid>
            {/* <Grid item  xs={6} sm={6}> 
            </Grid> */}
            <Grid item xs={6} sm={6} style={{maxHeight: 395}}>        
              {Object.keys(bill).length > 0 &&
                <div className={classes.side}>
                    {bill.actions.map(action => (
                    <Card  variant="outlined" className={classes.paper}>
                    <CardContent style={{ paddingBottom: 0, padding: 0, margin: 0}}>
                      <Typography component="p"  variant="p" >
                      <b><u>{action.chamber} Action</u></b> <br></br>
                      <p>{action.action_type}</p> {dateConv(action.datetime)}
                      <p>{action.description}</p>
                      </Typography>
                      </CardContent>
                    </Card>                    ))}
                
                </div>
              }
            </Grid>
          </Grid>
    )
}
export default BillDetails