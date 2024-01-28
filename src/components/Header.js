import Logo from "../assets/logo.png";
import styles from "./Header.module.css";
import { Container } from "@mui/material";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import UserBar from "./UserBar";

function Header({ handlerKeyword }) {
  return (
    <div className={styles.headerbg}>
      <Container>
        <div className={styles.header_container}>
          <header className={styles.header}>
            <Link to="/">
              <img src={Logo} alt="logo" height={60} />
            </Link>

            {/* Separated SearchBar component */}
            <SearchBar handlerKeyword={handlerKeyword} />
          </header>
          <UserBar />
        </div>
      </Container>
    </div>
  );
}

export default Header;
