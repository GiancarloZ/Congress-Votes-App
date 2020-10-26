import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import userActions from '../reducers/userActions';
import Button from "@material-ui/core/Button";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from 'react-redux';
import Input from '@material-ui/core/Input';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
const useStyles = makeStyles(theme => ({
    // root:{
    //   minHeight: "100%",
    //   minWidth: "auto",
    //   display: "flex",
    // },
    // paper: {
    //     padding: theme.spacing(0),
    //     margin: 0,
    //     minWidth: "100%",
    //     minHeight: "100%",
    // }
}))
const LoginPage = props => {
  const {match, history } = props;
  const classes = useStyles();
  // initializing dispatch
  const dispatch = useDispatch();
  const user = useSelector(state => state.currentUser.username) || false;
  // Setting up local state using the useState hook
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });
  const [open, setOpen] = React.useState(false);


  const handleClose = () => {
      setOpen(false);
  };
  // controlled form functions
  const handleSubmit = e => {
    e.preventDefault();
    console.log(props.history)
    console.log(props)

    dispatch(userActions.loginUserToDB(loginForm));
    setOpen(false)
    history.push('/home');
  };
  const handleClickOpen = () => {
    setOpen(true)
  };
  const handleLogout = () => {
    dispatch(userActions.logoutUser());
  };

  const handleChange = e =>
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  
  // Destructuring keys from our local state to use in the form
  const { username, password } = loginForm;
  const login = !user ? (<>
    <Button color="secondary" className="button" onClick={handleClickOpen}>Login</Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
            <ButtonGroup disableElevation variant="contained" color="primary">
                {/* <Button>Login</Button>
                <Button>Sign-Up</Button> */}
            </ButtonGroup>
            </DialogTitle>
            <DialogContent>
            <DialogContentText>
                Please enter username and password to log in.
            </DialogContentText>
            <form onSubmit={handleSubmit}>
            <h1>Login Page</h1>
            <Input
                autoFocus={true}
                type="text"
                name="username"
                value={username}
                onChange={handleChange}
                placeholder="Username"
            />
            <Input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Password"
            />
            </form>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleSubmit} color="primary">
                Submit
            </Button>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            
            </DialogActions>
        </Dialog>
        </>) : (<Button color="secondary" className="button" onClick={handleLogout}>Logout</Button>);
  // Component code
  return (
    <>
    {login}
    </>
  );
};

export default LoginPage;