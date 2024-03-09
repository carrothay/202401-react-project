import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  user: { username: "tacocat", password: "1234" },
  // isLoggedIn: false,
  userList: [],
  // validationErrors: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      console.log("login");
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      toast.success("Logged out");
      console.log("logout");
    },
    // setCredentials(state, action) {
    //   state.credentials = action.payload;
    // },
    // setIsLoggedIn(state, action) {
    //   state.isLoggedIn = action.payload;
    // },
    // setUserList(state, action) {
    //   state.userList = action.payload;
    // },
    // setValidationErrors(state, action) {
    //   state.validationErrors = action.payload;
    // },
    // clearUserData(state) {
    //   state.credentials = initialState.credentials;
    //   state.isLoggedIn = initialState.isLoggedIn;
    //   state.userList = initialState.userList;
    //   state.validationErrors = initialState.validationErrors;
    // },
  },
});

export const {
  // setCredentials,
  // setIsLoggedIn,
  // setUserList,
  // setValidationErrors,
  // clearUserData,
  loginUser,
  logoutUser,
} = userSlice.actions;

export default userSlice.reducer;
