import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/apihost/api/v1/login', {
                email,
                password,
            });
            return response.data;
        } catch (error) {
            if (error.response) {
                if (error.response.status === 403) {
                    return rejectWithValue('The account has been locked!');
                }
                return rejectWithValue(error.response.data || 'An error occurred!');
            }
            return rejectWithValue('Wrong username or password!');
        }
    },
);

export const register = createAsyncThunk(
    'auth/register',
    async ({ email, password, fullName, dateOfBirth, phoneNumber }, { rejectWithValue }) => {
        try {
            // TODO: un-comment these when api is done
            const response = await axios.post('/apihost/api/v1/register', {
                email,
                password,
                fullName,
                dateOfBirth,
                phoneNumber,
            });

            return response.data;
        } catch (error) {
            return rejectWithValue('bad credentials!');
        }
    },
);

export default { login, register };