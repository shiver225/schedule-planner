<script setup>
import { useRouter } from 'vue-router';
import Button from 'primevue/button';

const router = useRouter();

const handleLogout = async () => {
    try {
        await axios.post('/api/logout');
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        router.push('/login');
    } catch (error) {
        console.error('Logout failed:', error);
    }
};
</script>

<template>
    <div class="p-4">
        <h1 class="text-3xl font-bold mb-4">Welcome to Schedule Planner</h1>
        <p class="mb-4">You are logged in!</p>
        
        <Button label="View Users" @click="$router.push('/users')" class="mr-2" />
        <Button label="Logout" severity="danger" @click="handleLogout" />
    </div>
</template>