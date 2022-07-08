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
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;