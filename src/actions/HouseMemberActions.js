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
        marginTop: theme.spacing(0),
      },
      
    },
}));

const HouseMembers = () => {
    const members = useSelector(state => state.houseMembers)
    const [selectedMembers, setSelectedMembers] = useState([])
    const dispatch = useDispatch();
    const classes = useStyles();
    console.log(members)

    function fetchMember() {
        return dispatch => {
            dispatch({
                type: 'LOADING_HOUSE_MEMBERS',
              });
            fetch("https://api.propublica.org/congress/v1/116/house/members.json", myInit)
                .then(res => res.json())
                .then(res => 
                    dispatch({
                    type: "ADD_HOUSE_MEMBERS",
                    members: res['results'][0]['members']
                }))
                .catch(error => console.log(error)
                );
            }
    }

    useEffect(() => {
        dispatch(fetchMember());
    }, []);
    
    // function postMember(){
        
    //     return dispatch => {
    //         dispatch({
    //             type: 'POST_MEMBERS',
    //           });
    //            fetch("http://localhost:3000/api/v1/members/", {
    //             method: 'POST',
    //             headers: {
    //                 Accept: 'application/json',
    //               'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ members: members})
    //           })
    //           .then(res => res.json())
    //           .then(data => console.log(data))
    //           .catch(error => console.log(error));
    //     }
    
    // }

    // useEffect(() => {
    //     dispatch(postMember());
    // });
    const handleChange = (event, value) => {
        setSelectedMembers(value)
    }
    
    
    return (
        
        <div  className={classes.root}>
            
            <Autocomplete
              
                multiple
                limitTags={2}
                id="multiple-limit-tags"
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
export default HouseMembers  