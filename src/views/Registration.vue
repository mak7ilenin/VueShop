<template>
    <form class="registration__form" @submit.prevent="onRegister">
        <h2>Registration</h2>
        <p class="empty-inputs" v-if="empty">Please fill in the all fields!</p>

        <input type="text" placeholder="Email" v-model="email" class="form-control">
        <input type="password" placeholder="Password" v-model="password" class="form-control">

        <input type="text" placeholder="Username" v-model="username" class="form-control">
        <input type="number" placeholder="Money" min="0.01" step=".01" v-model="money" class="form-control">

        <button type="submit">Submit</button>
    </form>
</template>

<script>
import { addDoc, collection } from 'firebase/firestore';
import { storage, auth } from '@/firebase/init';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import router from '@/router';
export default {
    data() {
        return {
            email: '',
            password: '',
            username: '',
            money: null,
            empty: false
        }
    },
    methods: {
        onRegister() {
            if(this.email.trim() === '' 
                || this.password.trim() === ''
                || this.username.trim() === ''
                || this.money === 0) 
            {
                this.empty = true;
                return;
            }else {
                this.empty = false;
                createUserWithEmailAndPassword(auth, this.email, this.password)
                    .then(() => {
                        const user = auth.currentUser;
                        const userId = user.uid;
                        addDoc(collection(storage, 'users'), {
                            userId: userId,
                            username: this.username,
                            money: this.money
                        });
                        router.replace('/log-in');
                        // alert('Successfully registered!');
                    })
                    .catch((e) => {
                        alert(e.message);
                    });
            }
        }
    }
}
</script>

<style>
.registration__form {
    width: 900px;
    /* background-color: #4c7f8f; */
    /* border: 1px solid; */
    /* border-radius: 10px; */
    padding: 50px 20px 50px 20px;
    margin: 0 auto;
    margin-top: 220px;
}
.registration__form h2 {
    font-size: 48px;
    font-style: italic;
}
.registration__form input {
    width: 450px;
    height: 60px;
    font-size: 18px;
    position: relative;
    border-radius: 5px;
    padding-left: 30px;
    margin: 25px auto;
    margin-bottom: 10px;
}
.registration__form button {
    width: 450px;
    height: 50px;
    margin-top: 20px;
    font-size: 24px;
    background-color: #5ce47e;
    border-radius: 5px;
    cursor: pointer;
    transition: all .2s;
}
.registration__form button:hover {
    transform: scale(1.02);
    letter-spacing: 2px
}
.google__auth {
    margin-top: 10px !important;
    background-color: #c7c7c7 !important;
}
.google__auth:after {
    content: '';
    width: 24px;
    height: 24px;
    display: inline-block;
    position: relative;
    right: -100px;
    top: 4px;
    background-image: url('../assets/Google__G__Logo.svg');
    background-position: center;
    background-repeat: no-repeat;
}
.google__auth:hover {
    letter-spacing: 0 !important;
    transform: scale(1) !important;
    background-color: #ffffffd4 !important;
}
</style>