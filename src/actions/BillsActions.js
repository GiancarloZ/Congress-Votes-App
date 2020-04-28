import React, { useState, useEffect } from 'react';
import config from '../config'
import { useDispatch, useSelector } from "react-redux";
import BillShow from '../components/BillShow'
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';



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

const Bills = () => {
    const bills = useSelector(state => state.bills)
    const [chamber, setChamber] = useState('both')
    const [type, setType] = useState('passed')
    const [hasError, setErrors] = useState(false)
    const [selectedBills, setSelectedBills] = useState([])
    const dispatch = useDispatch();
    const classes = useStyles();
    console.log(bills)

    function fetchBills() {
        return dispatch => {
            dispatch({
                type: 'LOADING_BILLS',
              });
            fetch(`https://api.propublica.org/congress/v1/116/${chamber}/bills/${type}.json`, myInit)
                .then(res => res.json())
                .then(res => 
                    dispatch({
                    type: "ADD_BILLS",
                    bills: res['results'][0]['bills']
                }))
                .catch(error => console.log(error)
                );
            }
    }

    useEffect(() => {
        dispatch(fetchBills());
    }, []);

    const handleChange = (event, value) => {
        setSelectedBills(value)
    }
    
    
    return (
        
        <div  className={classes.root}>
            <Autocomplete
                multiple
                limitTags={4}
                id="multiple-limit-tags"
                options={bills || []}
                getOptionLabel={(option) => option.number +" - " + option.short_title}
                defaultValue={bills}
                onChange={handleChange}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip label={option.number}{...getTagProps({ index })} /> 
                    ))
                }
                renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                    label="Select Bills"
                    placeholder="You can choose as many as you'd like"
                />
                )}
            />
            <BillShow bills={selectedBills}/>
        </div>
    );
}
export default Bills  