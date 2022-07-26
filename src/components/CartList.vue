<template>
    <CartItem
        v-for="cartItem in carts"
        :cartItem="cartItem"
    />
</template>

<script>
import CartItem from '@/components/CartItem';
export default {
    props: ['carts'],
    components: {
        CartItem
    }
}
</script>