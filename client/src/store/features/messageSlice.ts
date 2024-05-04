import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import {
  MessagesResponse,
  getMessages,
  openRoom,
  saveMessage,
} from "../../features/messages/messages.service";

export interface ChatRoom {
  host: string | null;
  guest: string | null;
  messages: { from: string; text: string }[];
}

export interface MessagesState {
  chatRooms: Record<string, ChatRoom>; // Object containing chat rooms with their IDs as keys
  loading: boolean;
  error: string | null;
}

const initialState: MessagesState = {
  chatRooms: {},
  loading: false,
  error: null,
};

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(openRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        openRoom.fulfilled,
        (state, action: PayloadAction<MessagesResponse>) => {
          state.loading = false;
          const { chatRoom, messages, host, guest } = action.payload;
          if (!state.chatRooms[chatRoom]) {
            state.chatRooms[chatRoom] = {
              host: null,
              guest: null,
              messages: [],
            };
          }
          state.chatRooms[chatRoom].messages = messages;
          state.chatRooms[chatRoom].host = host;
          state.chatRooms[chatRoom].guest = guest;
          state.error = null;
        }
      )
      .addCase(openRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(saveMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveMessage.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        const { chatRoom, messages, host, guest } = action.payload;
        if (!state.chatRooms[chatRoom]) {
          state.chatRooms[chatRoom] = {
            host: null,
            guest: null,
            messages: [],
          };
        }
        state.chatRooms[chatRoom].messages = messages;
        state.chatRooms[chatRoom].host = host;
        state.chatRooms[chatRoom].guest = guest;
        state.error = null;
      })
      .addCase(saveMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(getMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.loading = false;
        const { chatRoom, messages, host, guest } = action.payload;
        if (!state.chatRooms[chatRoom]) {
          state.chatRooms[chatRoom] = {
            host: null,
            guest: null,
            messages: [],
          };
        }
        state.chatRooms[chatRoom].messages = messages;
        state.chatRooms[chatRoom].host = host;
        state.chatRooms[chatRoom].guest = guest;
        state.error = null;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
  },
});

export const selectMessageState = (state: RootState) => state.messages;
export const selectLoading = (state: RootState) => state.messages.loading;
export const selectError = (state: RootState) => state.messages.error;
//export const selectRoom = (state: RootState) => state.messages.chatRoom;
//export const selectMessages = (state: RootState) => state.messages.messages;
//export const selectCreator = (state: RootState) => state.messages.host;
//export const selectGuest = (state: RootState) => state.messages.guest;
export const selectChatRooms = (state: RootState) => state.messages.chatRooms;

export default messagesSlice.reducer;
