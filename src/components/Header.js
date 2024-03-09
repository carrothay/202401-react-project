import Logo from "../assets/logo.png";
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  styled,
} from "@mui/material";
import { SearchBar, UserBar } from "./index.js";
import { Link, useNavigate } from "react-router-dom";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useContext, useState } from "react";
import ColorModeContext from "../context/ColorModeContext";
import MenuIcon from "@mui/icons-material/Menu";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  // backgroundColor: alpha(theme.palette.common.white, 0.35),
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
  const [hamburgerEl, setHamburgerEl] = useState(null);
  const navigate = useNavigate();
  const isHamburgerOpen = Boolean(hamburgerEl);

  const handleHamburgerMenuOpen = (event) => {
    setHamburgerEl(event.currentTarget);
  };

  const handleHamburgerMenuClose = () => {
    setHamburgerEl(null);
  };

  const handlerAbout = () => {
    navigate("/about");
  };

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
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Link to="/" style={{ display: "flex", alignItems: "center" }}>
              <img src={Logo} alt="logo" height={60} />
            </Link>
          </Box>
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
          </Box>
          <UserBar />
        </Toolbar>
      </AppBar>
      {renderHamburgerMenu}
    </Box>
  );
}

export default Header;
