import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import styles from "./User.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../context/userSlice";
import { AccountCircle } from "@mui/icons-material";
import MoreIcon from "@mui/icons-material/MoreVert";

function UserBar() {
  // const userCtx = useContext(UserContext);
  // const { credentials, handleLogout, isLoggedIn } = userCtx;
  const [anchorEl, setAnchorEl] = useState(null);
  const isProfileMenuOpen = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.userState.user);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileMenuClose = () => {
    setAnchorEl(null);
    // handleHamburgerMenuClose();
  };
  const handlerLogout = () => {
    navigate("/");
    dispatch(logoutUser());
  };
  const handlerLogin = () => {
    navigate("/login");
  };
  const handlerViewList = () => {
    navigate("/user");
  };

  const profileMenuId = "primary-search-account-menu";
  const renderProfileMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={profileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isProfileMenuOpen}
      onClose={handleProfileMenuClose}
    >
      <MenuItem onClick={handlerLogin}>Log In</MenuItem>
      <MenuItem onClick={handleProfileMenuClose}>Sign In</MenuItem>
      <MenuItem onClick={handlerViewList}>My List</MenuItem>
      <MenuItem onClick={handlerLogout}>Log Out</MenuItem>
    </Menu>
  );

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <IconButton
            size="large"
            // edge="end"
            aria-label="account of current user"
            aria-controls={profileMenuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Box>
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls={profileMenuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </Box>
      </Box>

      {/* {!isLoggedIn ? (
        <Button
          variant="contained"
          className={styles.loginbutton}
          sx={{ ml: 0.5 }}
          onClick={handlerLogin}
        >
          Login
        </Button>
      ) : (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={handlerViewList}
            sx={{ mr: 1 }}
          >
            {credentials.username}
          </Button>
          <Button variant="outlined" color="primary" onClick={handleLogout}>
            Logout
          </Button>
        </>
      )} */}
      {renderProfileMenu}
    </>
  );
}

export default UserBar;
