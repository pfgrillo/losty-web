import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../services/createAxiosClient';
import { AuthForm } from '../components/LoginForm';

export const loginChunk = createAsyncThunk('auth/loginChunk', async (payload: AuthForm) => {
    try {
        //const response = await api.post('http://localhost:8080/auth/login', payload);
        const response = await api.post('http://localhost:3050/auth/login', payload);

        const user = { username: response.data.username };

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', response.data.username);

        return user;
    } catch (error) {
        throw error;
    }
});
