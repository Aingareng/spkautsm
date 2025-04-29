// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./features/login/store/loginStore";
import tabReducer from "./features/dashboard/store/tabStore";
import bioPatientReducer from "./features/dashboard/store/bioPatientStore";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    tab: tabReducer,
    bioPatient: bioPatientReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
