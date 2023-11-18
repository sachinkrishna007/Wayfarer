import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userInfo: localStorage.getItem("booking")
    ? JSON.parse(localStorage.getItem("booking"))
    : null,
};

const authSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("booking", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("booking");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
