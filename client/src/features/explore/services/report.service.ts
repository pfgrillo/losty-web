import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../services/createAxiosClient';

export const fetchMarkers = createAsyncThunk('markers/fetchMarkers', async () => {
    try {
        //const response = await api.get('https://losty-report-api.vercel.app/items');
        const response = await api.get('http://localhost:3020/items');

        return response.data;
    } catch (error) {
        throw error;
    }
});

export const postMarker = createAsyncThunk('markers/postMarker', async (marker: any) => {
    try {
        //const response = await api.post('https://losty-report-api.vercel.app/items', marker);
        const response = await api.post('http://localhost:3020/items', marker);

        return response.data;
    } catch (error) {
        throw error;
    }
});

export const deleteMarker = createAsyncThunk('markers/deleteMarker', async (id: string) => {
    try {
        const response = await api.delete(`http://localhost:3020/items/${id}`);

        return response.data;
    } catch (error) {
        throw error;
    }
});