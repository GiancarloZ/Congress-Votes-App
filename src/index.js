import React from 'react';
import ReactDOM from 'react-dom';
import TestApp from './TestApp';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import membersReducer from "./reducers/membersReducer"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(membersReducer, composeEnhancers(applyMiddleware(thunk)))


ReactDOM.render(
 <Provider store={store}>
   <TestApp />
 </Provider>,
 document.getElementById('root')
);

