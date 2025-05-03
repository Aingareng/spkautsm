import { createSlice } from "@reduxjs/toolkit";
import { ILoginData } from "../types/login";

interface LoginState {
  isLoggedIn: boolean;
  user: ILoginData | null;
}

const initialState: LoginState = { isLoggedIn: false, user: null };

export const loginStore = createSlice({
  name: "login",
  initialState,
  reducers: {
    logiSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { logiSuccess, logout } = loginStore.actions;
export default loginStore.reducer;
