import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import{ Paper, Typography} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      margin: 0,
      padding: 0,
    },
}))
const MemberStatement = (statement) => {
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
        <Paper key={statement.statement.title} className={classes.root}>
            <Typography className={classes.heading}  variant="p">
                {dateConv(statement.statement.date)}: <a href={statement.statement.url} target="_blank">{statement.statement.title.replace(/&#39;/g,"'").replace(/&quot;/g,"'")}</a>
            </Typography>
        </Paper>

    )
}
export default MemberStatement