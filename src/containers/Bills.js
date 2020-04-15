import React, { useState, useEffect } from 'react';
import BillShow from '../components/BillShow'
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

const SenateMembers = () => {
    const [bills, setBills] = useState([])
    const [chamber, setChamber] = useState('both')
    const [type, setType] = useState('passed')
    const [hasError, setErrors] = useState(false)
    
    async function fetchData() {
        const res = await fetch(`https://api.propublica.org/congress/v1/116/${chamber}/bills/${type}.json`, myInit);
        res
          .json()
          .then(res => setBills(res['results'][0]['bills']))
          .then(res => setChamber(res))
          .then(res => setType(res))
          .catch(err => setErrors(err));
    }
    
    useEffect(() => {
        fetchData();
    }, []);
    
    console.log(bills)
    return (
        <div>
            <BillShow bills={bills}/>
        </div>
    );
};

export default SenateMembers;