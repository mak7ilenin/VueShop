<template>
    <header>
        <div class="header__logo">
            <router-link to='/'>
                <img src="../assets/logo.png" alt="logo">
            </router-link>
        </div>
        <div class="header__list">
            <ul>
                <li v-if="authed"><router-link to="/products">Products</router-link></li>
                <!-- <li><router-link to="/addProduct">Add product</router-link></li> -->
                <li v-if="authed"><router-link to="/editProduct">Edit product</router-link></li>
            </ul>
        </div>
        <div class="header__profile">
            <div class="profile__img">
                <img src="../assets/profile.png" alt="profile" @click="openProfileDropdown">
            </div>
        </div>
        <div class="profile__dropdown">
            <ul>
                <li class="user_email">{{ user_name }}</li>
                <li class="my-profile">My profile</li>
                <router-link to="/log-in"><li class="log-in">Log in</li></router-link>
                <li class="sign-out" @click="signOut" v-if="user_status">Sign out</li>
            </ul>
        </div>
    </header>
</template>

<script>
import router from '@/router';
import { auth } from '@/firebase/init';
import { onAuthStateChanged, signOut } from 'firebase/auth';
export default {
    data() {
        return {
            user_name: '',
            user_status: false,
            authed: false,
            logo_path: '',
        }
    },
    methods: {
        openProfileDropdown() {
            $('.profile__dropdown').toggle('active');
        },
        signOut() {
            signOut(auth).then(() => {
                router.replace('/log-in');
            })
            .catch((e) => {
                alert(e.message);
            });
        },
        isSignedIn: async function() {
            onAuthStateChanged(auth, (user) => {
                if(user) {
                    this.authed = true;
                    this.logo_path = '/';
                    const userEmail = user.email;
                    this.user_name = userEmail;
                    this.user_status = true;
                    $('.log-in').removeClass('unlogged');
                    $('.user_email').removeClass('unknown');
                    $('.my-profile').removeClass('unlogged-1');
                }else {
                    this.authed = false;
                    this.logo_path = '';
                    this.user_name = '';
                    this.user_status = false;
                    $('.log-in').addClass('unlogged');
                    $('.user_email').addClass('unknown');
                    $('.my-profile').addClass('unlogged-1');
                }
            });
        }
    },
    beforeMount() {
        this.isSignedIn();
    }
}
</script>

<style>
header {
    font-family: 'Albert Sans', sans-serif;
    background-color: #89e4b9;
    width: 100%;
    height: 100px;
    z-index: 999;
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
}
.header__logo {
    width: 10%;
    height: 100%;
}
.header__logo img {
    height: 100%;
    margin-right: 20px;
    cursor: pointer;
}
.header__list {
    width: 80%;
    display: flex;
    justify-content: center;
}
.header__list > ul {
    width: 50%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
}
.header__list > ul > li > a {
    color: #2c3e50;
    text-align: center;
    font-size: 24px;
    font-weight: 600;
}
.header__profile {
    width: 10%;
    height: 100%;
}
.profile__img {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.profile__img > img {
    height: 50%;
    padding: 6px;
    border-radius: 50%;
    border: 2px solid #000;
    transition: all .2s;
    cursor: pointer;
}
.profile__img img:hover {
    transform: scale(1.02);
}
.profile__dropdown {
    width: 250px;
    display: none;
    background-color: #4b6e91;
    overflow: hidden;
    position: absolute;
    right: 70px;
    top: 100px;
}
.active {
    display: unset;
}
.unknown {
    height: 0;
    margin: 0 !important;
    padding: 0 !important;
}
.profile__dropdown ul {
    margin: 0;
}
.profile__dropdown ul li {
    font-size: 20px;
    color: #fff;
    margin: 5px auto;
    background-color: #1b2d41;
    padding: 10px;
    transition: all .05s;
}
.log-in {
    margin-bottom: 0 !important;
}
.unlogged {
    margin-bottom: 5px;
}
.unlogged-1 {
    margin-top: 0 !important;
}
.profile__dropdown ul li:not(.user_email):hover {
    transform: scale(1.05);
    cursor: pointer;
}
.profile__dropdown > ul > li:nth-child(1) {
    margin-top: 0;
}
.profile__dropdown > ul > li:nth-last-child(1) {
    margin-bottom: 0;
}
.sign-out {
    color: #ff5555 !important;
}
</style>