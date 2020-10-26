import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'


const Routes = () => {
    return (
        <>
        <Redirect exact from="/" to="/home"  />
        <Route exact path="/home" render={props => <Home {...props}/>}/> 
        <Route exact path="/login" render={props => <Login {...props} />} />
        <Route exact path="/signup" render={props => <Signup {...props} />} />     
        </>
    )
}
export default Routes