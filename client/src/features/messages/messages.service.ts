import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/createAxiosClient';

export interface MessagesResponse {
    host: string;
    guest: string;
    chatRoom: string;
    messages: { from: string; text: string }[];
}

export interface MessagesRequest {
    host: string;
    guest: string;
    chatRoom?: string;
}

export const openRoom = createAsyncThunk('messages/openRoom', async (payload: MessagesRequest): Promise<MessagesResponse> => {
    try {
        const response = await api.put('http://localhost:3030/chat/openRoom', payload);
        //const response = await api.put('https://messages-api.vercel.app/chat/openRoom', payload);

        const messages: MessagesResponse = response.data;

        return messages;
    
    } catch (error) {
        throw error;
    }
});

export const saveMessage = createAsyncThunk('messages/saveMessage', async (payload: {from: string, to: string; message: string; chatRoom: string}): Promise<MessagesResponse> => {
    try {
        const response = await api.post('http://localhost:3030/chat/save_message', payload);
        //const response = await api.post('http://localhost:3030/chat/saveMessage', payload);

        const messages: MessagesResponse = response.data;

        return messages;
    
    } catch (error) {
        throw error;
    }
});

export const getMessages = createAsyncThunk('messages/getMessages', async (payload: {chatRoom: string;}): Promise<MessagesResponse> => {
    try {
        const response = await api.post('http://localhost:3030/chat/messages', payload);
        //const response = await api.post('http://localhost:3030/chat/getMessages', payload);

        const messages: MessagesResponse = response.data;
        console.log(messages);
        return messages;
    
    } catch (error) {
        throw error;
    }
});
