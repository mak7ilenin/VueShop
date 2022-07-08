import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home'

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/groceries',
        component: () => import('@/views/Groceries.vue')
    },
    {
        path: '/registration',
        component: () => import('@/views/Registration.vue')
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;