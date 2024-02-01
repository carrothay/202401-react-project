import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi-browser";

const UserContext = createContext();

const initialCredentials = {
  username: "",
  password: "",
};

const schema = {
  username: Joi.string().min(4).max(20).required(),
  password: Joi.string().min(4).max(20).required(),
  //   password: Joi.string()
  //     .min(4)
  //     .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
  //     .required(),
};

export function UserProvider({ children }) {
  // manage the user credentials state here
  const [credentials, setCredentials] = useState(initialCredentials);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userList, setUserList] = useState([]);

  const [validationErrors, setValidationErrors] = useState({});

  const navigate = useNavigate();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // alert("Login succcess!");
    setIsLoggedIn(true);
    navigate("/");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCredentials(initialCredentials);
    setUserList([]);
    navigate("/");
  };

  const handlerToggleSaved = (restaurant) => {
    const existingIndex = userList.findIndex(
      (item) => item.uuid === restaurant.uuid
    );
    if (existingIndex !== -1) {
      const updatedList = [...userList];
      updatedList.splice(existingIndex, 1);
      setUserList(updatedList);
    } else {
      setUserList((prevList) => [...prevList, restaurant]);
    }
  };

  const context = {
    // ES6 enhanced obj literal
    // credentials: credentials, -> credentials
    credentials: credentials,
    handlerChangeCredentials: handlerChangeCredentials,
    handleSubmit: handleSubmit,
    isLoggedIn: isLoggedIn,
    setIsLoggedIn: setIsLoggedIn,
    handleLogout: handleLogout,
    userList: userList,
    setUserList: setUserList,
    validationErrors,
    handlerToggleSaved,
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
}

export default UserContext;
