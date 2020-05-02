import React, { useState, useEffect } from 'react';
import config from '../config'
import { useDispatch, useSelector } from "react-redux";
import MemberShow from '../components/MemberShow'
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import PostToDb from './PostToDb'

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
    
    


    // function postMember(i){
    //     console.log(members)
    //         // if(!!members && members.length > 0){
               

    //                     return dispatch => {
    //                         dispatch({
    //                             type: 'POST_MEMBERS',
    //                         });
    //                         fetch("http://localhost:3000/api/v1/members/", {
    //                             method: 'POST',
    //                             headers: {
    //                                 Accept: 'application/json',
    //                             'Content-Type': 'application/json'
    //                             },
    //                             body: JSON.stringify({ members: members[i] })
    //                         })
    //                         .then(res => res.json())
    //                         .then(data => console.log(data))
    //                         .catch(error => console.log(error));
    //                     };

           
            // }
        
          
        // members.map(member => {
            // return dispatch => {
            //     dispatch({
            //         type: 'POST_MEMBERS',
            //       });
            //     fetch("http://localhost:3000/api/v1/members/", {
            //         method: 'POST',
            //         headers: {
            //             Accept: 'application/json',
            //           'Content-Type': 'application/json'
            //         },
            //         body: JSON.stringify({ members: AllMembers[0]})
            //     })
            //     .then(res => res.json())
            //     .then(data => console.log(data))
            //     .catch(error => console.log(error));
            // }
        
    // }
    // }
    
    // useEffect(() => {
    //     console.log('here')
    //     if(!!members && members.length > 1){
    //         for (let i = 0; i < 3; i++){
    //             dispatch(postMember(i));
    //         }
    //     }
    // });
   
    
    const handleChange = (event, value) => {
        setSelectedMembers(value)
    }

    // function postMember(){
        
    //     fetch('http://localhost:3000/api/v1/members', {
    //         method: 'GET'
    //     })
    //     .then(res => res.json())
    //     .then(data => console.log(data))
    // }    
    // useEffect(() => {
    //     postMember()
    // });
    
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
            <MemberShow members={selectedMembers} />  
        </div>
    );
}
export default SenateMembers  