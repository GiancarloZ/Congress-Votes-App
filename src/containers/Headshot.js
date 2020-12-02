import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';

const Headshot = (prop) => {
    console.log(prop)
    const [id, setId] = useState(prop.prop)
    const [headshot, setHeadshot] = useState([])
    useEffect(() => {
        setHeadshot(`https://bioguideretro.congress.gov/Static_Files/images/photos/${id.charAt(0)}/${id}.jpg`)
    }, []);
   
    console.log(headshot)
    return (
            <Avatar alt={prop.first_name}  src={headshot} />
    )
}
export default Headshot