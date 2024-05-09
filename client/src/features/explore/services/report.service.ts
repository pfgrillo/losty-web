import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/createAxiosClient";

export const fetchReportedItems = createAsyncThunk(
  "markers/fetchMarkers",
  async () => {
    try {
      const response = await api.get("http://localhost:3020/items");

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const postReportedItem = createAsyncThunk(
  "markers/postMarker",
  async (item: any) => {
    try {
      const response = await api.post("http://localhost:3020/items", item);

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteReportedItem = createAsyncThunk(
  "markers/deleteMarker",
  async (id: string) => {
    try {
      const response = await api.delete(`http://localhost:3020/items/${id}`);

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
