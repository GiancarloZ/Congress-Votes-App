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

const MemberBills = (prop) => {
    console.log(prop)
    const [id, setId] = useState(prop['prop']['id'])
    const [hasError, setErrors] = useState(false)
    console.log(id)
    const [bills, setBills] = useState([])
  
    console.log(bills)

    async function fetchBills() {
        const res = await fetch(`https://api.propublica.org/congress/v1/members/${id}/bills/cosponsored.json`, myInit);
        res
        .json()
        .then(res => setBills(res['results'][0]['bills']))
        .catch(err => setErrors(err));
    }
    
    useEffect(() => {
        fetchBills();
    }, []);

    return (
        <div>
            
        </div>
    )
}
export default MemberBills