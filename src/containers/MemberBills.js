import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import config from '../config'
import Paper from '@material-ui/core/Paper';
import MemberBill from '../components/MemberBill'
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
      width:  "100%",
      margin: 0,
      padding: 0,
    },
}))


const MemberBills = (prop) => {
    console.log(prop)
    const [id, setId] = useState(prop.prop)
    const [hasError, setErrors] = useState(false)
    console.log(id)
    const [bills, setBills] = useState([])
    const classes = useStyles();
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
        {Object.keys(bills).length > 0 &&  
           <>
            {bills.map(bill => (
                  <MemberBill bill={bill}/>
            ))}
            </>
        }   
    </>
    )
}
export default MemberBills