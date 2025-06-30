import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
    const user = ref(JSON.parse(localStorage.getItem('user') || 'null'));
    const token = ref(localStorage.getItem('token') || '');

    const isAuthenticated = computed(() => !!token.value);

    const setAuth = ({ userData, tokenData }) => {
        user.value = userData;
        token.value = tokenData;
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', tokenData);
        axios.defaults.headers.common['Authorization'] = `Bearer ${tokenData}`;
    };

    const clearAuth = () => {
        user.value = null;
        token.value = '';
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
    };

    // Initialize axios header if token exists
    if (token.value) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
    }

    return {
        user,
        token,
        isAuthenticated,
        setAuth,
        clearAuth
    };
}); 