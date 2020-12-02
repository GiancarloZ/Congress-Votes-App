import React, { useState, useEffect } from 'react';
import MemberVote from '../components/MemberVote'
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


const MemberVotes = (prop) => {
    const [id, setId] = useState(prop.prop)
    const [hasError, setErrors] = useState(false)
    const [votes, setVotes] = useState([])
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
                   <MemberVote vote={vote}/>
                    ))}
                </>
       
            }
           
        </>
    )

} 
export default MemberVotes