<template>
    <div class="cart__page">
        <h2>My shopping cart</h2>
        <div class="loader__container">
            <Loader v-if="loading"/>
        </div>
        <div class="carts__container">
            <CartList 
                :carts="carts"
            />
        </div>
    </div>
</template>

<script>
import { db, auth } from '@/firebase/init';
import { collection, onSnapshot } from 'firebase/firestore';
import CartList from '@/components/CartList.vue';
export default {
    components: {
        CartList
    },
    data() {
        return {
            carts: [],
            users: [],
            authUser: null,
            loading: false
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
        });
    },
    beforeUpdate() {
        // To find auth user cart
        const currentUser = auth.currentUser;
        this.authUser = this.users.find(user => user.userId === currentUser.uid);
        
        this.authUser.cartItems
    }
}
</script>

<style>

</style>