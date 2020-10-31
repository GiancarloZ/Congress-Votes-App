import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import config from '../config'
import Paper from '@material-ui/core/Paper';

const myHeaders = {
    'X-API-Key': config.PP_KEY
}
  
const myInit = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default'
}

const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      margin: 0,
      padding: 0,
    },
}))

const MemberStatements = (prop) => {
    const [id, setId] = useState(prop.prop)
    const [hasError, setErrors] = useState(false)
    console.log(prop)
    console.log(id)
    const [statements, setStatements] = useState([])
    console.log(statements)
    const classes = useStyles();

    async function fetchStatements() {
        const res = await fetch(`https://api.propublica.org/congress/v1/members/${id}/statements/116.json`, myInit);
        res
        .json()
        .then(res => setStatements(res['results']))
        .catch(err => setErrors(err));
    }
    
    useEffect(() => {
        fetchStatements();
    }, []);

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
           {Object.keys(statements).length > 0 &&  
            <>
               {statements.map(statement => (
                   <Paper key={statements.title} className={classes.root}>
                        {dateConv(statement.date)}: <a href={statement.url} target="_blank">{statement.title.replace(/&#39;/g,"'").replace(/&quot;/g,"'")}</a>
                    </Paper>
                ))}
            </>
            } 
        </>
    )

} 
export default MemberStatements