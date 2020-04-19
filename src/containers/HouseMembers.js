import React, { useState, useEffect } from 'react';
import MemberShow from '../components/MemberShow'
import config from '../config'
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

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
      width: 'flex',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
}));
const HouseMembers = () => {
    const [members, setMembers] = useState([])
    const [hasError, setErrors] = useState(false)
    const [selectedMembers, setSelectedMembers] = useState([])
    const classes = useStyles();
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
  
    const handleChange = (event, value) => {
        setSelectedMembers(value)
    }

    return (
        <div className={classes.root} >
        <Autocomplete
             
                multiple
                limitTags={1}
                id="multiple-limit-tags"
                options={members}
                getOptionLabel={(option) => option.last_name +", " + option.first_name + " "+ " : " + " "  + option.state + " " + "("+option.party+")"}
                defaultValue={members}
                onChange={handleChange}
                renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                    label="Select Members"
                    placeholder="Choose as many as you'd like"
                />
            )}
        />
        <MemberShow members={selectedMembers} />   
    </div>
    );
};

export default HouseMembers;