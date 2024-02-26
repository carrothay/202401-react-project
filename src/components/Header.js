import Logo from "../assets/logo.png";
import styles from "./Header.module.css";
import { Chip, Container } from "@mui/material";
import { SearchBar, UserBar } from "./index.js";
import { Link } from "react-router-dom";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useContext } from "react";
import ColorModeContext from "../context/ColorModeContext";

function Header({ handlerKeyword }) {
  const { mode, colorMode } = useContext(ColorModeContext);

  return (
    <div>
      <Container>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <Link to="/">
              <img src={Logo} alt="logo" height={60} />
            </Link>
            <SearchBar handlerKeyword={handlerKeyword} />
          </div>
          <div className={styles.headerRight}>
            {/* Light/Dark Mode */}
            <Chip
              icon={mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
              label="Mode"
              color="primary"
              variant="outlined"
              size="large"
              onClick={colorMode.toggleColorMode}
              className={styles.chip}
            ></Chip>
            <UserBar />
          </div>
        </header>
      </Container>
    </div>
  );
}

export default Header;
