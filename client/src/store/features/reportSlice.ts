import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Marker } from "../../models/Marker";
import { RootState } from "..";
import { deleteMarker, fetchMarkers, postMarker } from "../../features/explore/services/report.service";

export interface ReportState {
    username: string | null;
    markers: Marker[];
    loading: boolean;
    error: string | null;
}

const initialState: ReportState = {
    username: null,
    markers: [],
    loading: false,
    error: null,
};

export const reportSlice = createSlice({
    name: "report",
    initialState,
    reducers: { },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMarkers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMarkers.fulfilled, (state, action: PayloadAction<Marker[]>) => {
                state.loading = false;
                state.markers = action.payload;
                state.error = null;
            })
            .addCase(fetchMarkers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message as string;
            })
            .addCase(postMarker.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postMarker.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.markers = [...state.markers, action.payload];
                state.error = null;
            })
            .addCase(postMarker.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message as string;
            })
            .addCase(deleteMarker.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteMarker.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(deleteMarker.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message as string;
            });
    },
});

export const selectReportState = (state: RootState) => state.report;
export const selectUser = (state: RootState) => state.report.username;
export const selectMarkers = (state: RootState) => state.report.markers;

export default reportSlice.reducer;
