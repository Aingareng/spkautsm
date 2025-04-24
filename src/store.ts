// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./features/login/store/loginStore";
import tabReducer from "./features/dashboard/store/tabStore";
export const store = configureStore({
  reducer: { login: loginReducer, tab: tabReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
