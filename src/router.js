import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home'

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/products',
        component: () => import('@/views/Products.vue')
    },
    {
        path: '/log-in',
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/editProduct',
        component: () => import('@/views/EditProduct.vue')
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;