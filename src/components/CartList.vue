<template>
    <CartItem
        v-for="cartItem in carts"
        :cartItem="cartItem"
        :authUser="authUser"
    />
</template>

<script>
import CartItem from '@/components/CartItem';
export default {
    props: {
        carts: {
            type: Array
        },
        authUser: {
            type: Object
        }
    },
    components: {
        CartItem
    }
}
</script>