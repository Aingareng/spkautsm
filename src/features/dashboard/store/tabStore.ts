import localStorageUtils from "@/shared/utils/storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ITabState {
  tabValue: "bio" | "quiz" | "result";
}

const initialState: ITabState = {
  tabValue: "bio",
};

export const tabStore = createSlice({
  name: "tabStore",
  initialState,
  reducers: {
    setTabValue: (state, action: PayloadAction<ITabState["tabValue"]>) => {
      state.tabValue = action.payload;
      localStorageUtils.set<string>("tabValue", action.payload);
    },
  },
});

export const { setTabValue } = tabStore.actions;
export default tabStore.reducer;
