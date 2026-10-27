import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    authChecked: false,
  },

  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.authChecked = true;
    },
    logout: (state) => {
      state.user = null;
      state.authChecked = true;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectAuthChecked = (state) => state.user.authChecked;

export default userSlice.reducer;
