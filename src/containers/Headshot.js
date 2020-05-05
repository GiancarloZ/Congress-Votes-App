import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

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

const Headshot = (prop) => {
    console.log(prop)
    const [id, setId] = useState(prop.prop)
    const [headshot, setHeadshot] = useState([])
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
export default Headshot