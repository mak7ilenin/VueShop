<template>
    <form class="login__form" @submit.prevent="onLogin">
        <h2>Sign in</h2>
        <p class="empty-inputs" v-if="empty">Please fill in the all fields!</p>
        <p>{{ errorMessage }}</p>

        <input type="text" placeholder="Email" v-model="email">
        <input type="password" placeholder="Password" v-model="password">

        <button type="submit">Log in</button>
        <button class="google__auth" @click="signInWithGoogle">Sign in with Google</button>

        <div class="no-acc-container">
            <p>Don't have one? <router-link to="registration">Registrate!</router-link></p>
        </div>
    </form>
</template>

<script>
import router from '@/router';
import { auth } from '@/firebase/init';
import { signInWithEmailAndPassword } from 'firebase/auth';
export default {
    data() {
        return {
            email: '',
            password: '',
            empty: false,
            errorMessage: ''

        }
    },
    methods: {
        onLogin() {
            if(this.email.trim() === '' || this.password.trim() === '') {
                this.empty = true;
                return;
            } else {
                this.empty = false;
                signInWithEmailAndPassword(auth, this.email, this.password)
                    .then(() => {
                        router.replace('/products');
                        // alert('Successfully signed in!');
                        this.email = '';
                        this.password = '';
                    })
                    .catch((e) => {
                        console.log(e.code);
                        switch(e.code) {
                            case 'auth/invalid-email':
                                this.errosMessage = 'Invalid email';
                                break;
                            case 'auth/user-not-found':
                                this.errosMessage = 'No account with that email was found!';
                                break;
                            case 'auth/wrong-password':
                                this.errorMessage = 'Incorrect password!';
                                break;
                            default:
                                this.errosMessage = 'Email or password is incorrect!';
                                break;
                        }
                    });
            }
        },
        signInWithGoogle() {
            getRedirectResult(auth)
                .then((result) => {
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken
                    const user = result.user;
                })
                .catch((e) => {
                    console.log(e.code);
                    alert(e.message);

                    const email = error.customData.email;
                    const credential = GoogleAuthProvider.credentialFromError(e);
                });
        }
    }
}
</script>

<style>
.login__form {
    width: 900px;
    /* background-color: #4c7f8f; */
    /* border: 1px solid; */
    /* border-radius: 10px; */
    padding: 50px 20px 50px 20px;
    margin: 0 auto;
    margin-top: 220px;
}
.login__form h2 {
    font-size: 48px;
    font-style: italic;
}
.login__form input {
    width: 450px;
    height: 60px;
    font-size: 18px;
    position: relative;
    border-radius: 5px;
    padding-left: 30px;
    margin: 20px;
    margin-bottom: 10px;
}
.login__form button {
    width: 450px;
    height: 50px;
    margin-top: 20px;
    font-size: 24px;
    background-color: #5ce47e;
    border-radius: 5px;
    cursor: pointer;
    transition: all .2s;
}
.login__form button:hover {
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
.no-acc-container p {
    margin-top: 10px;
}
.no-acc-container p a {
    color: rgb(88, 144, 255);
    text-decoration: underline !important;
}
</style>