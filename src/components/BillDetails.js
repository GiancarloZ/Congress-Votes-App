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
      width:580,
      padding: 0,
      fontSize: 10,
      margin: 0,
    },
    paper:{
      maxHeight: 400,
      padding:1,
    //   margin: 0.5,
      width: "100%",
      overflow: "auto", 
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
        <Grid container  spacing={1}> 
            <Grid item xs={6} sm={6} style={{maxHeight: 400}}>        
              {Object.keys(bill).length > 0 &&
                <div className={classes.side}>
                  {bill.votes.map(vote => (
                    <Card raised className={classes.paper}>
                        <CardContent>
                      <Typography component="body2">
                      <b><u>{vote.chamber} Vote</u> </b>
                      <p>{vote.question}<br></br> {dateConv(vote.date)}</p>
                      <p><u>Result: {vote.result}</u><br></br>
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
            <Grid item xs={6} sm={6} style={{maxHeight: 400}}>        
              {Object.keys(bill).length > 0 &&
                <div className={classes.side}>
                    {bill.actions.map(action => (
                    <Card raised className={classes.paper}>
                    <CardContent>
                      <Typography component="body2" >
                      <b><u>{action.chamber} Action</u></b> <br></br>
                      <p>{action.action_type} <br></br>{dateConv(action.datetime)}</p>
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