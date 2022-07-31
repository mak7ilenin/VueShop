<template>
    <div class="cart__page">
        <h2>My shopping cart</h2>
        <div class="loader__container">
            <Loader v-if="loading"/>
        </div>
        <div class="carts__container">
            <p class="empty-cart" v-if="!checkCarts">There are no products in your cart yet . . .</p>
            <CartList 
                :carts="carts"
                :authUser="authUser"
            />
        </div>
    </div>
</template>

<script>
import { db, auth } from '@/firebase/init';
import { collection, onSnapshot } from 'firebase/firestore';

import CartList from '@/components/CartList';
import Loader from '@/components/Loader';
export default {
    components: {
        CartList,
        Loader
    },
    data() {
        return {
            carts: [],
            users: [],
            authUser: null,
            loading: true,
            checkCarts: true
        }
    },
    beforeMount() {
        onSnapshot(collection(db, 'users'), (querySnapshot) => {
            this.users = [];
            querySnapshot.forEach((doc) => {
                const user = {
                    id: doc.id,
                    userId: doc.data().userId,
                    username: doc.data().username,
                    money: doc.data().money,
                    cartItems: doc.data().cartItems
                }
                this.users.push(user);
            });
            this.getCart();
        });
    },
    methods: {
        getCart() {
            // To find auth user cart
            const currentUser = auth.currentUser;
            this.authUser = this.users.find(user => user.userId === currentUser.uid);
    
            // To fill the cart list
            this.carts = this.authUser.cartItems;
            this.loading = false;
            $('.loader__container').hide();
            if(this.carts.length > 0) {
                this.checkCarts = true;
            } else {
                this.checkCarts = false;
            }
        }
    }
}
</script>

<style>
.cart__page {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}
.cart__page h2 {
    width: 100%;
    margin-top: 40px;
    margin-bottom: 10px;
    font-size: 48px;
    font-style: italic;
    text-align: center;
}
.carts__container {
    width: 75%;
    margin: 0 auto;
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
}
.empty-cart {
    width: 100%;
    font-size: 32px;
    margin-top: 20px;
    animation: pulse 2s infinite;
    transition: all 1s;
}
@keyframes pulse {
    0% {
        transform: scale(0.9);
        color: #fff;
    }
    70% {
        transform: scale(1);
        color: rgb(178, 255, 159);
    }
    100% {
        transform: scale(0.9);
        color: #fff;
    }
}
</style>