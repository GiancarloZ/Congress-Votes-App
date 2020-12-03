import React from 'react'
import {Card, CardContent, CardHeader, Button} from '@material-ui/core';
import { useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom'
const Profile = () => {
    const user = useSelector(state => state.currentUser.username) || false;
    console.log(user)
    const history = useHistory()
    return (
        <div>
             <Button color="secondary" className="button" onClick={()=> history.goBack()}>Back</Button>
            {user ?
            <Card>
                <CardHeader title={" Profile Page"}/>
                <CardContent>
                   username: {user}
                </CardContent>
            </Card>
            : <h1> Must be logged in to view profile</h1>}
        </div>
    )
}
export default Profile