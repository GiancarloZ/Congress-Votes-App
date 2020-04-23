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

const SenateMembers = () => {

    const [members, setMembers] = useState([])
    const [hasError, setErrors] = useState(false)



    async function fetchSenate() {
        const res = await fetch("https://api.propublica.org/congress/v1/116/senate/members.json", myInit);
        res
        .json()
        .then(res => setMembers(res['results'][0]['members']))
        .catch(err => setErrors(err));
    }

    useEffect(() => {
        fetchSenate();
    }, []);


    return (
        <AllMembers members={members} />
    )
}

export default SenateMembers