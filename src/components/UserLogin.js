import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { Box, Button } from "@mui/material";
import styles from "./User.module.css";
import FormText from "./FormText";
import { useDispatch } from "react-redux";
import { loginUser } from "../context/userSlice";
import Joi from "joi-browser";
import { useNavigate } from "react-router";

function UserLogin() {
  // const userCtx = useContext(UserContext);
  // const {
  //   credentials,
  //   handlerChangeCredentials,
  //   handleSubmit,
  //   validationErrors,
  // } = userCtx;
  const [credentials, setCredentials] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const schema = {
    username: Joi.string().min(4).max(20).required(),
    password: Joi.string().min(4).max(20).required(),
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch the loginUser action upon form submission
    dispatch(loginUser(credentials));
    navigate("/");
  };

  const handlerChangeCredentials = (event) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => {
      return {
        ...prevCredentials,
        [name]: value,
      };
    });

    const errorMessage = validate(event);
    setValidationErrors((validationErrors) => {
      const newValidationErrors = { ...validationErrors };

      if (errorMessage) {
        newValidationErrors[name] = errorMessage;
      } else {
        delete newValidationErrors[name];
      }

      return newValidationErrors;
    });
  };

  const validate = (event) => {
    const { name, value } = event.target;
    const objToValidate = { [name]: value };
    const fieldSchema = { [name]: schema[name] };
    const validationResult = Joi.validate(objToValidate, fieldSchema);

    return validationResult.error
      ? validationResult.error.details[0].message
      : null;
  };

  return (
    <div style={{ height: "100vh" }}>
      <Box component="form" onSubmit={handleSubmit}>
        <div className={styles.loginform}>
          <h3>Login to your account</h3>
          <div className={styles.inputsection}>
            <div className={styles.inputform}>
              {validationErrors.username && (
                <div className="error">{validationErrors.username}</div>
              )}
              <FormText
                required
                label="username"
                type="text"
                name="username"
                value={credentials.username}
                onChange={handlerChangeCredentials}
                sx={{ my: 1.5 }}
                className={styles.loginfield}
              />
            </div>
            <div className={styles.inputform}>
              {validationErrors.password && (
                <div className="error">{validationErrors.password}</div>
              )}
              <FormText
                required
                label="password"
                type="password"
                name="password"
                value={credentials.password}
                onChange={handlerChangeCredentials}
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
    </div>
  );
}

export default UserLogin;
