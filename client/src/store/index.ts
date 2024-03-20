import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import userSlice from "./features/userSlice";
import reportSlice from "./features/reportSlice";
import messageSlice from "./features/messageSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    report: reportSlice,
    messages: messageSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
