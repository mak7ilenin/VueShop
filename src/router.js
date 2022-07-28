import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home'

const routes = [
    {
        name: 'Home',
        path: '/',
        component: Home
    },
    {
        name: 'Products',
        path: '/products',
        component: () => import('@/views/Products.vue')
    },
    {
        name: 'Login',
        path: '/log-in',
        component: () => import('@/views/Login.vue')
    },
    {
        name: 'Registration',
        path: '/registration',
        component: () => import('@/views/Registration.vue')
    },
    {
        name: 'Edit-Product',
        path: '/editProduct',
        component: () => import('@/views/EditProduct.vue')
    },
    {
        name: 'My-Cart',
        path: '/my-cart',
        component: () => import('@/views/MyCart.vue')
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;