import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/createAxiosClient";
import { ReportedItem } from "../../../models/ReportedItem";

export interface UserResponse {
  _id: string;
  username: string;
  name: string;
  items: ReportedItem[];
  chats: any[];
}

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (): Promise<UserResponse> => {
    try {
      const response = await api.get("http://localhost:3010/user");
      //const response = await api.get('https://losty-user-api.vercel.app/user');

      const user: UserResponse = response.data;

      return user;
    } catch (error) {
      throw error;
    }
  }
);
