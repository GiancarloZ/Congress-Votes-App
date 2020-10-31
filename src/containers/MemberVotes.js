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
      width: '100%',
      padding: 0,
      margin: 0
    },
}))

const MemberVotes = (prop) => {
    const [id, setId] = useState(prop.prop)
    const [hasError, setErrors] = useState(false)
    const [votes, setVotes] = useState([])
    const classes = useStyles();
    console.log(votes)

    async function fetchVotes() {
        const res = await fetch(`https://api.propublica.org/congress/v1/members/${id}/votes.json`, myInit);
        res
        .json()
        .then(res => setVotes(res['results'][0]['votes']))
        .catch(err => setErrors(err));
    }
    
    useEffect(() => {
        fetchVotes();
    }, []);

    return (
        <>
            {Object.keys(votes).length > 0 &&  
               <> 
               {votes.map(vote => (
                   <Paper key={vote.bill.bill_id} className={classes.root}>
                        {vote.bill.number}: {vote.position}<br></br>
                        Result: {vote.result} <br></br>
                        (Y: {vote.total.yes} N: {vote.total.no} NV: {vote.total.not_voting})
                    </Paper>
                    ))}
                </>
       
            }
           
        </>
    )

} 
export default MemberVotes