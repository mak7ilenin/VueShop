<template>
    <div class="cart__page">
        <h2>My shopping cart</h2>
        <div class="carts__container">
            <CartList 
                :carts="carts"
            />
        </div>
    </div>
</template>

<script>
import CartList from '@/components/CartList.vue';
export default {
    components: {
        CartList
    },
    props: {
        authUser: {
            type: Object,

        }
    },
    data() {
        return {
            carts: [],
            authUser: null,
            loading: true
        }
    },
    methods: {
        
    },
    created: async function() {
        this.carts = authUser.cartItems;
        this.authUser = authUser
    }
}
</script>

<style>

</style>