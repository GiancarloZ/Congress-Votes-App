import React from 'react'
import MemberInfo from '../containers/MemberInfo'
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    root: {
      width:265,
      padding: 0,
      fontSize: 10,
      margin: 0,

    },
    head: {
      textAlign: 'right',
    },
    
});

export default function MemberInfoShow(prop) {
    console.log(prop)
    return (
        <div>
            {/* <p>Address: {prop['prop']['roles'][0]['office']}</p> */}
            {/* <p>Current Role: {prop['roles'][0]['title']}{member['roles'][1]['congress'] === member['roles'][0]['congress'] ? ', ' + member['roles'][1]['title']: ''} - {member['roles'][0]['state']} {member['roles'][0]['district'] ? member['roles'][0]['district'] : ''}</p>
            <p>In office until {prop['roles'][0]['end_date'].substring(0,4)}</p>
            <p>Address: {prop['roles'][0]['office']}</p>
            <p>Phone: {prop['roles'][0]['phone']}</p>
            <p>Current Role: {member['roles'][0]['title']}{member['roles'][1]['congress'] === member['roles'][0]['congress'] ? ', ' + member['roles'][1]['title']: ''} - {member['roles'][0]['state']} {member['roles'][0]['district'] ? member['roles'][0]['district'] : ''}</p>
            <p>In office until {member['roles'][0]['end_date'].substring(0,4)}</p>
            <p>Address: {member['roles'][0]['office']}</p>
            <p>Phone: {member['roles'][0]['phone']}</p> */}
        </div>
    )
}
