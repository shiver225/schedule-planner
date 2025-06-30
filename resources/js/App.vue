<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from './stores/auth';
import { useToast } from 'primevue/usetoast';
import axios from 'axios';

const router = useRouter();
const toast = useToast();
const loading = ref(false);
const authStore = useAuthStore();

const { user, isAuthenticated } = authStore;

const handleLogout = async () => {
    loading.value = true;
    try {
        await axios.post('/api/logout');
        authStore.clearAuth();
        
        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Logged out successfully',
            life: 3000
        });

        router.push('/login');
    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to logout',
            life: 3000
        });
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <div class="min-h-screen bg-gray-50">
        <nav v-if="isAuthenticated" class="bg-white shadow">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex">
                        <router-link 
                            to="/" 
                            class="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900"
                        >
                            Home
                        </router-link>
                        <router-link 
                            to="/users" 
                            class="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900"
                        >
                            Users
                        </router-link>
                    </div>
                    <div class="flex items-center">
                        <span class="mr-4">{{ user?.name }}</span>
                        <Button 
                            label="Logout" 
                            severity="secondary"
                            @click="handleLogout"
                            :loading="loading"
                        />
                    </div>
                </div>
            </div>
        </nav>

        <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <router-view></router-view>
        </main>

        <Toast position="top-right" />
    </div>
</template>

<style>
/* Global styles */
body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

.p-float-label input:focus ~ label,
.p-float-label input.p-filled ~ label,
.p-float-label textarea:focus ~ label,
.p-float-label textarea.p-filled ~ label,
.p-float-label .p-inputwrapper-focus ~ label,
.p-float-label .p-inputwrapper-filled ~ label {
    top: -0.75rem;
    font-size: 12px;
    padding: 0 4px;
    background-color: white;
}
</style>