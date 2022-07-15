<template>
    <form class="registration__form" @submit.prevent="onLogin">
        <h2>Sign in</h2>
        <p class="empty-inputs" v-if="empty">Please fill in the all fields!</p>

        <input type="text" placeholder="Email" v-model="email">
        <input type="password" placeholder="Password" v-model="password">

        <button type="submit">Submit</button>
        <button class="google__auth">Sign in with Google</button>
    </form>
</template>

<script>
import { auth } from '@/firebase/init';
import { createUserWithEmailAndPassword } from 'firebase/auth';
export default {
    data() {
        return {
            email: '',
            password: '',
            empty: false
        }
    },
    methods: {
        onLogin() {
            if(this.email.trim() === '' && this.password.trim() === '') {
                this.empty = true;
                return;
            }else {
                this.empty = false;
                createUserWithEmailAndPassword(auth, this.email, this.password)
                    .then((data) => {
                        // Signed in
                        alert('Successfully registered!');
                        this.email = '';
                        this.password = '';
                    })
                    .catch((e) => {
                        console.log(e.code);
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
    margin: 20px;
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
    background-color: #e4c75cd3 !important;
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
}
.google__auth:hover {
    letter-spacing: 0 !important;
    transform: scale(1) !important;
    background-color: #edca4ed4 !important;
}
</style>