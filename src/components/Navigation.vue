<template>
    <header>
        <div class="header__logo">
            <router-link to="/">
                <img src="../assets/logo.png" alt="logo">
            </router-link>
        </div>
        <div class="header__list">
            <ul>
                <li><a>Buy</a></li>
                <li><router-link to="/groceries">Groceries</router-link></li>
                <li><a>About Us</a></li>
                <li><a>Help</a></li>
            </ul>
        </div>
        <div class="header__profile">
            <div class="profile__img">
                <img src="../assets/profile.png" alt="profile">
            </div>
        </div>
    </header>
</template>

<style>
header {
    font-family: 'Albert Sans', sans-serif;
    background-color: #89e4b9;
    width: 100%;
    height: 100px;
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
    cursor: pointer;
}
</style>