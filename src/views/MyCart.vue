<template>
    <div class="cart__page">
        <h2>My shopping cart</h2>
        <div class="carts__container">
            <!-- <CartList 
                :carts="carts"
            /> -->
        </div>
    </div>
</template>

<script>
import CartList from '@/components/CartList.vue';

import { db, auth } from '@/firebase/init';
import { onSnapshot, collection } from 'firebase/firestore';
export default {
    components: {
        CartList
    },
    data() {
        return {
            users: [],
            ready: false,
            carts: [],
            loading: true
        }
    },
    props: {
        cartItem: {
            type: Object,
            required: true
        }
    },
    methods: {
        getUserCart: async function() {
            let authUser = auth.currentUser;
            onSnapshot(collection(db, 'users'), (querySnapshot) => {
                this.users = [];
                querySnapshot.forEach((doc) => {
                    const user = {
                        userId: doc.data().userId,
                        cartItems: doc.data().cartItems
                    }
                    this.users.push(user);
                });
                this.ready = true;
            });
            if(this.ready === true) {
                const currentArrayUser = this.users.find(user => user.userId === authUser.uid);
                console.log(currentArrayUser);
                this.carts = currentArrayUser.cartItems;
            }
        }
    },
    beforeMount() {
        this.getUserCart();
    }
}
</script>

<style>

</style>