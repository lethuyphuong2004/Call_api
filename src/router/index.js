import { createRouter, createWebHistory } from 'vue-router';
import ComHome from '../components/Home.vue';
import ComLogin from '../components/LoginUser.vue'

const routes = [
    { path: '/', component: ComHome },
    { path: '/login', component: ComLogin }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
