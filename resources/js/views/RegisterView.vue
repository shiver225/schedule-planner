<template>
    <div class="flex min-h-screen items-center justify-center bg-gray-100">
        <div class="w-full max-w-md">
            <form @submit.prevent="handleRegister" class="bg-white rounded-lg shadow-md px-8 pt-6 pb-8 mb-4">
                <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>
                
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                        Name
                    </label>
                    <InputText 
                        id="name"
                        v-model="formData.name" 
                        class="w-full"
                        :class="{'p-invalid': v$.name.$error}"
                    />
                    <small class="text-red-500" v-if="v$.name.$error">
                        {{ v$.name.$errors[0].$message }}
                    </small>
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                        Email
                    </label>
                    <InputText 
                        id="email"
                        v-model="formData.email" 
                        type="email"
                        class="w-full"
                        :class="{'p-invalid': v$.email.$error}"
                    />
                    <small class="text-red-500" v-if="v$.email.$error">
                        {{ v$.email.$errors[0].$message }}
                    </small>
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Password
                    </label>
                    <Password 
                        id="password"
                        v-model="formData.password"
                        class="w-full"
                        :class="{'p-invalid': v$.password.$error}"
                        :feedback="true"
                        toggleMask
                    />
                    <small class="text-red-500" v-if="v$.password.$error">
                        {{ v$.password.$errors[0].$message }}
                    </small>
                </div>

                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password_confirmation">
                        Confirm Password
                    </label>
                    <Password 
                        id="password_confirmation"
                        v-model="formData.password_confirmation"
                        class="w-full"
                        :class="{'p-invalid': v$.password_confirmation.$error}"
                        :feedback="false"
                        toggleMask
                    />
                    <small class="text-red-500" v-if="v$.password_confirmation.$error">
                        {{ v$.password_confirmation.$errors[0].$message }}
                    </small>
                </div>

                <div class="flex items-center justify-between">
                    <Button 
                        type="submit"
                        label="Register" 
                        class="w-full"
                        :loading="loading"
                    />
                </div>

                <div class="text-center mt-4">
                    <router-link 
                        to="/login" 
                        class="text-blue-500 hover:text-blue-700"
                    >
                        Already have an account? Login
                    </router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { required, email as emailValidator, sameAs, minLength } from '@vuelidate/validators';
import axios from 'axios';
import { useToast } from 'primevue/usetoast';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();
const loading = ref(false);

const formData = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
});

const rules = {
    name: { required },
    email: { required, email: emailValidator },
    password: { required, minLength: minLength(8) },
    password_confirmation: { required, sameAs: sameAs(() => formData.password) }
};

const v$ = useVuelidate(rules, formData);

const handleRegister = async () => {
    const isValid = await v$.value.$validate();
    if (!isValid) return;

    loading.value = true;
    try {
        const response = await axios.post('/api/register', formData);

        authStore.setAuth({
            userData: response.data.user,
            tokenData: response.data.token
        });

        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Registration successful',
            life: 3000
        });

        router.push('/');
    } catch (error) {
        let errorMessage = 'An error occurred during registration';
        if (error.response?.data?.message) {
            errorMessage = error.response.data.message;
        } else if (error.response?.data?.errors) {
            errorMessage = Object.values(error.response.data.errors)[0][0];
        }
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: errorMessage,
            life: 3000
        });
    } finally {
        loading.value = false;
    }
};
</script> 