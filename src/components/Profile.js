import React from 'react'

import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {Switch, useLocation, Route, useHistory} from 'react-router-dom'
const Profile = props => {
    const { handleMenu, anchorEl, handleClose, open } = props;
    const history = useHistory()
    const handleClick = () => {
      history.push("/profile")
    }
    const handleClickShare = () => {
      history.push("/share")
    }
    console.log(props)
    return (
        <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClick}>Profile</MenuItem>
                <MenuItem onClick={handleClickShare}>Share</MenuItem>
              </Menu>
            </div>
    )
}
export default Profile