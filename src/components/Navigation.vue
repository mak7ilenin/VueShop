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
                <li v-if="authed"><router-link to="/editProduct">Edit product</router-link></li>
            </ul>
        </div>
        <div class="header__profile">
            <div class="user__money" v-if="authed">{{ user_money }}$</div>
            <div class="cart__container">
                <router-link to="/my-cart" v-if="authed"><img src="../assets/shopping-cart.png" alt="cart"></router-link>
            </div>
            <div class="profile__img">
                <img src="../assets/profile.png" alt="profile" @click="openProfileDropdown">
            </div>
        </div>
        <div class="profile__dropdown">
            <ul>
                <li class="username profile__dropdown__btn">{{ user_name }}</li>
                <router-link to="/log-in"><li class="log-in profile__dropdown__btn">Log in</li></router-link>
                <li class="sign-out profile__dropdown__btn" @click="signOut" v-if="authed">Sign out</li>
            </ul>
        </div>
    </header>
</template>

<script>
import router from '@/router';
import { auth, db } from '@/firebase/init';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { onSnapshot, collection } from 'firebase/firestore';
export default {
    data() {
        return {
            user_name: undefined,
            user_money: 0,
            authed: false,
        }
    },
    methods: {
        openProfileDropdown() {
            $(".profile__dropdown").slideToggle(250, 'swing');
            $(document).on("click", function(event){
                var $trigger = $(".profile__img");
                if($trigger !== event.target && !$trigger.has(event.target).length){
                    $(".profile__dropdown").slideUp(400, 'swing');
                }            
            });
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
                    $('.log-in').removeClass('unlogged, unlogged-1');
                    $('.username').removeClass('unknown');

                    onSnapshot(collection(db, 'users'), (querySnapshot) => {
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
                        this.user_name = thisUser.username;
                    });
                }else {
                    this.authed = false;

                    $('.log-in').addClass('unlogged');
                    $('.log-in').addClass('unlogged-1');
                    $('.username').addClass('unknown');
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
    width: 13%;
    height: 100%;
}
.header__logo img {
    height: 100%;
    margin-right: 20px;
    cursor: pointer;
}
.header__list {
    width: 74%;
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
    width: 13%;
    height: 100%;
    display: flex;
    align-items: center;
}
.user__money {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 10px;
    color: #000;
    font-weight: bold;
    font-size: 20px;
}
.cart__container {
    width: 40%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.cart__container img {
    width: 90px;
    object-fit: cover;
    cursor: pointer;
}
.profile__img {
    width: 40%;
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
    display: none;
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