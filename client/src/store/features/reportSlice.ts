import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ReportedItem } from "../../models/ReportedItem";
import { RootState } from "..";
import {
  deleteReportedItem,
  fetchReportedItems,
  postReportedItem
} from "../../features/explore/services/report.service";

export interface ReportState {
  username: string | null;
  reportedItems: ReportedItem[];
  closeItems: ReportedItem[];
  loading: boolean;
  error: string | null;
}

const initialState: ReportState = {
  username: null,
  reportedItems: [],
  closeItems: [],
  loading: false,
  error: null,
};

export const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    setCloseItems: (state, action: PayloadAction<ReportedItem[]>) => {
      state.closeItems = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReportedItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchReportedItems.fulfilled,
        (state, action: PayloadAction<ReportedItem[]>) => {
          state.loading = false;
          state.reportedItems = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchReportedItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(postReportedItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postReportedItem.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.reportedItems = [...state.reportedItems, action.payload];
        state.error = null;
      })
      .addCase(postReportedItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(deleteReportedItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReportedItem.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteReportedItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
  },
});
export const { setCloseItems } = reportSlice.actions
export const selectReportState = (state: RootState) => state.report;
export const selectUser = (state: RootState) => state.report.username;
export const selectReportedItems = (state: RootState) => state.report.reportedItems;
export const selectCloseItems = (state: RootState) => state.report.closeItems;

export default reportSlice.reducer;
