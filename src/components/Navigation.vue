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
            <p v-if="authed">{{ user_money }}$</p>
            <div class="profile__img">
                <img src="../assets/profile.png" alt="profile" @click="openProfileDropdown">
            </div>
        </div>
        <div class="profile__dropdown">
            <ul>
                <li class="user_email">{{ user_name }}</li>
                <li class="my-profile">My profile</li>
                <router-link to="/log-in"><li class="log-in">Log in</li></router-link>
                <li class="sign-out" @click="signOut" v-if="authed">Sign out</li>
            </ul>
        </div>
    </header>
</template>

<script>
import router from '@/router';
import { auth, storage } from '@/firebase/init';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { onSnapshot, collection } from 'firebase/firestore';
export default {
    data() {
        return {
            user_name: '',
            user_money: 0,
            user_status: false,
            authed: false,
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

                    $('.log-in').removeClass('unlogged');
                    $('.user_email').removeClass('unknown');
                    $('.my-profile').removeClass('unlogged-1');
                }else {
                    this.authed = false;

                    $('.log-in').addClass('unlogged');
                    $('.user_email').addClass('unknown');
                    $('.my-profile').addClass('unlogged-1');
                }
            });
        }
    },
    beforeMount() {
        this.isSignedIn();

        onSnapshot(collection(storage, 'users'), (querySnapshot) => {
            const usersList = [];
            querySnapshot.forEach((doc) => {
                const user = {
                    userId: doc.data().userId,
                    username: doc.data().username,
                    money: doc.data().money
                }
                usersList.push(user);
            });
            const thisUser = usersList.find(user => user.userId === (auth.currentUser).uid);
            this.user_money = thisUser.money;
        });
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
    width: 11%;
    height: 100%;
}
.header__logo img {
    height: 100%;
    margin-right: 20px;
    cursor: pointer;
}
.header__list {
    width: 78%;
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
    width: 11%;
    height: 100%;
    display: flex;
    align-items: center;
}
.header__profile p {
    color: #000;
    font-weight: bold;
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