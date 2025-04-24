import localStorageUtils from "@/shared/utils/storage";
import { createSlice } from "@reduxjs/toolkit";

interface LoginState {
  isLoggedIn: boolean;
  // user?: string | null;
}

const initialState: LoginState = { isLoggedIn: false };

export const loginStore = createSlice({
  name: "login",
  initialState,
  reducers: {
    logiSuccess: (state) => {
      state.isLoggedIn = true;
      localStorageUtils.set("isLoggedIn", true);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      localStorageUtils.set("isLoggedIn", false);
      localStorageUtils.remove("tabValue");
    },
  },
});

export const { logiSuccess, logout } = loginStore.actions;
export default loginStore.reducer;
