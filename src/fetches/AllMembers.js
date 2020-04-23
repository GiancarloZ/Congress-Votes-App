import React from 'react'
import AllMemberInfo from './AllMemberFetchAndStore'

const AllMembers = ({members}) => {
    return (
        <div>
        {members.map((member) =>              
            <AllMemberInfo member={member} />
        )}
        </div>
    ) 
} 

export default AllMembers