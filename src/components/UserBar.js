import { useState } from "react";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, selectUser } from "../context/userSlice";
import { AccountCircle } from "@mui/icons-material";
import MoreIcon from "@mui/icons-material/MoreVert";

function UserBar() {
  const user = useSelector(selectUser);
  const [anchorEl, setAnchorEl] = useState(null);
  const isProfileMenuOpen = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  const handlerLoginPage = () => {
    navigate("/login");
  };
  const handlerSavedPage = () => {
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
      {user
        ? [
            <MenuItem key="my-list" onClick={handlerSavedPage}>
              My List
            </MenuItem>,
            <MenuItem key="logout" onClick={handlerLogout}>
              Log Out
            </MenuItem>,
          ]
        : [
            <MenuItem key="login" onClick={handlerLoginPage}>
              Log In
            </MenuItem>,
            <MenuItem key="sign-in" onClick={handleProfileMenuClose}>
              Sign In
            </MenuItem>,
          ]}
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
        {/* For small screen */}
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
      {renderProfileMenu}
    </>
  );
}

export default UserBar;
