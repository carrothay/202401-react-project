import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  savedList: localStorage.getItem("savedList")
    ? JSON.parse(localStorage.getItem("savedList"))
    : [],
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
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
    },
    logoutUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.savedList = [];
      localStorage.setItem("isLoggedIn", "false");
      localStorage.setItem("user", null);
      localStorage.setItem("savedList", []);
      toast.success("Logged out");
    },
    toggleSavedList: (state, action) => {
      const existingIndex = state.savedList.findIndex(
        (item) => item.uuid === action.payload.uuid
      );
      if (existingIndex !== -1) {
        // Remove it if it exists
        state.savedList.splice(existingIndex, 1);
      } else {
        state.savedList.push(action.payload);
      }
      localStorage.setItem("savedList", JSON.stringify(state.savedList));
    },
    deleteItemFromSavedList: (state, action) => {
      const idToDelete = action.payload;
      state.savedList = state.savedList.filter(
        (item) => item.uuid !== idToDelete
      );
      localStorage.setItem("savedList", JSON.stringify(state.savedList));
    },
  },
});

export const {
  loginUser,
  logoutUser,
  toggleSavedList,
  deleteItemFromSavedList,
} = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectSavedList = (state) => state.user.savedList;

export default userSlice.reducer;
