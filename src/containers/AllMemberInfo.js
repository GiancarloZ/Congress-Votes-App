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
const AllVotes = (prop) => {
    const [id, setId] = useState(prop['member']['id'])
    const [hasError, setErrors] = useState(false)

    console.log(id)
  
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
        <div>
            
        </div>
    )

} 

const AllStatements = (prop) => {
    const [id, setId] = useState(prop['member']['id'])
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

  
const AllBills = (prop) => {
    const [id, setId] = useState(prop['member']['id'])
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

const Headshot = (prop) => {
    const [id, setId] = useState(prop['member']['id'])
    const [hasError, setErrors] = useState(false)
    console.log(id.charAt(0))
    const [headshot, setHeadshot] = useState(['/dummy-profile-pic.png'])
    
    useEffect(() => {
        setHeadshot(`https://bioguideretro.congress.gov/Static_Files/images/photos/${id.charAt(0)}/${id}.jpg`)
    }, []);
   
    console.log(headshot)
    return (
        <div>
            <img alt={prop.first_name} className='left floated medium ui image' src={headshot} width="50"/>
        </div>
    )
}

const AllMemberInfo = (prop) => {
    const [id, setId] = useState(prop['member']['id'])
    const [hasError, setErrors] = useState(false)
    const [member, setMember] = useState([])
    // AllVotes(prop);
    // AllStatements(prop);
    // AllBills(prop);
    // Headshot(prop);
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
  
    return (
        <div>
            {AllVotes(prop)}
            {AllStatements(prop)}
            {AllBills(prop)}
            {Headshot(prop)}
        </div>
    )

} 
export default AllMemberInfo











