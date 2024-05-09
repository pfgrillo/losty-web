import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  UserResponse,
  fetchUser,
} from "../../features/user/services/user.service";
import { ReportedItem } from "../../models/ReportedItem";
import { RootState } from "..";

export interface UserState {
  id: string | null;
  username: string | null;
  name: string | null;
  items: ReportedItem[];
  chats: { chatRoom: string; users: string[]; item: string }[];
  error: string | null;
}

const initialState: UserState = {
  id: null,
  username: localStorage.getItem("user") || null,
  name: null,
  items: [],
  chats: [],
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {})
      .addCase(
        fetchUser.fulfilled,
        (state, action: PayloadAction<UserResponse>) => {
          state.id = action.payload._id;
          state.username = action.payload.username;
          state.name = action.payload.name;
          state.items = action.payload.items;
          state.chats = action.payload.chats;
          state.error = null;
        }
      )
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.error.message as string;
      });
  },
});

export const selectUser = (state: RootState) => state.user;
export const selectUserItems = (state: RootState) => state.user.items;
export const selectUserChats = (state: RootState) => state.user.chats;

export default userSlice.reducer;
