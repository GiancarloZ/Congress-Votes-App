import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import config from '../config'

const myHeaders = {
    'X-API-Key': config.PP_KEY
}
  
const myInit = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default'
}

const MemberStatements = (prop) => {
    const [id, setId] = useState(prop['prop']['id'])
    const [hasError, setErrors] = useState(false)
    console.log(id)
    const [statements, setStatements] = useState([])
    console.log(statements)

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
            
        </div>
    )

} 
export default MemberStatements