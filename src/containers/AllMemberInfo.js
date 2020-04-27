import React, { useState, useEffect } from 'react';
import config from '../config'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
const myHeaders = {
    'X-API-Key': config.PP_KEY
}
  
const myInit = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default'
}


const useStyles = makeStyles({
    root: {
      width:255,
      padding: 0,
      fontSize: 10,
    },
    title: {
        width: 170,
        textAlign: "left",
        fontSize: 11,
  
    },
    sub: {
        alignItem: "right !important",
        fontSize: 9,
    },
    pos: {
      marginBottom: 12,
    },
});
  
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
    const classes = useStyles();
    useEffect(() => {
        setHeadshot(`https://bioguideretro.congress.gov/Static_Files/images/photos/${id.charAt(0)}/${id}.jpg`)
    }, []);
   
    console.log(headshot)
    return (
        <div className={classes.sub}>
            <Avatar alt={prop.first_name}  src={headshot} />
        </div>
    )
}

const AllMemberInfo = (prop) => {
    const [id, setId] = useState(prop['member']['id'])
    const [hasError, setErrors] = useState(false)
    const [member, setMember] = useState([])
    const classes = useStyles();

    console.log(id)
    console.log(member)
    console.log(prop)
  
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
    console.log(member)
 
    return (
        <div>
            {AllVotes(prop)}
            {AllStatements(prop)}
            {AllBills(prop)}
            
            {/* <p>Current Role: {prop['roles'][0]['title']}{member['roles'][1]['congress'] === member['roles'][0]['congress'] ? ', ' + member['roles'][1]['title']: ''} - {member['roles'][0]['state']} {member['roles'][0]['district'] ? member['roles'][0]['district'] : ''}</p>
            <p>In office until {prop['roles'][0]['end_date'].substring(0,4)}</p>
            <p>Address: {prop['roles'][0]['office']}</p>
            <p>Phone: {prop['roles'][0]['phone']}</p> */}
            {/* <p>Current Role: {member['roles'][0]['title']}{member['roles'][1]['congress'] === member['roles'][0]['congress'] ? ', ' + member['roles'][1]['title']: ''} - {member['roles'][0]['state']} {member['roles'][0]['district'] ? member['roles'][0]['district'] : ''}</p>
                          <p>In office until {member['roles'][0]['end_date'].substring(0,4)}</p>
                          <p>Address: {member['roles'][0]['office']}</p>
                          <p>Phone: {member['roles'][0]['phone']}</p> */}
        </div>
    )

} 
export default AllMemberInfo











