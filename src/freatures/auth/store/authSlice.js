import { createSlice } from '@reduxjs/toolkit';
import { login, register } from '../services/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

const getUserFromCookie = () => {
    return Cookies.get('sns_user') ? JSON.parse(Cookies.get('sns_user')) : null;
};

const initialState = {
    user: getUserFromCookie(),
    isAuthenticated: getUserFromCookie() ? true : false,
    error: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            Cookies.remove('sns_user');
            Cookies.remove('hasSeenRequests');
            state.isAuthenticated = false;
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isAuthenticated = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload;
                Cookies.set('sns_user', JSON.stringify(action.payload), { expires: 1, path: '' });
                toast.success('logged in!', {
                    position: 'top-center',
                    autoClose: 3000,
                });
            })
            .addCase(login.rejected, (state, action) => {
                state.isAuthenticated = false;
                toast.error(action.payload, {
                    position: 'top-center',
                    autoClose: 3000,
                });
            })
            .addCase(register.fulfilled, () => {
                toast.success('successfully signed up', {
                    position: 'top-center',
                    autoClose: 3000,
                });
            })
            .addCase(register.rejected, (_, action) => {
                toast.error(action.payload, {
                    position: 'top-center',
                    autoClose: 3000,
                });
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
