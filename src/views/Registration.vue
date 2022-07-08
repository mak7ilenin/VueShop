<template>
    <form class="registration__form" @submit.prevent="onRegister">
        <h2>Registration</h2>
        <p class="empty-inputs"></p>
        <input type="text" placeholder="Name" v-model="name">
        <input type="text" placeholder="Surname" v-model="surname">

        <input type="text" placeholder="Login" v-model="login">
        <input type="password" placeholder="Password" v-model="password">

        <button type="submit">Register</button>
    </form>
</template>

<script>
export default {
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            name: '',
            surname: '',
            login: '',
            password: ''
        }
    },
    mounted() {
        // if(localStorage.getItem('newUser')) {
        //     try {
        //         this.newUser = JSON.parse(localStorage.getItem('newUser'));
        //     } catch (error) {
        //         localStorage.removeItem('newUser');
        //     }
        // }
    },
    methods: {
        onRegister() {
            localStorage.removeItem('user');
            if(
                this.name.trim() 
                && this.surname.trim 
                && this.login.trim() 
                && this.password.trim()
            ) {
                const newUser = {
                    name: this.name,
                    surname: this.surname,
                    login: this.login,
                    password: this.password
                }
                localStorage.setItem('user', JSON.stringify(newUser));
            }
        }
    }
}
</script>

<style>
.registration__form {
    width: 900px;
    padding-top: 10px;
    margin: 0 auto;
}
.registration__form h2 {
    font-size: 48px;
    margin-bottom: 50px;
}
.registration__form input {
    width: 40%;
    height: 45px;
    font-size: 18px;
    border-radius: 5px;
    padding-left: 30px;
    margin: 20px 20px;
}
.registration__form button {
    width: 40%;
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