import { createRouter, createWebHistory } from 'vue-router';
import Home from '../resources/views/Home.vue';
import UserRepo from '../resources/views/UserRepoView.vue'; // or wherever your component is

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/users', name: 'Users', component: UserRepo },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;