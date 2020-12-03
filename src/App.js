import React from 'react';
import Routes from './Routes';
import {Switch, useLocation, Route} from 'react-router-dom'
import Login from './Pages/Login'
const App = () => {
  const location = useLocation();
  const background = location.state && location.state.background;
    return (
      <>
        <Switch location={background || location}>
          <Routes />
        </Switch>
        {background && <Route path="/login" children={<Login/>} />}
    </>);
  };
  
  export default App;