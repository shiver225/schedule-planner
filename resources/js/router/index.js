import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import UserRepoView from '../views/UserRepoView.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: { requiresAuth: true }
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
            meta: { guest: true }
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView,
            meta: { guest: true }
        },
        {
            path: '/users',
            name: 'users',
            component: UserRepoView,
            meta: { requiresAuth: true }
        }
    ]
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isGuestRoute = to.matched.some(record => record.meta.guest);

    if (requiresAuth && !token) {
        next('/login');
    } else if (isGuestRoute && token) {
        next('/');
    } else {
        next();
    }
});

export default router; 