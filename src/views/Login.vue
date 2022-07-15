<template>
    <form class="registration__form" @submit.prevent="onLogin">
        <h2>Sign in</h2>
        <p class="empty-inputs"></p>

        <input type="text" placeholder="Email" v-model="email">
        <input type="password" placeholder="Password" v-model="password">

        <button type="submit">Submit</button>
    </form>
</template>

<script>
import { auth } from '@/firebase/init';
import { createUserWithEmailAndPassword } from 'firebase/auth';
export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        onLogin() {
            createUserWithEmailAndPassword(auth, this.email, this.password)
                .then((data) => {
                    // Signed in
                    alert('Successfully registered!');
                })
                .catch((e) => {
                    alert(e.code);
                    alert(e.message);
                })
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
</style>