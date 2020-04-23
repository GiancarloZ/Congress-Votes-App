import React, { useState, useEffect } from 'react';
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

const AllMemberInfo = (prop) => {
    const [hasError, setErrors] = useState(false)
    const [member, setMember] = useState([])
    const [headshot, setHeadshot] = useState(['/dummy-profile-pic.png'])
    const [votes, setVotes] = useState([])
    const [bills, setBills] = useState([])
    const [statements, setStatements] = useState([])
    // const [id, setId] = useState(member['member']['id'])
    const [id, setId] = useState(prop['member']['id'])
   
    console.log(id)
    console.log(member)

        async function fetchMember() {
            const res = await fetch(`https://api.propublica.org/congress/v1/members/${id}.json`, myInit);
            res
            .json()
            .then(res => setMember(res['results'][0]))
            .catch(err => setErrors(err));
        }
        useEffect(() => {
            fetchMember();
        }, []);

        const Headshot = () => {
            const [hasError, setErrors] = useState(false)

            useEffect(() => {
                setHeadshot(`https://bioguideretro.congress.gov/Static_Files/images/photos/${id.charAt(0)}/${id}.jpg`)
            }, []);
        }
    
            
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


export default AllMemberInfo