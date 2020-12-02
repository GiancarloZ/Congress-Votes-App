import React from 'react';
import Routes from './Routes';
import {Switch} from 'react-router-dom'
const App = () => {
    return (
      <>
        <Switch>
          <Routes />
        </Switch>
    </>);
  };
  
  export default App;