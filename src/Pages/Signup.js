import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import userActions from '../reducers/userActions';
import { useSelector } from 'react-redux';

import Input from '@material-ui/core/Input';
import Button from "@material-ui/core/Button";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Signup = props => {
  const {match, history } = props;
  // initializing dispatch
  const dispatch = useDispatch();
  const user = useSelector(state => state.currentUser.username) || false;
  // Setting up local state using the useState hook
  const [signupForm, setSignupForm] = useState({
    username: '',
    password: ''
  });
  const [open, setOpen] = React.useState(false);
  // Controlled form functions
  const handleChange = e => 
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
    
  const handleSubmit = e => {
    e.preventDefault();
    const { history } = props;
    dispatch(userActions.newUserToDB(signupForm));
    setOpen(false);
    history.push('/home')
  };

  const handleClickOpen = () => {
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false);
  };
  // Destructuring keys from our local state to use in the form
  const { username, password } = signupForm;
  const signup = !user ? (<>
    <Button color="secondary" className="button" onClick={handleClickOpen}>Sign Up</Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
            <ButtonGroup disableElevation variant="contained" color="primary">
                {/* <Button>Login</Button>
                <Button>Sign-Up</Button> */}
            </ButtonGroup>
            </DialogTitle>
            <DialogContent>
            <DialogContentText>
                Please enter username and password to sign up.
            </DialogContentText>
            <form onSubmit={handleSubmit}>
            <h1>Sign Up Page</h1>
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
        </>) : (<></>);

  // Component code
  return (
      <>
      {signup}
      </>
  );
};

export default Signup;