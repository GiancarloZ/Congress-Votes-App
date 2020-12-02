import React, { useState, useEffect } from 'react';
import config from '../config'
import MemberBill from '../components/MemberBill'
import {CircularProgress} from "@material-ui/core"
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
    const [id, setId] = useState(prop.prop)
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
    <>
        {Object.keys(bills).length > 0 ? 
           <>
            {bills.map(bill => (
                <MemberBill bill={bill}/>
            ))}
            {hasError ? hasError : null}
            </>  
            : <CircularProgress/>
        }   
    </>
    )
}
export default MemberBills