import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Share from './Pages/Share'
import Profile from './Pages/Profile'

const Routes = () => {
    return (
        <>
        <Redirect exact from="/" to="/home"  />
        <Route exact path="/home" render={props => <Home {...props}/>}/> 
        {/* <Route path="/login" component={Login}/> */}
        <Route exact path="/profile" render={props => <Profile {...props} />} />     
        <Route exact path="/share" render={props => <Share {...props} />} />     
        </>
    )
}
export default Routes