// API CONSTANTS

const BASE_URL = 'http://localhost:3001/api/v1/';
const HEROKU_URL = "https://congress-votes-rails-api.herokuapp.com/api/v1/"
const USERS_URL = BASE_URL + '/users';
const SPECIFIC_USER_URL = id => USERS_URL + '/' + id;

// Redux Actions

const setUserAction = userObj => ({
  type: 'SET_USER',
  user: userObj
});

const clearUserAction = () => ({
  type: 'CLEAR_USER'
});

const loadUserAction = userObj => ({
  type: 'LOAD_USERS',
  user: userObj
});

// Fetch

const loadAllUsers = () => dispatch => {
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  };
  fetch(HEROKU_URL + '/users', config)
    .then(r => r.json())
    .then(data => {
        console.log(data)
      dispatch(loadUserAction(data));
     
    });
};

const newUserToDB = userObj => dispatch => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userObj)
  };
  fetch(HEROKU_URL + '/users', config)
    .then(r => r.json())
    .then(data => {
      dispatch(setUserAction(data.user));
      localStorage.setItem('token', data.token);
      console.log(localStorage.token)
    });
};

const deleteUserFromDB = userId => dispatch => {
  const config = {
    method: 'DELETE'
  };
  fetch(SPECIFIC_USER_URL(userId), config).then(r => {
    dispatch(clearUserAction());
    localStorage.clear();
  });
};

const loginUserToDB = userCredentials => dispatch => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userCredentials)
  };
  fetch(HEROKU_URL + '/login', config)
    .then(r => r.json())
    .then(data => {
      dispatch(setUserAction(data.user));
      localStorage.setItem('token', data.token);
    });
};

const persistUser = () => dispatch => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: `bearer ` + localStorage.token
    }
  };
  fetch(HEROKU_URL + '/persist', config)
    .then(r => r.json())
    .then(userInstance => {
      dispatch(setUserAction(userInstance));
    });
};

const logoutUser = () => dispatch => {
  dispatch(clearUserAction());
  localStorage.clear();
};

export default {
  loadAllUsers,
  newUserToDB,
  deleteUserFromDB,
  loginUserToDB,
  persistUser,
  logoutUser
};