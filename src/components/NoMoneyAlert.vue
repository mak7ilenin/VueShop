<template>
    <div class="no-money-alert">
        <p>You do not have enough funds to purchase this item!</p>
    </div>
</template>

<style>
.no-money-alert {
    width: 500px;
    height: 100px;

    display: flex;
    align-items: center;
    justify-content: center;

    position: fixed;
    top: 100px;
    right: 0;

    background-color: rgba(255, 142, 142, 0.9);
    border-radius: 2px;
    padding: 10px 20px;

    transform: translateY(-100%);
    z-index: 10;
    opacity: 0;
    transition: ease all .5s;
}
.active-no-money-alert {
    transform: translateY(0%);
    opacity: 1;
}
.no-money-alert p {
    font-size: 24px;
    color: #fff;
    font-weight: 500;
    font-family: 'Albert Sans', sans-serif;
}
</style>