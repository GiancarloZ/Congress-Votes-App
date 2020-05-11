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
      width:  120,
      margin: 0,
      padding: 0,
      margin: theme.spacing(1),

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

    return (
        <div>
           {Object.keys(statements).length > 0 &&  
               <ul className={classes.root}> {statements.slice(0, 5).map(statement => (
                   <Paper className={classes.root}>
                        <li key={statements.title}>
                            {statement.date}: <a href={statement.url} target="_blank">{statement.title.replace(/&#39;/g,"'").replace(/&quot;/g,"'")}</a>
                        </li>
                        </Paper>
                    ))}
                </ul>
       
            } 
        </div>
    )

} 
export default MemberStatements