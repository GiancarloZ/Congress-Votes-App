import React, { useState, useEffect } from 'react';
import config from '../config'
import AllMembers from './AllMembers'

const myHeaders = {
    'X-API-Key': config.PP_KEY
}
  
const myInit = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default'
}

const HouseMembers = () => {

const [members, setMembers] = useState([])
const [hasError, setErrors] = useState(false)

async function fetchHouse() {
    const res = await fetch("https://api.propublica.org/congress/v1/116/house/members.json", myInit);
    res
      .json()
      .then(res => setMembers(res['results'][0]['members']))
      .catch(err => setErrors(err));
}

useEffect(() => {
    fetchHouse();
}, []);

return (
    <AllMembers members={members} />
)
        
}
export default HouseMembers