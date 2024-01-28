import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Box, Button, TextField } from "@mui/material";
import styles from "./User.module.css";

function UserLogin() {
  const userCtx = useContext(UserContext);
  const {
    credentials,
    handlerChangeCredentials,
    handleSubmit,
    validationErrors,
  } = userCtx;

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <div className={styles.loginform}>
        <h3>Login to your account</h3>
        <div className={styles.inputsection}>
          <div className={styles.inputform}>
            {validationErrors.username && (
              <div className="error">{validationErrors.username}</div>
            )}
            <TextField
              required
              label="username"
              type="text"
              name="username"
              value={credentials.username}
              onChange={handlerChangeCredentials}
              fullWidth
              sx={{ my: 1.5 }}
              className={styles.loginfield}
            />
          </div>
          <div className={styles.inputform}>
            {validationErrors.password && (
              <div className="error">{validationErrors.password}</div>
            )}
            <TextField
              required
              label="password"
              type="password"
              name="password"
              value={credentials.password}
              onChange={handlerChangeCredentials}
              fullWidth
              sx={{ my: 1.5 }}
              className={styles.loginfield}
            />
          </div>
        </div>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={Object.keys(validationErrors).length !== 0}
        >
          Login
        </Button>
      </div>
    </Box>
  );
}

export default UserLogin;
