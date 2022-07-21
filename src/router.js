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
        path: '/registration',
        component: () => import('@/views/Registration.vue')
    },
    {
        path: '/editProduct',
        component: () => import('@/views/EditProduct.vue')
    },
    {
        path: '/my-cart',
        component: () => import('@/views/MyCart.vue')
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;