import React, { useState, useEffect } from 'react';
import config from '../config'
import { useDispatch, useSelector } from "react-redux";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import MemberInfo from '../containers/MemberInfo'

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
        margin: theme.spacing(0),
      },
      
    },
}));

const SenateMembers = () => {
    const members = useSelector(state => state.senateMembers)
    const [selectedMembers, setSelectedMembers] = useState([])
    const dispatch = useDispatch();
    const classes = useStyles();
    
    console.log(members)
  
    function fetchMember() {
        return dispatch => {
            dispatch({
                type: 'LOADING_SENATE_MEMBERS',
              });
            fetch("https://api.propublica.org/congress/v1/116/senate/members.json", myInit)
                .then(res => res.json())
                .then(res => 
                    dispatch({
                    type: "ADD_SENATE_MEMBERS",
                    members: res['results'][0]['members'],
                }))
                .catch(error => console.log(error)
                );
        }
    }

    useEffect(() => {
        dispatch(fetchMember());
    }, []);
    
    
    const handleChange = (event, value) => {
        setSelectedMembers(value)
     
    }

    
    
    return (
        
        <div  className={classes.root}>
            
            <Autocomplete
                multiple
                limitTags={2}
                id="SenateMembers"
                options={members || []}
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
            {Object.keys(selectedMembers).length > 0 &&
                selectedMembers.map((member) => {
                    return <MemberInfo props={member}/>
                })
            }
    
        </div>
    );
}
export default SenateMembers  