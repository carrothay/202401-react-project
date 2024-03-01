import Logo from "../assets/logo.png";
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  alpha,
  styled,
} from "@mui/material";
import { SearchBar } from "./index.js";
import { Link, useNavigate } from "react-router-dom";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useContext, useState } from "react";
import ColorModeContext from "../context/ColorModeContext";
import MenuIcon from "@mui/icons-material/Menu";
import { AccountCircle } from "@mui/icons-material";
import MoreIcon from "@mui/icons-material/MoreVert";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundColor: alpha(theme.palette.common.white, 0.35),
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(1),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

function Header({ handlerKeyword }) {
  const { mode, colorMode } = useContext(ColorModeContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [hamburgerEl, setHamburgerEl] = useState(null);
  const navigate = useNavigate();
  const isMenuOpen = Boolean(anchorEl);
  const isHamburgerOpen = Boolean(hamburgerEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleHamburgerMenuOpen = (event) => {
    setHamburgerEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleHamburgerMenuClose();
  };
  const handleHamburgerMenuClose = () => {
    setHamburgerEl(null);
  };

  const handlerLogin = () => {
    navigate("/login");
  };
  const handlerViewList = () => {
    navigate("/user");
  };
  const handlerAbout = () => {
    navigate("/about");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handlerLogin}>Log In</MenuItem>
      <MenuItem onClick={handleMenuClose}>Sign In</MenuItem>
      <MenuItem onClick={handlerViewList}>My List</MenuItem>
    </Menu>
  );

  const hamburgerMenuId = "primary-search-account-menu-hamburger";
  const renderHamburgerMenu = (
    <Menu
      anchorEl={hamburgerEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={hamburgerMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isHamburgerOpen}
      onClose={handleHamburgerMenuClose}
    >
      <MenuItem onClick={handlerAbout}>About</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            aria-controls={hamburgerMenuId}
            sx={{ mr: 2 }}
            // when click, list of menu apppears
            aria-haspopup="true"
            onClick={handleHamburgerMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/" style={{ display: "flex", alignItems: "center" }}>
            <img src={Logo} alt="logo" height={60} />
          </Link>
          <Search>
            <SearchBar handlerKeyword={handlerKeyword} />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            <IconButton size="large" onClick={colorMode.toggleColorMode}>
              {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderHamburgerMenu}
      {renderMenu}
    </Box>

    // ============= Before Update Header
    // <div>
    //   <Container>
    //     <header className={styles.header}>
    //       <div className={styles.headerLeft}>
    //         <Link to="/">
    //           <img src={Logo} alt="logo" height={60} />
    //         </Link>
    //         <SearchBar handlerKeyword={handlerKeyword} />
    //       </div>
    //       <div className={styles.headerRight}>
    //         <Link to="/about">
    //           <Chip label="About" variant="outlined" size="large" />
    //         </Link>
    //         {/* Light/Dark Mode */}
    //         <Chip
    //           icon={mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
    //           label="Mode"
    //           color="primary"
    //           variant="outlined"
    //           size="large"
    //           onClick={colorMode.toggleColorMode}
    //           className={styles.chip}
    //         />
    //         <UserBar />
    //       </div>
    //     </header>
    //   </Container>
    // </div>
  );
}

export default Header;
