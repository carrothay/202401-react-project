import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Button } from "@mui/material";
import styles from "./User.module.css";
import { useNavigate } from "react-router-dom";

// Activity
// Once the user has logged in - hide the input fields and show Welcome <username> with a logout button
// when user has logged out, show the input fields again

function UserBar() {
  const userCtx = useContext(UserContext);
  const { credentials, handleLogout, isLoggedIn } = userCtx;

  const navigate = useNavigate();

  const handlerLogin = () => {
    navigate("/login");
  };
  const handlerViewList = () => {
    navigate("/user");
  };

  return (
    <div className={styles.userBarContainer}>
      {!isLoggedIn ? (
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
      )}
    </div>
  );
}

export default UserBar;
