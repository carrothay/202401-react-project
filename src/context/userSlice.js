import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  // Read from local storage
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  savedList: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      // Save to local Storage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(action.payload));
      toast.success("Logged in");
      console.log("login");
    },
    logoutUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.setItem("isLoggedIn", "false");
      localStorage.setItem("user", null);
      toast.success("Logged out");
      console.log("logout");
      //to add: remove savedList
    },

    // setUserList(state, action) {
    //   state.userList = action.payload;
    // },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
