import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';


const getUserFromLocalStorage = () => {
    try {
        const user = Cookies.get('sns_user')
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
        return null;
    }
};

export const emailConfirmation = async ({ email }) => {
    try {
        const response = await axios.post(`/apihost/api/v1/user/find-email`, { email })
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'No account found or unexpected error';
        toast.error(errorMessage);
        throw new Error(errorMessage);
    }
};

export const resetPassword = async ({ code, newPassword }) => {
    try {
        const response = await axios.post(`/apihost/api/v1/user/reset-password`, { code, newPassword });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Incorrect confirmation code or unexpected error';
        toast.error(errorMessage);
        throw new Error(errorMessage);
    }
};

export default {
    emailConfirmation,
    resetPassword
};
