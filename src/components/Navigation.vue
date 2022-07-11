<template>
    <header>
        <div class="header__logo">
            <router-link to="/">
                <img src="../assets/logo.png" alt="logo">
            </router-link>
        </div>
        <div class="header__list">
            <ul>
                <li><router-link to="/products">Products</router-link></li>
                <!-- <li><router-link to="/addProduct">Add product</router-link></li> -->
                <li><router-link to="/editProduct">Edit product</router-link></li>
                <!-- <li><a>Help</a></li> -->
            </ul>
        </div>
        <div class="header__profile">
            <div class="profile__img">
                <img src="../assets/profile.png" alt="profile" @click="openProfileDropdown">
            </div>
        </div>
        <div class="profile__dropdown">
            <ul>
                <li>My profile</li>
                <router-link to="/registration"><li>Sign up</li></router-link>
                <li>Log in</li>
                <li class="sign-out">Sign out</li>
            </ul>
        </div>
    </header>
</template>

<script>
export default {
    methods: {
        openProfileDropdown() {
            $('.profile__dropdown').toggle('active');
        }
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
    position: absolute;
    right: 70px;
    top: 100px;
}
.active {
    display: unset;
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
.profile__dropdown ul li:hover {
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