import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setCredentials: (state, action) => {
      console.log("Reducer Payload:", action.payload);
      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;

      state.userInfo = { ...action.payload, expirationTime };

      localStorage.setItem(
        "userInfo",
        JSON.stringify({ ...action.payload, expirationTime })
      );
    },

    logout: (state) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
