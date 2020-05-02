import React, { useState, useEffect } from 'react';
import MemberShow from '../components/MemberShow'
import config from '../config'
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import logo from '../logo.svg';


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
        marginTop: theme.spacing(0),
      },
      
    },
}));



const SenateMembers = () => {
    const [members, setMembers] = useState([])
    const [hasError, setErrors] = useState(false)
    const [selectedMembers, setSelectedMembers] = useState([])
    const classes = useStyles();

    async function fetchData() {
        const res = await fetch("https://api.propublica.org/congress/v1/116/senate/members.json", myInit);
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
        
        <div  className={classes.root}>
            {/* <img src={logo} alt="Logo" /> */}
            <Autocomplete
              
                multiple
                limitTags={2}
                id="senateMembers"
                options={members}
                getOptionLabel={(option) => option.last_name +", " + option.first_name + " " + " " + "(" + option.party + ")" + "-" + option.state + " " }
                defaultValue={members}
                onChange={handleChange}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        
                        <Chip label={option.first_name.charAt(0) + "." + option.last_name.charAt(0) + "."} {...getTagProps({ index })} />
                    ))
                }
                renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                    label="Select Members"
                    placeholder="Write-in:"
                />
            )}
        />
            <MemberShow members={selectedMembers} />   
        </div>
    );
};

export default SenateMembers;
