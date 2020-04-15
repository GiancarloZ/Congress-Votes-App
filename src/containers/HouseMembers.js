import React, { useState, useEffect } from 'react';
import MemberShow from '../components/MemberShow'
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

const HouseMembers = () => {
    const [members, setMembers] = useState([])
    const [hasError, setErrors] = useState(false)
    
    async function fetchData() {
        const res = await fetch("https://api.propublica.org/congress/v1/116/house/members.json", myInit);
        res
          .json()
          .then(res => setMembers(res['results'][0]['members']))
          .catch(err => setErrors(err));
    }
    
    useEffect(() => {
        fetchData();
    }, []);
    
    console.log(members)
    return (
        <div>
            <MemberShow members={members} />
        </div>
    );
};

export default HouseMembers;