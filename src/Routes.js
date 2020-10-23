import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import Home from './Pages/Home'
// import Spot from './Pages/Spot'
// import Login from './Pages/Login'
// import Signup from './Pages/Signup'
// import PostTrick from './Pages/PostTrick'

const Routes = () => {
    return (
        <>
        <Redirect exact from="/" to="/home"  />
        <Route exact path="/home" render={props => <Home {...props}/>}/> 
        {/* <Route exact path="/spots/:spotId" render={props => <Spot {...props} />} />
        <Route exact path="/login" render={props => <Login {...props} />} />
        <Route exact path="/signup" render={props => <Signup {...props} />} />
        <Route exact path="/spots/:spotId/:new" render={props => <PostTrick {...props} />} /> */}
     
        </>
    )
}
export default Routes