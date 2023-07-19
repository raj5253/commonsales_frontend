import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("token"),
    isLoggedIn: localStorage.getItem("token") ? true : false,
    isAdmin: localStorage.getItem("isAdmin")
      ? JSON.parse(localStorage.getItem("isAdmin"))
      : false,
    // user: "xxxxx",
  },

  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      // console.log(action.payload);
      state.user = action.payload;
      console.log(state.user);
    },
    setAdmim(state, action) {
      state.isAdmin = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = "";
      state.isAdmin = false; //user may/maynot be admin , but we call it for simplicity
    },
  },
});

export const authActions = authSlice.actions; //we didn't destructured inorder to avoid confusion in dispatching

export default authSlice;
