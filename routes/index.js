import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomeView.vue';
import UserRepo from '@/views/UserRepoView.vue';
import Login from '@/views/LoginView.vue';
import Register from '@/views/RegisterView.vue';

const routes = [
    { 
        path: '/', 
        name: 'Home', 
        component: Home,
        meta: { requiresAuth: true }
    },
    { 
        path: '/users', 
        name: 'Users', 
        component: UserRepo,
        meta: { requiresAuth: true }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { guest: true }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: { guest: true }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Navigation guard
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!token) {
            next('/login');
            return;
        }
    }

    if (to.matched.some(record => record.meta.guest)) {
        if (token) {
            next('/');
            return;
        }
    }

    next();
});

export default router;