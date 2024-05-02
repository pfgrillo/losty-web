import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/User";
import { loginChunk, registerChunk } from "../../features/authentication/services/auth.service";
import { RootState } from "..";

export interface AuthState {
  user: null | User;
  authorized: boolean,
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  authorized: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    isAuthorized: (state) => {
      state.authorized = !state.authorized;
    }
  },
  extraReducers: (builder) => {
    builder
        .addCase(loginChunk.pending, (state) => { })
        .addCase(loginChunk.fulfilled, (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.authorized = true;
            state.error = null;
        })
        .addCase(loginChunk.rejected, (state, action) => {
            state.user = null;
            state.authorized = false;
            state.error = action.error.message as string;
        })
        .addCase(registerChunk.pending, (state) => { })
        .addCase(registerChunk.fulfilled, (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.authorized = true;
            state.error = null;
        })
        .addCase(registerChunk.rejected, (state, action) => {
            state.user = null;
            state.authorized = false;
            state.error = action.error.message as string;
        });
},
});

export const { login, logout } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;
export const selecError = (state: RootState) => state.auth.error;

export default authSlice.reducer;
