import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../services/createAxiosClient';
import { Marker } from '../../../models/Marker';

export interface UserResponse {
    _id: string;
    username: string;
    name: string;
    items: Marker[];
    chats: any[];
}

export const fetchUser = createAsyncThunk('user/fetchUser', async (): Promise<UserResponse> => {
    try {
        console.log('fetchUser');
        const response = await api.get('http://localhost:3010/user');
        //const response = await api.get('https://losty-user-api.vercel.app/user');
        
        const user: UserResponse = response.data;

        return user;
    
    } catch (error) {
        throw error;
    }
});
